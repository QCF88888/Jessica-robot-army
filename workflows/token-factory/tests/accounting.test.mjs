import test from 'node:test';import assert from 'node:assert/strict';
import {DEFAULTS,calculate,costFor,workload,gpuHours,aggregate,validateEvent,validateConfig} from '../web/model.mjs';
const near=(a,b)=>assert.ok(Math.abs(a-b)<1e-7,`${a} != ${b}`);
test('one GPU hour: dimensional conversion and all-in ownership energy',()=>{
 const c={...DEFAULTS,cards:1,days:1,hours:1,util:1,prefill:1000,decode:100,cacheCompute:0,watts:700,idleWatts:100,hostWatts:100,pue:1.25,electricity:.2};
 const w={input:1800000,cached:0,output:180000,calls:1};near(gpuHours(w,c),1);const r=costFor(w,c);near(r.kwh,1);near(r.ownParts.energy,.2);near(r.required,1);assert.equal(r.feasible,true);
});
test('API cached input subset is not double counted',()=>{const c={...DEFAULTS,rentOps:0,tools:0,priceIn:2,priceCache:.2,priceOut:10};near(costFor({input:1000000,cached:400000,output:100000,calls:1},c).api,2.28);});
test('own total reconciles and idle capital remains',()=>{const r=calculate({...DEFAULTS,tasks:0,govInput:0,govOutput:0,tools:0}).after;near(r.own,Object.values(r.ownParts).reduce((a,b)=>a+b));assert.ok(r.own>0);assert.equal(r.perBusyHour,null);assert.equal(r.ownPerMillion,null);});
test('governance overhead can make token saving negative',()=>{const r=calculate({...DEFAULTS,tasks:1,duplicate:0,trim:0});assert.ok(r.tokenSaving<0);});
test('capacity failure excludes ownership from recommendation',()=>{const r=calculate({...DEFAULTS,tasks:1000000,cards:1});assert.equal(r.after.feasible,false);assert.notEqual(r.best,'own');assert.equal(r.after.ownPerMillion,null);});
test('no phantom savings when all optimisations/overhead disabled',()=>{const c={...DEFAULTS,dedup:0,trim:0,govInput:0,govOutput:0,tools:0};const r=calculate(c);near(r.base.input,r.optimised.input);near(r.tokenSaving,0);});
test('retry attempts geometric expectation',()=>{const c={...DEFAULTS,tasks:1,days:1,input:100,output:10,duplicate:0,retry:.5};near(workload(c,false).input,200);});
test('configuration rejects invalid ranges and NaN',()=>{for(const c of [{retry:1},{pue:.9},{decode:0},{tasks:-1},{cards:1.2},{util:0},{electricity:NaN},{idleWatts:900}])assert.throws(()=>validateConfig(c));});
const event={event_id:'synthetic-1',bot_id:'005',timestamp_ms:Date.now(),input_tokens:1000,cached_input_tokens:200,output_tokens:300,system:'api',success:false};
test('failed-call tokens remain billable; duplicate meter IDs counted once',()=>{const r=aggregate([event,event]);assert.equal(r.input,1000);assert.equal(r.output,300);assert.equal(r.duplicates,1);assert.equal(r.rows[5].success,0);assert.equal(r.rows[5].costSamples,0);});
test('unknown payload is stripped and invalid counts rejected',()=>{assert.equal(validateEvent({...event,prompt:'DO NOT RETAIN'}).prompt,undefined);for(const e of [{...event,cached_input_tokens:1001},{...event,input_tokens:2.3},{...event,bot_id:'999'},{...event,gpu_ms:-1}])assert.throws(()=>validateEvent(e));});
