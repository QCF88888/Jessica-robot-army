# GPT → GROK / 000: xAI real usage handoff
Date: 2026-11-17 · Europe/Zurich

Jessica requests integration of the current Grok Bot fleet into JRA Token Factory. This is a coordination request, not evidence of receipt or an active telemetry connection.

## Please confirm / 请 000 回复
1. Is the executing fleet in the Grok consumer application, Grok Bot product, or an xAI API runtime? Provide the non-secret integration location and approved Bot-ID mapping. Role files alone do not prove deployment.
2. Does that runtime expose authoritative per-call usage/export? Supply a synthetic sample schema publicly; retain real usage, model/version, request evidence and billing privately. Do not post keys or conversation text.
3. Wire completed-call usage to `fromXaiUsage` in `xai-usage.mjs`, then authenticated `POST /api/events` in measured mode on a PRIVATE collector. Preserve stable event IDs across delivery retries; new billable API attempts need new IDs.
4. Validate a single actual call against provider usage and billing; verify duplicate delivery leaves totals unchanged. Unknown usage must remain unavailable, not zero.
5. Public site remains simulation. Live dashboard requires authenticated private access before any actual operating data is displayed online. The present collector is loopback-only; do not expose its unauthenticated read routes.
6. Report completion or the exact unavailable interface in this handoff log. If the consumer app provides no metering/export, use an approved xAI API execution path for FUTURE calls. Do not claim it recovers past app chats.

## Integration / 接入
```js
import {fromXaiUsage} from './xai-usage.mjs';
// response: complete provider REST result retained only in private runtime
const event = fromXaiUsage(response, {
  eventId: opaqueStableCallId, botId: approvedBotId,
  timestampMs: completedAtEpochMs, success: callSucceeded
});
// Private backend only; token comes from secret store, never browser/public Git.
await fetch('http://127.0.0.1:8789/api/events', {
  method: 'POST',
  headers: {'Content-Type':'application/json', Authorization: 'Bearer '+ingestSecret},
  body: JSON.stringify(event)
});
```
Use provider terminal usage only; do not sum cumulative streaming snapshots.
Mapping: prompt_tokens → input; cached_tokens is part of input; output reconciles completion and reasoning against total_tokens. Conflicting totals or missing cache statistics are rejected for operator review, not guessed. Converter currently supports the xAI REST prompt/completion field shape, not every SDK/gRPC schema.

GPU-ms remain null: API latency is not allocated device time. CHF costs remain null until supported by full billing categories, actual tier/model, tool charges and recorded FX. Verify how per-call rounding and later invoice adjustments are reconciled privately. The adapter is a format converter, not a provider connection or background service.

Reference: https://docs.x.ai/developers/rest-api-reference/inference/chat-completions
The published example has prompt 32 + completion 9 + reasoning 94 = total 135. We handle both separately billed reasoning and totals that already include it without double counting.

中文版：请 000 确认运行平台、真实 usage/export 接口及 Bot 编号映射；在私有执行端接入采集器，先用一条真实调用与供应商计量对账。密钥与真实经营数据不要写入此公开仓库。尚未收到回复、尚未验证实测连接。
