import {calculate,ROSTER} from './web/model.mjs';
export function strategy(config,benchmarks=[],requirements={minQuality:.95,maxLatencyMs:10000}){
  const r=calculate(config),eligible=benchmarks.filter(b=>['api','rental','own'].includes(b.system)&&Number.isFinite(b.quality)&&b.quality>=requirements.minQuality&&Number.isFinite(b.latency_ms)&&b.latency_ms<=requirements.maxLatencyMs&&b.privacy_approved===true&&(b.system!=='own'||r.after.feasible));
  eligible.sort((a,b)=>r.after[a.system]-r.after[b.system]);
  return {modelled_lowest_cost:r.best,validated_route:eligible[0]?.system??null,reason:eligible.length?'Lowest estimated cost among supplied quality/latency/privacy-qualified candidates.':'No qualified benchmark supplied. Keep the current approved route; run acceptance benchmarks first.',costs_chf:{api:r.after.api,rental:r.after.rental,own:r.after.feasible?r.after.own:null},requirements};
}
export function issueDailyInstructions(store,day,{estimate=0.01}={}){
  // Internal only. References are resolved privately by the operator's adapter.
  return ROSTER.map(b=>store.enqueue({idempotency_key:`strategy-${day}-${b.id}`,bot_id:b.id,kind:'plan',input_ref:`strategy-${day}`,action:'internal',estimated_cost_chf:estimate}));
}
