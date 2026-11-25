# JRA Teams · 团队模板

## English

This folder expresses JRA's 21 bots (000–020) as a portable **team template** so that any agent product, or a person, can read, reuse or import the team structure.

- **What is inside:** [`jra/team.md`](jra/team.md) lists every position with its mission, symbol, public archetype, core duties, KPI dimensions and boundaries, plus three collaboration rooms and one paused routine. [`jra/skills/`](jra/skills/) holds five shared playbooks taken from JRA's public workflows and governance rules: cross-bot handoff, collaboration red lines, daily report, archiving and script-first routines.
- **Source of truth:** the roster stays in [`ROSTER.md`](../ROSTER.md) / [`roster.json`](../roster.json) (built from [PERSONAS.md](../PERSONAS.md), [MISSIONS.md](../MISSIONS.md) and [roles/](../roles/)). If they disagree, the roster wins; regenerate this template rather than hand-editing duties.
- **What is NOT inside:** keys, credentials, customer data, internal business data, money figures, usage shares, meeting or decision content, private persons' names, conversations, memory or account connections. Connector names are requirements, never authorisation.
- **Format origin:** the folder layout (`teams/<slug>/team.md` + `skills/<name>/SKILL.md`, YAML frontmatter with `botmrr: 2`) follows the *BotMRR Markdown v2 template folder* convention published by [milind-soni/openmausbot-teams](https://github.com/milind-soni/openmausbot-teams) under the MIT License. Only the format convention was followed; no OpenMausBot application code (Apache-2.0) is included in this repository. See [THIRD_PARTY_NOTICES.md](../THIRD_PARTY_NOTICES.md).
- **Independence:** JRA is an independent project. It is not affiliated with, sponsored or endorsed by OpenMausBot, Supamaus Software Private Limited, xAI or any archetype named here. "OpenMausBot" and "MausBot" are trademarks of their owners.

### How to use

1. **Read it:** open `jra/team.md`; the Markdown body below the frontmatter is self-contained.
2. **Give it to an agent:** paste `jra/team.md` into your Chief-of-Staff agent and ask it to set up the team. It must keep every routine paused until you enable it, and never ask for pasted passwords or keys.
3. **Import it:** products that read BotMRR v2 template folders can import the `jra/` folder as-is.
4. **Adapt it:** copy the folder, rename the slug, and replace positions with your own. Keep the boundaries section.

## 中文

本文件夹把 JRA 的 21 个 Bot（000–020）写成可移植的**团队模板**，方便任何 Agent 产品或个人阅读、复用或导入团队结构。

- **内容：** [`jra/team.md`](jra/team.md) 列出每个岗位的使命、象征、公开人物原型、核心职责、考核维度与边界，并包含 3 个协作室和 1 个默认暂停的例行任务。[`jra/skills/`](jra/skills/) 收录 5 个来自 JRA 公开工作流与治理规则的共享技能：跨 Bot 交接、协作红线、每日报告、归档、先脚本后模型的例行任务。
- **权威来源：** 名册仍以 [`ROSTER.md`](../ROSTER.md) / [`roster.json`](../roster.json) 为准；两者不一致时以名册为准，应重新生成模板，而不是手改职责。
- **不包含：** 密钥、凭证、客户资料、内部经营数据、金额、用量占比、会议或决议内容、私人姓名、对话、记忆与账户连接。连接器名称只是需求，不等于授权。
- **格式来源：** 目录结构（`teams/<slug>/team.md` + `skills/<name>/SKILL.md`，frontmatter 含 `botmrr: 2`）沿用 [milind-soni/openmausbot-teams](https://github.com/milind-soni/openmausbot-teams) 以 MIT 许可发布的 *BotMRR Markdown v2 模板文件夹* 约定。仅沿用格式约定，本仓库不包含任何 OpenMausBot 应用代码（Apache-2.0）。署名见 [THIRD_PARTY_NOTICES.md](../THIRD_PARTY_NOTICES.md)。
- **独立声明：** JRA 是独立项目，与 OpenMausBot、Supamaus Software Private Limited、xAI 及文中任何人物原型均无隶属、赞助或背书关系；"OpenMausBot""MausBot" 为其权利人的商标。

### 用法

1. **阅读：** 打开 `jra/team.md`，frontmatter 之后的正文可独立阅读。
2. **交给 Agent：** 把 `jra/team.md` 交给你的总指挥 / Chief of Staff Agent，请它按此组建团队；所有例行任务在你启用前保持暂停，且不得索取密码或密钥。
3. **导入：** 支持 BotMRR v2 模板文件夹的产品可直接导入 `jra/` 文件夹。
4. **改编：** 复制文件夹、改名，替换为你自己的岗位；保留"边界"部分。
