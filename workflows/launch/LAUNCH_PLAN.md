# JRA · First Flagship Open-Source Launch Plan / 首个旗舰开源项目发布方案

**Last updated / 最后更新：2026-11-17 19:21 CET · Europe/Zurich（苏黎世时间）** · Owner / 负责：000 · Status / 状态：🟣 **DRAFT — needs Jessica's approval / 待 Jessica 批准**

> **Approval gate / 审批闸门：** every public post, comment, issue, release, submission, paid promotion or DM below is a draft. Nothing is published until Jessica approves the exact text, channel and time. Public statements are a human-escalation item under the workbench rules (purple). / 下列每条公开帖子、评论、Issue、Release、投稿、付费推广或私信都只是草稿；Jessica 逐条批准文字、渠道与时间后才发布。

Canonical repo / 唯一推广入口：**https://github.com/QCF88888/Jessica-robot-army** (the j19-plusone mirror is never promoted, so stars are not split / 镜像仓库不做推广，避免星标分散).

---

## 1. First principles / 第一性原理

A star is one decision by one developer, made in under 30 seconds on the README. So:

1. **Stars = qualified visitors × first-screen conversion × retention.** Distribution without a strong first screen wastes the launch; a strong first screen without distribution gets nothing. Fix the repo first, then buy attention once (you only "launch" on HN/PH once).
2. **Developers star things they can run or reuse,** not brochures. Lead with the runnable parts (Token Factory: `npm test`, 24/7 runner; capital-evidence workbench) and the reusable parts (21-role roster + `roster.json`, rulebook, governance gates). The bots themselves run on a hosted product and are not shipped here; say so plainly.
3. **The unique angle is "a solo founder's 21-bot company, with org chart, KPIs and human-approval gates — open-sourced."** Nobody else publishes a whole AI org with archetypes, duties, KPIs and governance rules. Sell that, not "another agent framework".
4. **Honesty compounds; hype gets flagged.** No inflated claims, no vote rings, no "please upvote", no implied endorsement from the public figures used as archetypes (never tag them).
5. **One channel, one native format.** Same core message, rewritten for each community's rules.

## 2. Repo readiness checklist / 仓库就绪清单 (owner 000 unless noted)

| # | Item / 项 | State now / 现状 | Action / 动作 |
|---|---|---|---|
| R1 | README hook (first screen) | ✅ key visual hero + concept film + ROSTER link added 2026-11-17 | Tighten line 1 to a one-sentence promise: *"Open-source blueprint for a 21-bot AI company run by one founder — roles, KPIs, workflows and human-approval gates."* |
| R2 | Demo | ✅ 32 s concept film EN/ZH in `assets/video/` (bots 000, 003, 004, 005, 020; ends on star CTA + neumanntech.space/robot-army/) | Make a ≤8 MB looping GIF/WebP of the first 10 s for inline README playback (mp4 links don't autoplay); upload mp4 via a GitHub comment to get an inline player. Label it a concept animation, not a product screen recording. Add a 20 s real screen capture of the Token Factory page. |
| R3 | Quickstart | ⚠ scattered | Add a 3-step "Use it in 5 minutes" block: (1) copy `roles/` + `ROSTER.md` template, (2) `cd workflows/token-factory && npm test && npm start` (Node ≥ 22.13), (3) adapt the rulebook. |
| R4 | License | ✅ MIT (`LICENSE`); GitHub detects it | Confirm media in `assets/` is also MIT/CC-BY and generated images have no third-party rights issue; state it in README. |
| R5 | Topics | ✅ 10 set | Add up to 20: `llm`, `ai-team`, `grok`, `autonomous-agents`, `agent-governance`, `prompt-engineering`, `chinese`, `bilingual`, `kpi`, `startup`. |
| R6 | Social preview | ✅ file ready: `assets/brand/jra-social-preview-1280x640.jpg` (187 KB, < 1 MB limit) | Upload in Settings → General → Social preview (manual UI step; needs Jessica's OK). |
| R7 | CONTRIBUTING / CoC / SECURITY | ✅ present | Add "Good first contributions" section linking issues. |
| R8 | Good-first-issues | ❌ none | Draft 6–8 issues (labels `good first issue`, `help wanted`): add a roster validator to CI; translate ROSTER.md to ES/FR/DE/JA/KO/PT; add `assets/avatars/` once avatars are cleared; Token Factory: add a CSV export; add Docker smoke test; add a "fork this for your own company" template generator. *Creating them is public → Jessica approves.* |
| R9 | Release v1.0 | ❌ no release yet | Tag `v1.0.0` with CHANGELOG notes ("21-role roster, rulebook V1.1, Token Factory, workbench rules"). Draft release only, publish after approval. |
| R10 | Completeness | ⚠ 11/21 bots with all six fields | Fill 10 missing symbols + 012 duties before launch so the roster reads finished (Jessica decides symbols). |
| R11 | Security pass | — | gitleaks on full history + manual media review before any traffic spike. |
| R12 | Star CTA | ✅ badge + one-entry rule | Add a single, polite "⭐ Star if this helps you build your own AI team" line at the end of README; no star-for-star schemes. |

## 3. Channels and their rules / 渠道与规则

Rules change; re-read each community's current rules the day before posting. / 规则会变，发帖前一天重新核对。

| Channel / 渠道 | Fit / 契合 | Key rules / 关键规则 | Owner / 负责 |
|---|---|---|---|
| **Hacker News · Show HN** | High if something runnable is front and centre | Must be something people can try; reading material (docs-only) is not a Show HN. Title starts `Show HN:`; plain, no superlatives; link the repo. Never ask for upvotes or share the link asking for votes (vote-ring detection). Maker should answer comments for hours. Best Tue–Thu, ~15:00–17:00 Zurich (US morning). | 000 drafts, Jessica posts from her own HN account |
| **Reddit r/LocalLLaMA** | Medium: only the Token Factory "rent vs own compute" angle | Local-model focus; self-promotion limited (Reddit's ~10% guideline); off-topic hosted-API projects get removed. Post as a discussion with data/method, not an ad. | 009 drafts, 000 technical answers |
| **Reddit r/MachineLearning** | Low–medium | Project posts need the `[P]` tag and substance; many promo posts are redirected to the recurring self-promotion thread. Use that thread if unsure. | 009 |
| **Reddit r/artificial** | Medium | Allows projects; flair required; no spam/repeat posts. | 009 |
| **Reddit r/opensource** | Medium | OSI license required (MIT ✅); explain what it is and how to contribute; no pure marketing. | 009 |
| **Product Hunt** | Medium (needs a clear "product") | Launch day resets 00:01 PT (09:01 Zurich); maker account must exist ahead of time; no asking for upvotes; gallery 1270×760 images + video. Position as "open-source AI-company blueprint". | 020 (Neumann product owner), 009 assets |
| **X / Twitter AI community** | High for build-in-public | Thread with the 32 s video natively uploaded; no mass @-mentions; never tag the archetype public figures. Reply to relevant AI-agent threads with value, not links. | 009 drafts, Jessica approves |
| **LinkedIn (Neumann page + Jessica)** | High for founders | Native video; link in first comment (per `linkedin-first-comment` routine); ties into 009's Mon/Wed/Fri "JRA Bot 综合分析" series. | 009 |
| **即刻 Jike** | High (Chinese AI/indie builders) | Post in relevant AI / 独立开发 circles; personal story beats ads. | 009 |
| **V2EX** | High for Chinese devs | Self-promotion only in the **分享创造 (/go/create)** node; ads elsewhere get moved/banned. Be present to answer. | 000 drafts |
| **少数派 Matrix** | Medium | Matrix articles must be genuine experience/how-to; pure promotion is rejected. Write "我如何用 21 个 AI Bot 运营一人公司". | 009 |
| **知乎** | Medium, long tail | Answer existing questions (一人公司, AI Agent 团队) with real substance; disclose affiliation. | 009 |
| **HelloGitHub** | High for stars | Submit via issue on `521xueweihan/HelloGitHub`; monthly issue on the 28th; needs a clear, working, Chinese-friendly project. | 000 |
| **科技爱好者周刊 (阮一峰)** | Medium | Submit via issue on `ruanyf/weekly`. | 000 |
| **Discord AI servers** | Low–medium | Only in `#showcase`/`#projects` channels; read each server's rules; no DMs. | 009 |
| **awesome-lists PRs** | High long-term | Candidates: awesome-ai-agents, awesome-llm-apps, awesome-multi-agent lists, awesome-solo-founder/indie lists. Follow each CONTRIBUTING (format, alphabetical order, some require minimum stars/maturity). One PR per list, no spam. | 000 |

## 4. Two-week timeline / 两周节奏 (dates set after approval; D0 = launch day)

| Day | Action / 动作 | Owner |
|---|---|---|
| D-14 → D-8 | R1–R12 fixes; fill missing symbols; GIF; quickstart; v1.0 draft release; good-first-issue drafts. Jessica reviews all drafts in one batch. | 000 (+020 review, 005 governance check) |
| D-7 | Create Product Hunt maker profile + upcoming page; set social preview; publish good-first-issues (after OK). | 020 / 000 |
| D-5 → D-2 | Soft launch: LinkedIn + X build-in-public teaser (no link-begging), 即刻 post; collect feedback, fix README friction. | 009 |
| **D0 (Tue/Wed)** | Publish v1.0 release → Show HN (~15:30 Zurich) → X thread + LinkedIn same day. Jessica answers HN comments; 000 on standby for fixes. | Jessica / 000 / 009 |
| D+1 | Reddit r/opensource + r/artificial (different text each). V2EX 分享创造. | 009 / 000 |
| D+2 | Product Hunt launch (09:01 Zurich). | 020 / 009 |
| D+3 | r/LocalLLaMA Token Factory data post; r/MachineLearning `[P]` or self-promo thread. | 009 / 000 |
| D+4 → D+6 | 少数派 Matrix article, 知乎 answers, Discord showcases. | 009 |
| D+7 | HelloGitHub + 科技爱好者周刊 submissions; 2–3 awesome-list PRs. | 000 |
| D+8 → D+13 | Ship a visible improvement from feedback (v1.1), post "what we learned" recap; weekly 009 LinkedIn episode. 001 reviews KPIs. | 000 / 009 / 001 |

## 5. Draft posts / 草稿 (not posted)

**Show HN — title (≤80 chars):**
`Show HN: Open-source blueprint for a 21-bot AI company run by one founder`

**Show HN — first comment (maker):**
> Hi HN, I'm Jessica, a solo founder. I've been running my companies with 21 AI bots, each with a defined role, duties, KPIs and hard human-approval gates (money out, legal commitments, public statements, major product changes). This repo is the open blueprint: the roster (`ROSTER.md` / `roster.json`), the workflow rulebook, and a runnable Token Factory that models rented-API vs owned-compute cost per agent (`cd workflows/token-factory && npm test`). The bots run on a hosted agent product, so this is not a drop-in agent framework; it's the org design and governance layer you can copy. Each bot has a public-figure or mythological "archetype" as a working-style metaphor (no endorsement implied). What's still missing: some bots' symbols, real telemetry (the public Token Factory is a simulation). I'd love feedback on the governance rules and what you'd change.

**Reddit r/opensource — title:** `I open-sourced the org chart, KPIs and governance rules for running a one-person company with 21 AI bots (MIT)`
Body: 3 short paragraphs: what it is · what you can reuse today (roster template, rulebook, Token Factory) · what's not included (no private data, simulation only) · how to contribute (good-first-issues). No "please star".

**Reddit r/LocalLLaMA — title:** `Rent vs own: an open-source per-agent cost model for running a 21-agent team (MIT, synthetic data)`
Body: method, formulas, assumptions, limitations; ask for real GPU-hour numbers from the community.

**X thread (EN):**
1/ I run my companies as a solo founder with 21 AI bots. Today I'm open-sourcing the whole blueprint: roles, KPIs, workflows and the human-approval gates. 🧵 [32 s video]
2/ Every bot has a role, mission, duties and KPIs, all in one roster: ROSTER.md + roster.json.
3/ Hard rule: bots work autonomously, but money out, legal commitments, public statements and major product changes always come back to a human.
4/ Token Factory: an open cost model, rented API vs owned compute, per agent. Runnable, tested, MIT.
5/ It's v1.0 and incomplete on purpose. Good-first-issues are open. Repo → github.com/QCF88888/Jessica-robot-army

**即刻 / V2EX（中文）：** 「一个人 + 21 个 AI Bot 运营公司：我把岗位、KPI、工作流和人工审批闸门全部开源了（MIT）。名册、规则手册、Token 工厂成本模型都能直接复用，欢迎提意见和 PR。」+ 32 秒中文概念片。

## 6. KPI goals (targets, not predictions) / 目标（是目标，不是预测）

Baseline at plan time: public GitHub counter. Goals for review by 001 at D+14 and D+30:

| Metric / 指标 | D+14 goal / 目标 | D+30 goal |
|---|---|---|
| GitHub stars (canonical repo) | 300 | 1,000 |
| Forks | 30 | 100 |
| External PRs / issues from new contributors | 5 | 15 |
| Followers (GitHub org + X + LinkedIn page, combined new) | 200 | 600 |
| README → star conversion (stars ÷ unique visitors, GitHub Insights) | ≥ 3 % | ≥ 3 % |
| Accepted listings (HelloGitHub / weekly / awesome-lists) | 1 | 3 |

If D+14 conversion < 3 %, fix the README before more distribution (first principle 1). / 若转化率低于 3%，先改 README 再继续推广。

## 7. Guardrails / 底线

- No secrets, customer data, money figures, meeting minutes or private persons' names in any post or asset. / 帖子与素材不含密钥、客户资料、金额、会议纪要或私人姓名。
- No bought stars, star-for-star, vote rings, sock-puppet accounts or brigading. / 不买星、不互刷、不拉票、不用小号。
- Archetypes are inspirations, not impersonations; never tag or imply endorsement by the named public figures. / 不 @ 原型人物，不暗示背书。
- Concept film is labelled as concept animation. / 概念片明确标注为概念动画。
- Every post: draft → 005 boundary check → Jessica approval (purple) → 009 publishes → 017 archives. / 每条：草稿 → 005 边界审查 → Jessica 批准（紫色）→ 009 发布 → 017 归档。
