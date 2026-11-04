# Ops Log 2026-11-01 · Open-source launch playbook / 开源发布操作记录

> 可复用流程，已脱敏：无内部事项、合作方、金额。Reusable, sanitized playbook: no internal matters, partners or amounts.

| # | 步骤 Step | 中文 | English |
|---|---|---|---|
| 1 | Roster check | 核对总指挥 Bot 的台账与部署目录是否覆盖全部 20 个 Bot；发现提醒任务只覆盖旧编号范围、目录未定稿、代码仓无名册 | Verify the chief bot's ledger covers all 20 bots; found reminders scoped to the old range, directory not final, no roster in the repo |
| 2 | Hot-repo selection | 用 GitHub API 核实 22 个热门仓库的真实星数和许可证，不信截图 | Verify real stars and licenses of 22 trending repos via the API, not screenshots |
| 3 | Trials + safety bans | 浅克隆 6 个，只做无密钥的冒烟测试；逆向、渗透、凭证代理类一律禁用不运行 | Shallow-clone 6, secret-free smoke tests only; reverse-engineering, pentest and credential-proxy tools banned, never run |
| 4 | Marketing-tool research | 统计、社媒排程、邮件、SEO、A/B 各选代表工具，记录星数与用途 | Shortlist analytics, social scheduling, email, SEO and A/B tools with stars and use cases |
| 5 | Sanitization rules | 专项岗位按赛道标注；财务岗只公开配置与功能说明；只公开方法、工作流、KPI、汇总结果 | Label project bots by track; finance role as config guide only; publish method, workflows, KPIs, aggregates only |
| 6 | Naming | 人类负责人定名，英文 ASCII 仓库名，展示标题可双语 | Owner picks names; ASCII repo slugs, bilingual display titles |
| 7 | Account choice | 人类明确批准发布账号后才建仓 | Create repos only after the owner approves the account |
| 8 | Public repos, fresh history | 新目录从零单次初始提交，不带私有历史 | New directory, single fresh initial commit, no private history |
| 9 | Pre-push scans | 每次推送前跑 gitleaks + grep（邮箱、ID、路径、合作方/项目名、金额、人名） | Before every push: gitleaks + greps (emails, IDs, paths, partner/project names, amounts, personal names) |
| 10 | Rename via API | 改名用 API 原地改，不建重复仓库，再提交更新标题与徽章 | Rename in place via API (no duplicate), then commit updated title and badges |
| 11 | Star-growth polish | 本地 SVG 横幅、钩子、三条卖点、徽章、star-history、一条命令快速开始、贡献指南、行为准则、Issue 模板、Roadmap、姊妹库互链；数字如实标注样本 | Local SVG banner, hook, 3-bullet value prop, badges, star-history, one-command quick start, contributing, CoC, issue templates, roadmap, cross-links; honest sample labels |
| 12 | Launch checklist | 起草 HN、Reddit、V2EX、掘金、Product Hunt 文案和社媒要点；人类逐篇确认后由单一负责 Bot 发布 | Draft posts for HN, Reddit, V2EX, Juejin, Product Hunt and social talking points; owner approves each, single owner bot publishes |

**Lessons / 经验**：外部可见动作（建仓、公开、发帖）每一步都要人类明确批准；扫描零命中才推送；有疑问就停。Every externally visible step needs explicit owner approval; push only on zero scan hits; stop when unsure.
