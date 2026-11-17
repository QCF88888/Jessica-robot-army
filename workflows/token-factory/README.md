# JRA Token Factory / Token 工厂

An auditable token/GPU-hour simulator, a local metering collector, and a persistent internal-task runner. **MIT; synthetic examples only. No production credentials or operating data.**

**Live demonstration:** https://neumanntech.space/workbench/token-factory/  
**Canonical source:** https://github.com/QCF88888/Jessica-robot-army/tree/main/workflows/token-factory

## What is implemented / 已实现

- 000–020 public roster; input-consumption × output-production scatter plot, cumulative event timeline, per-agent metering and a dynamic workflow map.
- Two operating systems: **rent** (API tokens or GPU-hours) versus **own** (capital depreciation, idle/active electricity, host allocation, PUE, maintenance, staff/management and facility/network costs).
- CHF scenario editor, three scale presets, capacity limits, sampled cost-versus-load curves, per-installed-card-hour, per-active-card-hour and per-million-output costs.
- Baseline versus JRA orchestration, with retries, duplicate work, context reduction and daily 000/005/21 acknowledgements explicitly charged. Savings can be negative.
- Browser-only JSON/JSONL imports and report export; no imported data is uploaded. Imports do not establish provenance; they are supplied meters, not independently verified measurements.
- Local SQLite collector, numeric-only schema, unique-event deduplication and conflicting-duplicate rejection.
- Persistent one-owner task queue, acknowledgement before execution, up to three **known-failure** attempts, cost gates, explicit review for uncertain outcomes. The current reference worker is serial; deploy coordinated workers only after implementing atomic distributed claims.
- Daily 005 cost/efficiency report and 000 internal strategy in **Europe/Zurich**, including daylight saving. Optional daily unique instructions to all 21 roles. Quality, latency and privacy validation precede routing decisions.
- Node tests and Docker Compose restart policy for an operator-managed 24/7 deployment.

**Not represented as complete:** a connected real JRA fleet, supplier bills, physical power meters, a provider-specific inference adapter, infrastructure procurement, customer messaging or unattended external actions. Role definitions are not deployment evidence. The static website cannot run workers when closed; the collector/server must be deployed separately.

## Start / 启动

Requires Node **22.13+** (tested on Node 26) with built-in SQLite. No npm dependencies.

```sh
cd workflows/token-factory
npm test
npm start
# Open http://localhost:8789/
```

Default is **demo**. The browser generates its own synthetic events until you click “Connect local collector”, then reads the server's synthetic events. This is not model inference and incurs no API charges. The app refreshes the visible clock at about 100 ms, emits browser demo completions at about one second, and polls local meters every second. It does **not** claim 1 ms sampling, accounting settlement or screen refresh. Background tabs can throttle rendering. Events carry millisecond epoch timestamps; counts are integers, never interpolated into fake tokens.

```sh
docker compose up -d --build
docker compose logs --tail=50
docker compose down
```

Compose exposes only `127.0.0.1:8789`, keeps SQLite on a named volume and uses `restart: unless-stopped`. Docker deployment files are supplied; a real Docker production rollout has not been performed. Stopping the container does not delete its volume. Do not publish the collector to the Internet without authentication, TLS, tenant isolation, retention policy and an operator review. Host-header validation and same-origin access protect this loopback reference; it is not a multi-user service.

## Real metering / 接入真实计量

Set `JRA_MODE=measured` and supply `JRA_INGEST_TOKEN` via your private environment/secret store (at least 24 characters). Never put it in source or the public browser. Demo and measured modes use **separate database files**, so synthetic usage never becomes measured usage by switching modes. Choose a private `JRA_DATA_DIR`; local database files are ignored by Git.

| Route | Behaviour |
|---|---|
| `GET /api/events` | Last 2,000 completed events and mode; polling snapshot, not full-history export |
| `POST /api/events` | Bearer-authenticated measured-mode ingestion; max 64 KiB; idempotent exact duplicates |
| `GET /api/report` | Current Swiss-day meter totals, cost coverage, 005 checks and 000 strategy |
| `GET /api/reports` | Up to 30 persisted completed-day reports |
| `POST /api/tasks` | Authenticated internal-task queue; external action types rejected |

Full history remains in private SQLite; front-end counters describe the **current imported or last-2,000-event window**, not lifetime spend. No prompts or customer details are collected. Unknown event fields are stripped. Imports: array of events, `{ "events": [...] }`, or one event per JSONL line, ≤5 MB and ≤20,000 events. Duplicate IDs with differing meter values are rejected, not silently reconciled.

### Event schema

```json
{
  "event_id": "synthetic-request-001-attempt-1",
  "bot_id": "005",
  "timestamp_ms": 1794902400000,
  "input_tokens": 1000,
  "cached_input_tokens": 400,
  "output_tokens": 200,
  "system": "api",
  "success": true,
  "gpu_ms": null,
  "cost_chf": 0.00328
}
```

- `bot_id`: one of `000`–`020`; extending the fleet requires adding an approved roster definition.
- Token counts: nonnegative safe integers. Cached input is a subset of total input. Include provider-billed reasoning in output **once**; do not add it to an output total that already contains it. Token counts across different tokenizers are operational counts, not a universal measure of computational work.
- `system`: `api`, `rental`, or `own`. `success` describes this **call**, not acceptance of an entire multi-call business workflow.
- `gpu_ms`: **sum of allocated device milliseconds**, not wall latency. Eight GPUs allocated exclusively for 100 ms = 800 GPU-ms. Concurrent requests sharing a GPU must receive non-overlapping/fractional allocation; never allocate a full GPU to every request. Unknown = null. API vendor GPU-hours are unknown unless supplied by that vendor.
- `cost_chf`: actual attributable charge including the provider's billing categories, converted using the operator's recorded FX rate. Unknown = null, not zero. Do not add host/GPU allocations again if already included in a bill. Keep supplier, model, FX timestamp and invoice evidence in a private audit ledger keyed by event ID.
- Failed attempts remain in the cost ledger. Separate attempts use separate IDs. Timeouts with unknown outcomes require reconciliation; do not invent zero-cost events.

## Internal execution adapter / 内部执行适配器

Without `JRA_ADAPTER`, measured mode collects usage but executes no queued tasks. An operator can set an absolute module path exporting:

```js
export async function execute(task, { signal, max_cost_chf }) {
  // Resolve task.ref inside your approved private system.
  // Verify acceptance criteria and preflight the hard provider budget.
  // Honour AbortSignal and task.id as an idempotency key at every external system.
  // Return the event's numeric metering fields and success.
  // Do not return prompts, personal data or credentials.
}
```

The adapter is **trusted operator code**, not a plugin loaded from user input. Default max task budget CHF 1 and Swiss-day budget CHF 20 are demo guards; configure `JRA_MAX_TASK_CHF` and `JRA_MAX_DAY_CHF` privately. The queue checks the estimate before execution and flags missing/over-budget metering after execution. It cannot reverse already-incurred charges: the adapter **must enforce a provider-side cap before a request**, cancel on timeout, and reconcile unknown outcomes. No concurrent worker budget guarantees are claimed.

Task input (opaque reference only):

```json
{"idempotency_key":"example","bot_id":"020","kind":"plan","input_ref":"synthetic-brief","action":"internal","estimated_cost_chf":0.05}
```

`kind` is `analyse`, `summarise` or `plan`. The reference is resolved privately. `action` must be `internal`; email, payment, deletion and public publication need separately approved executors. An acknowledged task enters `running`; process restarts mark unknown in-flight tasks `needs_review`, not automatic replay. Identical instruction IDs do not execute twice.

Set `JRA_DAILY_DIRECTIVES=1` to enqueue one internal `plan` instruction per role at start and each Swiss-day rollover, with a unique `strategy-DATE-BOT` key. Instruction acceptance is recorded before adapter execution. This is an internal queue, not a claim that all real Bots have acknowledged messages. The server persists a 005 report for the previous day and a 000 first-principles strategy; no email/social publication happens automatically.

Optional `JRA_CONFIG` points to a private JSON with `config` (same accounting fields as `web/model.mjs`) and `benchmarks`:

```json
{"config":{"tasks":1000},"benchmarks":[{"system":"api","quality":0.98,"latency_ms":2500,"privacy_approved":true}]}
```

Only operator-supplied benchmark candidates passing quality ≥0.95, latency ≤10,000 ms and privacy approval are eligible. No qualified benchmark → **keep the approved route**, request evidence. Lowest estimated cost is not proof of the globally optimal workflow. 000's Musk-inspired first-principles persona is a working-style reference, not impersonation or endorsement.

## Mathematics / 数学口径

The pure functions in `web/model.mjs` are shared by the website, reports and tests. All default prices, electricity tariffs, throughput and capex are **editable CHF examples**, not current quotes. No automatic USD/CHF conversion is implied.

Let J = useful tasks/day × days, p = retry probability, d = duplicate overhead, e = duplicate removal, r = input-context reduction. Expected attempts = `1/(1−p)` (independent retries model). Baseline input/output include `1+d`; optimised work includes `1+d(1−e)`, input also includes `1−r`. Then add daily governance tokens (000 plan + 005 audit + role acknowledgements). The scenario models **23 governance calls/day** in tool fees. Real runner retry caps differ from the geometric planning estimate; calibrated provider usage is authoritative.

`API CHF = [(I−C)pin + C pcached + O pout]/10^6 + calls×tool_fee + management`

`active GPU-h = [(I−C+C×cache_compute)/prefill_tps + O/decode_tps]/3600`

`rented allocated GPU-h = active GPU-h / target_utilisation`

`installed GPU-h = GPU count × powered hours/day × days`

The sequential prefill+decode approximation must be calibrated for model, precision, input/output length, cache, batching and tensor parallelism. Rates are **per-GPU equivalents** including parallel devices. Hardware peak FLOPS and TDP do not directly produce a token throughput number. Prefix-cache compute savings and billed-input discounts are different parameters. A rented cluster is elastic in this model; rental minimum commitments, reserved capacity and vendor billing quantum are not modelled.

Self-built cost = straight-line depreciation + energy + maintenance + management + facility/network + tools. Depreciation uses installed capital including server/network allocation, residual value and useful life: `cards × capex_per_card × (1−residual) × days/(years×365)`. Full calendar depreciation remains even if equipment is powered for fewer hours. Electricity: `(activeGPUh×activeW + idleGPUh×idleW + installedGPUh×hostW)/1000 × PUE × tariff`. Management/facility rates use a 30-day accounting month. Maintenance is an annual capex fraction. Idle energy, depreciation and fixed staffing remain when the workload is zero.

Rental GPU rates are assumed to include host electricity; no duplicate power charge is added. Self-built capacity fails if `active GPU-h / target_utilisation > installed GPU-h`. An infeasible self-built scenario is excluded from the cheapest-route recommendation. Initial capital cash outlay is displayed separately from depreciation; they are not added together. Financing, taxes, redundancy and unallocated fit-out are excluded unless the operator incorporates them into assumptions. Same-quality, legally deployable model availability and service levels must be established before comparing API and owned inference.

The cost chart samples 41 workload points. “First cheaper” is an **approximate sampled range**, not an exact break-even. Costs per million output include the associated input/overhead cost. Output/input ratio is not a quality, profit or conserved-inventory metric. Token reductions and quality improvements require controlled A/B evidence; the UI does not claim measured savings.

## UI and verification

English/Chinese detailed copy; navigation, core labels and scenario names in eight languages (EN/ZH/DE/FR/IT/ES/PT/JA). Technical help falls back to English outside EN/ZH. Mobile layout, reduced-motion CSS, pausable simulation and an accessible table accompany SVG charts. Browser imports are kept in memory and disappear on reload; exports are user-initiated local downloads. A closed static page is not a background daemon.

Tests cover units, cache billing, idle costs, negative savings, infeasible capacity, invalid values, failed calls, duplicate events, acknowledgements, bounded retries, budget gates, crash recovery, quality-qualified routing and Zurich date boundaries. See `tests/`. Container definition is provided but not production load/security certified.

Reference methodology (checked 2026-11-17): [OpenAI pricing categories](https://platform.openai.com/pricing/), [Runpod GPU billing](https://www.runpod.io/pricing), [NVIDIA per-GPU output throughput](https://nvidia.github.io/TensorRT-LLM/latest/developer-guide/perf-overview.html), [NVIDIA H100 specifications](https://www.nvidia.com/en-eu/data-center/h100/). Links support definitions, **not the illustrative CHF defaults**.

## 中文执行说明

本模块已提供可运行的交互演示、严格区分输入/输出/缓存的计量模型、卡时与自建成本核算，以及本地采集和任务运行器。小规模优先评估租赁，持续高负载可评估自建；结论由利用率、质量和真实报价决定。去重不等于零成本：确认、治理、重试和失败调用都必须记账。

真实 24 小时部署还需：经批准的模型适配器、私有用量日志、供应商单价、实际电表/设备分摊以及生产服务运行环境。开源源码不包含这些账号与经营数据。005 每日检查证据和效率，000 汇总并形成内部策略；只有满足验收与预算限制的内部任务才进入执行队列。公开展示不等于已接通所有真实 Bot，也不承诺固定节省率。
