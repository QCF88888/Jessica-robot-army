<p align="center"><img src="assets/banner.svg" alt="Jessica's Robot Army · Jessica的Robot军团" width="100%"></p>

<h1 align="center">Jessica's Robot Army · Jessica的Robot军团</h1>
<p align="center"><b>一个人 + 20 个 AI Bot，像公司一样运转。 / One human + 20 AI bots, run like a company.</b></p>
<p align="center">
<a href="https://github.com/j19-plusone/Jessica-robot-army/stargazers"><img src="https://img.shields.io/github/stars/j19-plusone/Jessica-robot-army?style=flat-square" alt="stars"></a>
<a href="LICENSE"><img src="https://img.shields.io/github/license/j19-plusone/Jessica-robot-army?style=flat-square" alt="license"></a>
<a href="https://github.com/j19-plusone/Jessica-robot-army/commits/main"><img src="https://img.shields.io/github/last-commit/j19-plusone/Jessica-robot-army?style=flat-square" alt="last commit"></a>
</p>
<p align="center"><a href="#中文">中文</a> · <a href="#english">English</a></p>

> **三大原则 / Three principles:** 可验证 · 可执行 · 可考核 / Verifiable · Executable · Auditable

- **20 个岗位模板 / 20 role templates** (000–019): 职责、边界、例行任务、KPI / duties, boundaries, routines, KPIs
- **治理红线 + 额度规则 / Governance & quota rules** that stop overlap, duplicate sends and token waste
- **真实运行数据 / Real-run results**: e.g. ~87% routine success (one-day sample, 13/15, 0 timeouts)
- **项目代号表 / Project codenames** — 7 projects, no partner names exposed
- **AI Scars 工具库 / AI Scars toolbox** — 6-week scoring ladder (7/14/21/35/42 days)

## Quick start / 一条命令开始
```bash
git clone https://github.com/j19-plusone/Jessica-robot-army && mkdir -p my-bot-team && cp -r Jessica-robot-army/roles Jessica-robot-army/governance ./my-bot-team/
```

> ⭐ **Why star this / 为什么点星**：如果你在跑不止一个 Agent，这里的分工与治理方法能直接复用。If you run more than one agent, star it to keep the playbook handy.

**Related / 相关**: [Jessica-Skills-real-test-database](https://github.com/j19-plusone/Jessica-Skills-real-test-database) — 姊妹库：工具实测点评 / Sister repo: hands-on tool reviews

---

## 中文

### 为什么
单个 Agent 技能很多，但"一支 Bot 团队怎么分工、不越界、不烧额度"没人讲。本仓库开源的是**方法、工作流、KPI 和验证结果**，不含任何具体事项或内部对话。

### 架构 / Architecture

```
┌──────────────────────────────────────────────┐
│              Jessica (human)                  │
│         decisions · approvals · strategy      │
└──────────────────┬───────────────────────────┘
                   │
┌──────────────────▼───────────────────────────┐
│     000 · Assistant 贴身助理                  │
│   bot registry · routing · coordination      │
└──────────────────┬───────────────────────────┘
                   │
     ┌─────────────┼─────────────┐
     ▼             ▼             ▼
┌──────────┐ ┌──────────┐ ┌──────────┐
│ 001 幕僚长 │ │ 005 治理官 │ │ 010 邮件官 │
│ business │ │ red lines│ │ Gmail/Cal│
│ KPI roll │ │ risk     │ │          │
└────┬─────┘ └──────────┘ └──────────┘
     │
┌────▼──────────────────────────────────────┐
│ COO layer: 006 WDEO · 007 JJFit · 008 QCF │
│ 013 龙 · 018 Wishcode · 019 基因工程        │
└────┬──────────────────────────────────────┘
     │
┌────▼──────────────────────────────────────┐
│ Specialists: 002 003 004 009 011 012 014   │
│ 015 016 017                                 │
└───────────────────────────────────────────┘
```

**基础设施 / Infrastructure**

| 层 / Layer | 内容 / What | 位置 / Where |
|---|---|---|
| 编排 / Orchestration | Rakazo 自托管 (Apache 2.0) | 私有仓 `rakazo-deploy` |
| 模型 / Models | Grok (年费) + OpenAI (年费)，每 Bot 可切换 | 自带 key |
| 代码与审计 / Code & audit | GitHub | 本仓公开 · 每 Bot 工作流仓私有 |
| 数据 / Data | iCloud 2TB + Google Workspace 1TB | 每项目独立企业邮箱 |

每个 Bot 拥有独立的私有工作流仓库（`bot-000-assistant` 至 `bot-019-*`）。每个任务、每个产出、每个错误都带时间戳提交。出问题不猜 — `git log`。

### 20 个 Bot / The 20 bots

| ID | 角色 / Role | 一句话使命 / Mission |
|---|---|---|
| 000 | 贴身助理 / Assistant | Bot 名册、路由、日常协调 |
| 001 | 幕僚长 / Chief of Staff | 商业模式、工作流、全项目 KPI 汇总 |
| 002 | 日程官 / Scheduler | 分时段计划、周复盘、发帖节奏 |
| 003 | 财务官 / CFO | 收支、发票、税务、月报 |
| 004 | 资本官 / Capital Robot | 生物科学/能源/体育/教育/商务政治每日简报 |
| 005 | 治理官 / Governance | 红线、权限边界、合规、风险 |
| 006 | WDEO COO | 中瑞欧桥梁：教育、身份、资本、健康 |
| 007 | JJFit COO | 个人健康数据 AGI — App、网站、SDK |
| 008 | QCF COO | 量子文明基金会：能源/生命科学/文明大学 |
| 009 | 脚本撰写 / Script Writer | 60–90 秒口播稿，选题到脚本流水线 |
| 010 | 邮件管理员 / Email Admin | 7+ 企业邮箱、日历、零手动登录 |
| 011 | 竞品监测 / Competitor Watch | 每日 5–8 条 AI/生物科技/机器人前沿简报 |
| 012 | 全球旅行官 / Travel Officer | 高端定制旅行（职责待定） |
| 013 | 龙 / Drago | 运动员数据平台 — Spot ID、Health ID 加密存储 |
| 014 | 欧洲 Hack 官 / Euro Hack | 大赛运营、会议约时 |
| 015 | 超算筹备 / Supercomputer | 量子文明超算中心 |
| 016 | 股市情报 / Stock Intel | 市场情报监测 |
| 017 | Mac 官 / Mac Officer | 本机操作、独立硬件 |
| 018 | Wishcode 许愿码 | 娱乐预测站 — 八语种，首测免费 |
| 019 | 基因工程 / Gene Project | 基因组合作档案、全球人类基因组倡议 |

### 项目代号 / Project codenames

公开层不暴露合作伙伴名称。内部用代号：

| 代号 / Codename | 是什么 / What | 技术栈 / Stack |
|---|---|---|
| **JJFit** | 个人健康数据 AGI — 健康数据智能体、可穿戴集成、SDK 直连 Apple Health & Android Health Connect（150+ 运动类型、睡眠、血氧） | TypeScript, HTML |
| **龙 Dragon** | 运动员生涯数据平台 — 从 8 岁起的体能/恢复/成长追踪、位置适配、领导力评分。商业模式：机构年订阅授权查询 | 加密 Spot ID + Health ID |
| **基因工程 Gene Project** | 全球人类基因组科研 — 完成 1998 年联合国测序工程未竟任务（中国贡献 3%）。重点：辐射区罕见病筛查、肿瘤药物人种匹配 | 基因组 + 多组学数据平台 |
| **WDEO** | 中瑞欧桥梁：国际教育、身份移民、资本、健康 | 多站 SEO + 线索 |
| **QCF** | 量子文明基金会 — 共建文明，守护生命。三大支柱：量子能源、生命科学、文明大学。20 CHF/月会员简报 | 基金会（筹备期，经 WDEO 执行） |
| **Wishcode** | 娱乐预测站。首次免费；专项报告（事业/爱情/财富/家庭/教育）付费。8+ 语种 | 轻量、转化优先 |
| **诺一曼 Neumann Tech** | 0→1 创业赋能 — 想法到执行策划到 BP 到产品到供应链到上线到结算到复盘 | 客户交付平台 |

### KPI 框架 / KPI framework

每个 Bot 按五个维度评分（每项 1–5，满分 25）：

1. **职责确认** — 岗位描述是否锁定
2. **交付物** — 本周是否交付真实产出
3. **卡点** — 是否卡住、原因
4. **产出时效** — 上次产出时间
5. **风险** — 越权、额度烧穿、安全标记

001 每周汇总，005 标记低于阈值项，000 路由修复。

### AI Scars 工具库 / AI Scars toolbox

我们用生产环境实测开源工具。六周评分阶梯：

| 天数 / Day | 关卡 / Gate |
|---|---|
| 7 | 冒烟测试 — 能安装运行？ |
| 14 | 稳定性 — 48h 连续无崩溃？ |
| 21 | 集成 — 能接入我们的栈？ |
| 35 | 负载 — 扛得住真实流量？ |
| 42 | 终审 / Verdict |

**终审判定 / Verdict categories:**

- ✅ **保留 / Keep** — 流畅可靠，值得维护
- ⚠️ **不流畅建议删除 / Deprecate** — 能用但摩擦大于价值
- 🚫 **禁用 / Banned** — 安全风险：凭证窃取、财务数据暴露、恶意行为

工具清单与实时评分将随测试计划成熟逐步公开。能碰到你的 key、你的卡、你的健康数据的工具，先拿 🚫 再拿星。

### Token 经济学 / Token economics

目前靠付费年订阅（Grok + OpenAI）运转，尚无营收。005 治理官执行硬预算。高错误率任务暂停 → 拆成可验证微步骤 → 再恢复。零重复授权循环：一次批准、一次执行、全审计链。

### 快速开始
1. 复制 `roles/` 中需要的岗位模板，填入你的工具与时间。
2. 先部署 000 总指挥 + 005 治理官，再按需加岗位。
3. 启用 `governance/` 全部规则，用 `workflows/daily-report.md` 每天复盘。
4. 按 `kpi/` 为每条赛道设一个北极星指标。

---

## English

**Why**: plenty of single-agent skills exist; few show how a *team* of bots splits work, respects boundaries and saves quota. This repo shares the **method, workflows, KPIs and validated results** — no specific matters or internal conversations.

**Infrastructure**: Rakazo self-hosted orchestration · Grok + OpenAI annual keys (swappable per bot) · GitHub for code and audit trail (this repo public, per-bot workflow repos private) · iCloud 2TB + Google Workspace 1TB for data, per-project enterprise mailboxes.

**KPI framework**: five dimensions scored 1–5 (25 max) — role confirmed, deliverables shipped, blockers, output recency, risk. 001 rolls up weekly, 005 flags below-threshold, 000 routes fixes.

**AI Scars toolbox**: six-week ladder (days 7/14/21/35/42) → verdict: Keep / Deprecate / Banned. Any tool touching keys, cards, or health data earns 🚫 before it earns a star.

**Token economics**: paid annual subscriptions, zero revenue yet. Hard budgets enforced by 005. High-error tasks paused, decomposed into verifiable micro-steps, resumed. Zero repeated-authorization loops.

**Quick start**
1. Copy the role templates you need from `roles/` and fill in your tools and schedule.
2. Deploy 000 Chief Bot + 005 Governance first, then add roles.
3. Enable every rule in `governance/`; review daily with `workflows/daily-report.md`.
4. Set one north-star metric per track from `kpi/`.

## Role map / 岗位图
| # | Role | Track |
|---|---|---|
| 000 | Chief Bot / 总指挥 | Orchestrator |
| 001 | Chief of Staff / 幕僚长 | Operations |
| 002 | Calendar Officer / 日程官 | Operations |
| 003 | Finance Officer / 财务官 | Finance (config guide only) |
| 004 | Capital Ops / 资本运营官 | Capital & BD |
| 005 | Governance Officer / 治理官 | Governance |
| 006 | Track Bot – Immigration & Education Consulting | Immigration & Education consulting track |
| 007 | Track Bot – Health-tech | Health-tech track |
| 008 | Track Bot – Foundation/Nonprofit | Foundation/Nonprofit track |
| 009 | Social Media Officer / 社媒官 | Media |
| 010 | Email Officer / 邮件官 | Communications |
| 011 | Intel Officer / 竞品监测 | Intelligence |
| 012 | Travel Officer / 全球旅行官 | Travel |
| 013 | Track Bot – Sports Project / 体育项目 Bot | Sports project track |
| 014 | Track Bot – Hackathon & Events | Events track |
| 015 | Track Bot – HPC Infrastructure | HPC infrastructure track |
| 016 | Market Intel / 股市情报官 | Markets |
| 017 | Device & Archive Officer / 设备与归档官 | Archive |
| 018 | Track Bot – Consumer App | Consumer app track |
| 019 | Track Bot – Biotech / Biotech 专项 Bot | Biotech track |

## Results / 验证结果
See [results/](results/README.md).

## Contributing / 参与贡献
欢迎 PR！见 [CONTRIBUTING.md](CONTRIBUTING.md)。Good first issues:
- 为你的行业补一个岗位模板 / Add a role template for your industry
- 翻译 README 为德语或其他语言 / Translate README
- 分享你的 Bot 团队 KPI 数据（仅汇总）/ Share aggregate KPI results

Roadmap: [ROADMAP.md](ROADMAP.md) · Ops log: [2026-11-01 open-source launch](ops-log/2026-11-01_open-source-launch.md)

## Star History
[![Star History Chart](https://api.star-history.com/svg?repos=j19-plusone/Jessica-robot-army&type=Date)](https://star-history.com/#j19-plusone/Jessica-robot-army&Date)

## License
MIT