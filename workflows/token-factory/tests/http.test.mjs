import test from 'node:test';import assert from 'node:assert/strict';import {spawn} from 'node:child_process';import {mkdtemp,rm} from 'node:fs/promises';import {tmpdir} from 'node:os';import {join,dirname} from 'node:path';import {fileURLToPath} from 'node:url';import {randomBytes} from 'node:crypto';
test('HTTP collector: auth, numeric event whitelist, deduplication and private paths',async()=>{
 const dir=await mkdtemp(join(tmpdir(),'jra-test-')),token=randomBytes(24).toString('hex'),port=18789;
 const child=spawn(process.execPath,['server.mjs'],{cwd:dirname(dirname(fileURLToPath(import.meta.url))),env:{...process.env,PORT:String(port),JRA_MODE:'measured',JRA_DATA_DIR:dir,JRA_INGEST_TOKEN:token},stdio:['ignore','pipe','pipe']});
 try{
  await new Promise((resolve,reject)=>{const timer=setTimeout(()=>reject(Error('server startup timeout')),10000);child.stdout.on('data',()=>{clearTimeout(timer);resolve();});child.once('exit',code=>{clearTimeout(timer);reject(Error('server exited '+code));});});
  const url=`http://localhost:${port}`;assert.equal((await fetch(url+'/')).status,200);assert.equal((await fetch(url+'/store.mjs')).status,404);
  const e={event_id:'http-synthetic',bot_id:'020',timestamp_ms:Date.now(),input_tokens:100,cached_input_tokens:20,output_tokens:10,system:'api',success:true,prompt:'synthetic value must be stripped'};
  assert.equal((await fetch(url+'/api/events',{method:'POST',body:JSON.stringify(e)})).status,401);
  const post=v=>fetch(url+'/api/events',{method:'POST',headers:{authorization:'Bearer '+token},body:JSON.stringify(v)});
  assert.equal((await post(e)).status,201);assert.equal((await post(e)).status,200);assert.equal((await post({...e,output_tokens:20})).status,400);
  const data=await (await fetch(url+'/api/events')).json();assert.equal(data.mode,'measured');assert.equal(data.events.length,1);assert.equal(data.events[0].prompt,undefined);
  const report=await (await fetch(url+'/api/report')).json();assert.equal(report.cost_coverage,0);assert.equal(report.strategy.validated_route,null);
 }finally{child.kill('SIGTERM');await new Promise(r=>child.once('close',r));await rm(dir,{recursive:true,force:true});}
});
