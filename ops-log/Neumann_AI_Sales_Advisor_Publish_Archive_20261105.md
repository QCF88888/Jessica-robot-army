# Neumann 服务订阅型 AI 销售顾问 — 文案发布存档（FINAL）
# Neumann Subscription AI Sales Advisor — Copy Publish Archive (FINAL)

**日期：** 2026-11-05（苏黎世）｜**总指挥：** 000 Jessica Bot  
**状态：** 文案 FINAL · 网站源码已提交 · **部署未完成（Firebase 未登录）** · Fork B 锁定 · 实测结果滚动更新  
**线上目标：** https://neumanntech.space/sf-lab/ai-sales/  
**网站仓库：** j19-plusone/neumann-tech-website · commit `a543dba84d77df84f7ac7048088608ee9155747f`（短 SHA `a543dba`）已 push 至 `main`  
**部署：** `firebase deploy --only hosting --project neumanntech` **失败** — `Error: Failed to authenticate, have you run firebase login?`（FIREBASE_TOKEN / GAC / ~/.config/firebase 均无）。按安全规则停止，未绕开鉴权。  
**线上核验（苏黎世 2026-11-05 ~20:19）：** `/sf-lab/ai-sales/` → **HTTP 404**；`/sf-lab/` 仍为旧版（无 SF-006）。待 Jessica 完成 Firebase 登录或提供合法部署凭证后重跑部署。  
**工作草案（已被本文件取代）：** `Neumann_Zobi_AI_Sales_Publish_Draft_20261105.md`

## 1. 精准定位
服务订阅型 AI 销售顾问：在对话中理解需求、处理异议、引导预约与订阅，并在每次对话后复盘、纠错、回传用户偏好。**不是**电商弃购挽回机器人，不依赖 Shopify。Zobi（塔林）仅为模型对标，其数据为公司自报、未经审计。

## 2. 能力模型（整合旧五项 + 11-05 新增五项，去重后 8 项）
| # | 能力 | 定义 | 测评口径 |
|---|---|---|---|
| A1 | 引导下单 / 订阅转化 | 把对话推进到预约、试用、订阅付款 | 对话→预约/试用/订阅转化率；平均步数 |
| A2 | 订阅续费与升级 | 续订、升档、防流失 | 续订率、升档率、挽留成功率 |
| A3 | 长期跟进 | 跨周/月按节奏触达不打扰 | 跟进回复率、退订/投诉率 |
| A4 | 偏好推断 | 从对话推断需求、预算、偏好 | 推断与用户确认/后续行为一致率 |
| A5 | 喜好总结并回传记录 | 每位用户生成偏好摘要写回系统并留日志 | 写回完整率、字段准确率、可追溯日志 |
| A6 | 被拒后自我复盘 | 被拒后分析原因并调整下次策略 | 复盘记录率；二次触达转化率 vs 基线 |
| A7 | 分地区销售模式 | 按 CH/EU/CN/US 调整语言、节奏、合规与话术 | 各区转化与满意度差异；合规零违规 |
| A8 | 自我错误修复 | 发现事实/报价/策略错误并当场更正 | 错误检出率、更正时长、人工接管率 |
对照项：一次性产品销售（仅作基线，不作主目标）。

## 3. 四站试点矩阵（订阅为主）
| 站点 | 主测场景 | 重点能力 |
|---|---|---|
| WDEO | 询盘→咨询预约→服务订阅 | A1 A4 A7 |
| JJ FIT | 会员/训练订阅、续费、流失挽留 | A1 A2 A3 A6 |
| Neumann Solo Founder | 咨询订阅、SF LAB 长周期培育 | A3 A4 A5 A7 |
| Wish code | 开发者/工具订阅、试用→付费 | A1 A2 A6 A8 |

## 4. 官网发布短稿

**中文｜服务订阅型 AI 销售顾问：从对话到订阅**  
Neumann 参照 Zobi 的销售模型自建 AI 销售顾问，面向服务订阅而非电商。它在对话中引导预约与订阅；被拒后自我复盘、调整策略；按瑞士、欧盟、中国、美国等地区切换销售模式；把每位用户的消费喜好总结后写回系统留档；并能发现并更正自身错误。我们将在 WDEO、JJ FIT、Neumann Solo Founder、Wish code 四站开展实测，结果将随测试持续更新。全程遵守 GDPR、瑞士 nFADP 与 EU AI Act：明确告知您在与 AI 对话，不作误导性销售。外部案例数据为公司自报，未经我们审计。  
**行动：** 预约 30 分钟咨询｜浏览 SF LAB

**English | A subscription AI sales advisor: from conversation to subscription**  
Neumann is building its own AI sales advisor on Zobi's sales model, designed for service subscriptions, not e-commerce. It guides users to booking and subscribing; after a refusal it reviews its own strategy and adapts; it switches sales mode by region (Switzerland, EU, China, US); it summarises each user's preferences and writes them back to our system with a log; and it detects and corrects its own mistakes. Pilots will run on WDEO, JJ FIT, Neumann Solo Founder and Wish code; results will be updated continuously as tests proceed. We follow GDPR, Swiss nFADP and the EU AI Act: users are always told they are talking to an AI, and no misleading sales claims are made. Third-party figures are company-reported and not audited by Neumann.  
**CTA:** Book a 30-minute consult | Explore SF LAB

## 5. SF-006 卡片短标
- 中：**SF-006 · AI 销售顾问（服务订阅）** — 引导订阅 · 复盘 · 分地区 · 偏好回传 · 自纠｜即将实测，结果滚动更新
- EN: **SF-006 · AI Sales Advisor (Subscriptions)** — guide · self-review · regional · preference write-back · self-correct | Pilots starting soon; results updated continuously

## 6. 合规红线
- GDPR + 瑞士 nFADP：偏好回传须有合法依据/同意、最小化、可删除、可导出；跨境（CN/US）单独评估。
- EU AI Act：首句告知是 AI；可随时转人工。
- 禁止误导销售：不虚构稀缺/价格/效果；不承诺未验证结果。
- 第三方数据标「公司自报、未审计」；默认不在公开稿使用 $40M ARR。

## 7. 存档与更新约定
- 命名：ASCII + 文档名 + YYYYMMDD；文案改版生成新日期文件并替换旧版。
- 实测结果：在本文件追加 `## 实测更新 YYYY-MM-DD` 小节（或新日期版替换），列站点、能力、指标、结论。
- 镜像：QCF88888/Jessica-robot-army 与 j19-plusone/Jessica-robot-army `ops-log/` 同步。


## 部署记录 2026-11-05（苏黎世）
- 页面：`public/sf-lab/ai-sales/index.html`（中英短稿 + A1–A8 + 合规 + CTA `/consultation/` `/sf-lab/`）
- SF LAB 索引：新增 SF-006 卡片，链到 `/sf-lab/ai-sales/`
- Git：`a543dba` → origin/main
- Firebase：认证失败，线上未更新；重试条件 = `firebase login`（j19.plusone@gmail.com）或合法 CI token
