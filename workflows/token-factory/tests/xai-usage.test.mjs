import test from 'node:test';
import assert from 'node:assert/strict';
import {fromXaiUsage} from '../xai-usage.mjs';
const opts={eventId:'synthetic-xai-001',botId:'000',timestampMs:Date.now(),success:true};
const fixture=(total=135)=>({usage:{prompt_tokens:32,completion_tokens:9,total_tokens:total,prompt_tokens_details:{cached_tokens:6},completion_tokens_details:{reasoning_tokens:94}},choices:[{message:{content:'synthetic private text'}}]});
test('xAI separately billed reasoning reconciles once, no payload or guessed costs',()=>{
 const e=fromXaiUsage(fixture(),opts);assert.equal(e.output_tokens,103);assert.equal(e.input_tokens,32);assert.equal(e.cached_input_tokens,6);assert.equal(e.gpu_ms,null);assert.equal(e.cost_chf,null);assert.equal(JSON.stringify(e).includes('private'),false);
});
test('already included reasoning is not added twice',()=>{const r=fixture();r.usage.completion_tokens=103;assert.equal(fromXaiUsage(r,opts).output_tokens,103);});
test('missing usage, missing cache and inconsistent totals fail closed',()=>{
 assert.throws(()=>fromXaiUsage({},opts));assert.throws(()=>fromXaiUsage(fixture(200),opts));
 const r=fixture();delete r.usage.prompt_tokens_details;assert.throws(()=>fromXaiUsage(r,opts));
});
