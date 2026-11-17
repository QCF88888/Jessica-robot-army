import {validateEvent} from './web/model.mjs';
// Convert a COMPLETE xAI REST response, never partial streaming chunks.
// Caller supplies a stable opaque request ID and actual completion timestamp.
export function fromXaiUsage(response,{eventId,botId,timestampMs,success,costChf=null}={}){
  const u=response?.usage;
  if(!u) throw Error('Missing provider usage; do not estimate or report zero');
  const integer=(v,label)=>{if(!Number.isSafeInteger(v)||v<0)throw Error('Missing or invalid '+label);return v;};
  const input=integer(u.prompt_tokens,'prompt_tokens');
  const completion=integer(u.completion_tokens,'completion_tokens');
  const total=integer(u.total_tokens,'total_tokens');
  const cached=integer(u.prompt_tokens_details?.cached_tokens,'cached_tokens');
  const reasoning=integer(u.completion_tokens_details?.reasoning_tokens??0,'reasoning_tokens');
  // xAI examples can bill reasoning separately. Reconcile the total instead of
  // blindly adding reasoning twice or silently dropping it.
  let output;
  if(total===input+completion) output=completion;
  else if(reasoning>0 && total===input+completion+reasoning) output=completion+reasoning;
  else throw Error('Unreconciled token total; retain privately for operator review');
  return validateEvent({event_id:eventId,bot_id:botId,timestamp_ms:timestampMs,
    input_tokens:input,cached_input_tokens:cached,output_tokens:output,
    system:'api',success,gpu_ms:null,cost_chf:costChf});
}
