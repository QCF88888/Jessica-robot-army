import {randomUUID} from 'node:crypto';
import {dayKey} from './store.mjs';
import {strategy,issueDailyInstructions} from './strategy.mjs';
export function startRunner(store,{mode='measured',adapter=null,maxTaskCHF=1,maxDayCHF=20,interval=1000,timeout=60000,config={},benchmarks=[],autoDirectives=false}={}){
  if(!Number.isFinite(maxTaskCHF)||maxTaskCHF<0||!Number.isFinite(maxDayCHF)||maxDayCHF<0)throw Error('Invalid budget');
  let busy=false,closed=false,seq=0,lastDay=dayKey();store.recover();
  if(autoDirectives)issueDailyInstructions(store,lastDay);
  const tick=async()=>{if(busy||closed)return;busy=true;try{
    const day=dayKey();if(day!==lastDay){const report=store.saveReport(lastDay);report.strategy=strategy(config,benchmarks);store.db.prepare('UPDATE reports SET data=? WHERE day=?').run(JSON.stringify(report),lastDay);lastDay=day;if(autoDirectives)issueDailyInstructions(store,day);}
    if(mode==='demo'){const id=String(seq++%21).padStart(3,'0');store.enqueue({idempotency_key:'demo-'+randomUUID(),bot_id:id,kind:'analyse',input_ref:'synthetic-example',action:'internal',estimated_cost_chf:0.03});}
    const task=store.next();if(!task)return;
    if(mode!=='demo'&&!adapter)return; // No provider or privileged action is enabled by default.
    const daily=store.daily(day);if(task.estimate>maxTaskCHF||daily.recorded_cost_chf+task.estimate>maxDayCHF||(mode!=='demo'&&daily.calls>0&&daily.cost_coverage<1)){store.finish(task.id,'needs_review',{reason:'budget_or_missing_cost'});return;}
    store.acknowledge(task.id);const started=Date.now();let outcome;
    if(mode==='demo'){const input=1000+Number(task.bot)*173,output=200+Number(task.bot)*61,cached=Math.floor(input*.4);outcome={input_tokens:input,cached_input_tokens:cached,output_tokens:output,cost_chf:((input-cached)*2+cached*.2+output*10)/1e6,system:'api',success:true,gpu_ms:null};}
    else{
      const controller=new AbortController();let timer;
      try{outcome=await Promise.race([adapter({...task,attempt:task.attempts+1},{signal:controller.signal,max_cost_chf:Math.min(task.estimate,maxTaskCHF,maxDayCHF-daily.recorded_cost_chf)}),new Promise((_,reject)=>{timer=setTimeout(()=>{controller.abort();reject(Error('timeout_unknown_outcome'));},timeout);})]);}
      catch{store.finish(task.id,'needs_review',{reason:'adapter_error_or_unknown_outcome',started_ms:started});return;}
      finally{clearTimeout(timer);}
    }
    const event={...outcome,event_id:task.id+'-attempt-'+(task.attempts+1),bot_id:task.bot,timestamp_ms:Date.now()};
    store.addEvent(event);
    const review=outcome.cost_chf==null||outcome.cost_chf>task.estimate||outcome.cost_chf>maxTaskCHF;
    store.finish(task.id,review?'needs_review':outcome.success?'done':task.attempts+1<3?'retry':'failed',{event_id:event.event_id,elapsed_ms:Date.now()-started});
  }catch{ /* Keep the daemon alive; uncertain in-flight jobs require review. */
    store.recover();
  }finally{busy=false;}};
  const timer=setInterval(tick,interval);return {tick,stop(){closed=true;clearInterval(timer);},get busy(){return busy;}};
}
