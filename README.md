<p align="center"><img src="assets/banner.svg" alt="Jessica's Robot Army · Jessica的Robot军团" width="100%"></p>

<h1 align="center">Jessica's Robot Army · Jessica的Robot军团</h1>
<p align="center"><b>一个人 + 20 个 AI Bot，像公司一样运转。 / One human + 20 AI bots, run like a company.</b></p>
<p align="center">
<a href="https://github.com/j19-plusone/Jessica-robot-army/stargazers"><img src="https://img.shields.io/github/stars/j19-plusone/Jessica-robot-army?style=flat-square" alt="stars"></a>
<a href="LICENSE"><img src="https://img.shields.io/github/license/j19-plusone/Jessica-robot-army?style=flat-square" alt="license"></a>
<a href="https://github.com/j19-plusone/Jessica-robot-army/commits/main"><img src="https://img.shields.io/github/last-commit/j19-plusone/Jessica-robot-army?style=flat-square" alt="last commit"></a>
</p>
<p align="center"><a href="#中文">中文</a> · <a href="#english">English</a></p>

- **20 个岗位模板 / 20 role templates** (000–019): 职责、边界、例行任务、KPI / duties, boundaries, routines, KPIs
- **治理红线 + 额度规则 / Governance & quota rules** that stop overlap, duplicate sends and token waste
- **真实运行数据 / Real-run results**: e.g. ~87% routine success (one-day sample, 13/15, 0 timeouts)

## Quick start / 一条命令开始
```bash
git clone https://github.com/j19-plusone/Jessica-robot-army && mkdir -p my-bot-team && cp -r Jessica-robot-army/roles Jessica-robot-army/governance ./my-bot-team/
```

> ⭐ **Why star this / 为什么点星**：如果你在跑不止一个 Agent，这里的分工与治理方法能直接复用。If you run more than one agent, star it to keep the playbook handy.

**Related / 相关**: [Jessica-Skills-real-test-database](https://github.com/j19-plusone/Jessica-Skills-real-test-database) — 姊妹库：工具实测点评 / Sister repo: hands-on tool reviews

## 中文
**为什么**：单个 Agent 技能很多，但"一支 Bot 团队怎么分工、不越界、不烧额度"没人讲。本仓库开源的是方法、工作流、KPI 和验证结果，不含任何具体事项或内部对话。

**快速开始**
1. 复制 `roles/` 中需要的岗位模板，填入你的工具与时间。
2. 先部署 000 总指挥 + 005 治理官，再按需加岗位。
3. 启用 `governance/` 全部规则，用 `workflows/daily-report.md` 每天复盘。
4. 按 `kpi/` 为每条赛道设一个北极星指标。

## English
**Why**: plenty of single-agent skills exist; few show how a *team* of bots splits work, respects boundaries and saves quota. This repo shares the method, workflows, KPIs and validated results — no specific matters or internal conversations.

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
