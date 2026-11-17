// Pure accounting functions. CHF examples, not provider quotations.
export const DEFAULTS = Object.freeze({tasks:1000,days:30,hours:24,input:6000,output:1200,duplicate:0.30,dedup:0.90,trim:0.20,retry:0.05,cache:0.40,govInput:21000,govOutput:4200,priceIn:2,priceCache:0.20,priceOut:10,tools:0.002,prefill:2500,decode:120,cacheCompute:0.10,util:0.70,cards:8,rent:2.5,rentOps:200,capex:35000,residual:0.10,years:4,watts:700,idleWatts:100,hostWatts:150,pue:1.30,electricity:0.20,maintenance:0.05,management:2000,facility:1000});
export const LIMITS = {tasks:[0,1e8],days:[1,366],hours:[1,24],input:[0,1e7],output:[0,1e7],duplicate:[0,5],dedup:[0,1],trim:[0,0.95],retry:[0,0.95],cache:[0,1],govInput:[0,1e8],govOutput:[0,1e8],priceIn:[0,1e5],priceCache:[0,1e5],priceOut:[0,1e5],tools:[0,1e5],prefill:[1,1e9],decode:[1,1e9],cacheCompute:[0,1],util:[0.01,1],cards:[1,1e6],rent:[0,1e5],rentOps:[0,1e9],capex:[0,1e9],residual:[0,1],years:[1,30],watts:[0,1e6],idleWatts:[0,1e6],hostWatts:[0,1e6],pue:[1,5],electricity:[0,100],maintenance:[0,1],management:[0,1e9],facility:[0,1e9]};
export function validateConfig(config={}) {
  const c={...DEFAULTS,...config};
  for(const [k,[lo,hi]] of Object.entries(LIMITS)) if(!Number.isFinite(c[k]) || c[k]<lo || c[k]>hi) throw Error(`Invalid ${k}: ${lo}–${hi}`);
  if(!Number.isInteger(c.cards)) throw Error('cards must be an integer');
  if(c.idleWatts>c.watts) throw Error('idleWatts must not exceed watts');
  return c;
}
export function workload(config,optimised=true){
  const c=validateConfig(config),jobs=c.tasks*c.days,attempts=1/(1-c.retry);
  const repeats=1+c.duplicate*(optimised?1-c.dedup:1);
  const gi=optimised?c.govInput*c.days:0,go=optimised?c.govOutput*c.days:0;
  const input=jobs*c.input*(optimised?1-c.trim:1)*repeats*attempts+gi;
  const output=jobs*c.output*repeats*attempts+go;
  return {jobs,input,output,cached:input*c.cache,calls:jobs*repeats*attempts+(optimised?23*c.days:0),governanceInput:gi,governanceOutput:go};
}
export function apiCost(w,c){return ((w.input-w.cached)*c.priceIn+w.cached*c.priceCache+w.output*c.priceOut)/1e6+w.calls*c.tools;}
export function gpuHours(w,c){return ((w.input-w.cached+w.cached*c.cacheCompute)/c.prefill+w.output/c.decode)/3600;}
export function costFor(w,c){
  const work=gpuHours(w,c),available=c.cards*c.days*c.hours,required=work/c.util;
  const feasible=required<=available,active=Math.min(work,available),idle=Math.max(0,available-active);
  // Full-horizon capital and idle costs remain even when there are no tasks.
  const depreciation=c.cards*c.capex*(1-c.residual)/(c.years*365*24)*c.days*24;
  const kwh=((active*c.watts+idle*c.idleWatts+available*c.hostWatts)/1000)*c.pue;
  const energy=kwh*c.electricity,maintenance=c.cards*c.capex*c.maintenance*c.days/365;
  const management=c.management*c.days/30,facility=c.facility*c.days/30;
  const ownParts={depreciation,energy,maintenance,management,facility,tools:w.calls*c.tools};
  const own=Object.values(ownParts).reduce((a,b)=>a+b,0);
  const rentalParts={compute:required*c.rent,management:c.rentOps*c.days/30,tools:w.calls*c.tools};
  const rental=Object.values(rentalParts).reduce((a,b)=>a+b,0);
  const api=apiCost(w,c)+c.rentOps*c.days/30;
  return {api,rental,own,ownParts,rentalParts,kwh,work,required,available,utilisation:available?work/available:0,feasible,requiredCards:Math.ceil(required/(c.days*c.hours)),capital:c.cards*c.capex,perCardHour:own/available,perBusyHour:work?own/work:null,apiPerMillion:w.output?api/w.output*1e6:null,rentalPerMillion:w.output?rental/w.output*1e6:null,ownPerMillion:feasible&&w.output?own/w.output*1e6:null};
}
export function calculate(config={}){
  const c=validateConfig(config),base=workload(c,false),optimised=workload(c,true);
  const b=costFor(base,c),o=costFor(optimised,c);
  const options=[['api',o.api],['rental',o.rental],...(o.feasible?[['own',o.own]]:[])];
  return {config:c,base,optimised,before:b,after:o,tokenSaving:base.input+base.output?1-(optimised.input+optimised.output)/(base.input+base.output):null,apiSaving:b.api?1-o.api/b.api:null,best:options.sort((a,b)=>a[1]-b[1])[0][0]};
}
export function sensitivity(config){
  const c=validateConfig(config),max=Math.max(c.tasks*2,100);
  return Array.from({length:41},(_,i)=>{const tasks=max*i/40;const r=calculate({...c,tasks});return {tasks,...r.after};});
}
export const ROSTER=[['General Commander','总指挥官'],['Chief of Staff','幕僚长'],['Calendar','日程官'],['Finance','财务官'],['Capital operations','资本运营官'],['Governance','治理官'],['Education','移民与教育'],['Health-tech','健康科技'],['Foundation','公益基金'],['Social media','社媒运营'],['Email','邮件管理'],['Competitive intelligence','竞品监测'],['Travel','全球旅行'],['Sports','体育项目'],['Events','黑客松与赛事'],['Supercomputing','QSC 超算中心'],['Market intelligence','股市情报'],['Device & archive','设备与归档'],['Consumer apps','消费应用'],['Biotech','生物科技'],['Solo Founder Lab','Solo Founder 项目']].map(([en,zh],i)=>({id:String(i).padStart(3,'0'),en,zh}));
export function validateEvent(raw){
  if(!raw || typeof raw!=='object') throw Error('Event must be an object');
  if(typeof raw.event_id!=='string'||!/^[\w.-]{1,100}$/.test(raw.event_id)) throw Error('Invalid event_id');
  if(!ROSTER.some(b=>b.id===raw.bot_id)) throw Error('Unknown bot_id');
  for(const k of ['timestamp_ms','input_tokens','cached_input_tokens','output_tokens']) if(!Number.isSafeInteger(raw[k])||raw[k]<0) throw Error(`Invalid ${k}`);
  if(raw.timestamp_ms<946684800000 || raw.timestamp_ms>Date.now()+300000) throw Error('Invalid timestamp_ms');
  if(raw.cached_input_tokens>raw.input_tokens) throw Error('Cached input is a subset of input');
  if(!['api','rental','own'].includes(raw.system)) throw Error('Invalid system');
  if(typeof raw.success!=='boolean') throw Error('success must be boolean');
  if(raw.gpu_ms!=null && (!Number.isSafeInteger(raw.gpu_ms)||raw.gpu_ms<0)) throw Error('Invalid gpu_ms');
  if(raw.cost_chf!=null && (!Number.isFinite(raw.cost_chf)||raw.cost_chf<0)) throw Error('Invalid cost_chf');
  // Whitelist numeric metering; never retain prompts, credentials or task payloads.
  return {event_id:raw.event_id,bot_id:raw.bot_id,timestamp_ms:raw.timestamp_ms,input_tokens:raw.input_tokens,cached_input_tokens:raw.cached_input_tokens,output_tokens:raw.output_tokens,system:raw.system,success:raw.success,gpu_ms:raw.gpu_ms??null,cost_chf:raw.cost_chf??null};
}
export function aggregate(events){
  const seen=new Map(),rows=ROSTER.map(b=>({...b,input:0,cached:0,output:0,calls:0,success:0,gpuMs:0,gpuSamples:0,cost:0,costSamples:0,last:null}));
  const accepted=[];
  for(const raw of events){const e=validateEvent(raw);if(seen.has(e.event_id)){if(seen.get(e.event_id)!==JSON.stringify(e))throw Error('Conflicting duplicate event_id');continue;}seen.set(e.event_id,JSON.stringify(e));accepted.push(e);const r=rows[Number(e.bot_id)];r.input+=e.input_tokens;r.cached+=e.cached_input_tokens;r.output+=e.output_tokens;r.calls++;r.success+=Number(e.success);r.gpuMs+=e.gpu_ms??0;r.gpuSamples+=Number(e.gpu_ms!=null);r.cost+=e.cost_chf??0;r.costSamples+=Number(e.cost_chf!=null);r.last=Math.max(r.last??0,e.timestamp_ms);}
  for(const key of ['input','cached','output','gpuMs'])if(!Number.isSafeInteger(rows.reduce((s,r)=>s+r[key],0)))throw Error('Meter total exceeds safe integer precision');
  return {rows,events:accepted.sort((a,b)=>a.timestamp_ms-b.timestamp_ms),input:rows.reduce((s,r)=>s+r.input,0),output:rows.reduce((s,r)=>s+r.output,0),cached:rows.reduce((s,r)=>s+r.cached,0),calls:accepted.length,duplicates:events.length-accepted.length};
}
