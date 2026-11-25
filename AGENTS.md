# AGENTS.md · GPT/Codex ⇄ Grok (000 总指挥官) 协作约束

由 Jessica 于 2026-11-05 确认，双方必须遵守：

1. **以对方最后一次存档为准**：动手前先 `git pull --rebase`，在对方最后一次已提交的代码上叠加修改；不从旧 ZIP 或旧本地副本覆盖；禁止 force-push。
2. **只改自己负责的范围**：Grok 管 `/robot-army/` 与 Robot Army 开源仓库；Codex 管网站改版、MM（Neumann Solo Founder 网站机器人）与控制台（网站用户工作入口）。跨范围改动先在交接日志留言。
3. **发布后必须留言**：每次发布后按下方模板在交接日志追加一条，写明精确到分钟的瑞士时间与已确认发布的 Commit。
4. **命名**：000 = 总指挥官 / General Commander；MM 是网站机器人，不是 000。
5. **开源边界**：公开仓库只放岗位、职责、工作流与演示；密钥、账户凭证、客户资料、内部经营数据与具体项目工作不进入公开仓库。

## 交接模板（统一格式）

```
交接：GPT → Grok / Grok → GPT
时间：YYYY年MM月DD日 HH:mm（瑞士时间，CET/CEST）
项目／仓库：……
分支／Commit：……
基于对方版本：……
本次叠加更新：……
发布地址：……
验证结果：……
状态：已确认发布，可以基于此版本继续迭代。
待办及注意事项：……
```

交接日志：`HANDOFF_LOG.md`（最新在最上）。

## 补充规则（GPT 建议，2026年11月05日 23:40 由 Grok 写入）

6. **两个 Commit 分开记**：「最新存档 Commit」与「线上部署 Commit」分别填写；开发必须基于最新存档（含文档提交），不得退回旧版本。
7. **开工、收工都留言**：开工写任务、负责目录、基线 Commit；收工写修改、验证、待办。双方同时工作时各用任务分支（`codex/…` / `grok/…`），合并与部署前再查一次 main 是否更新。
8. **同一网站部署串行**：部署整个 public 目录会覆盖对方成果，部署前必须包含双方最新已合并代码；开工留言即视为占用部署，收工留言后释放。部署前先用 curl 对比线上与本地，发现线上比 main 旧或多出未存档内容时先停下核对（2026-11-05 曾出现线上 /robot-army/ 被旧版本覆盖回 V1.0）。
9. **主仓单向同步**：QCF88888/Jessica-robot-army 为主仓，j19-plusone/Jessica-robot-army 只作镜像，只从主仓推送，不在镜像上独立修改。
10. **状态如实填写**：已存档／待部署／已部署待验证／已确认发布，不固定套用成功状态；未独立复测的验证项注明「由某方自报」。
11. **公开日志不写内部信息**：开源仓库的交接日志同样公开，不写客户、合作、价格、账户等内部内容，需要时写在私有库。
12. **提交标识**：提交信息带 `[000]` 或 `[codex]` 与瑞士时间，方便追溯。

## 模板补充字段

```
最新存档 Commit：……
线上部署 Commit：……（如适用）
状态：已存档／待部署／已部署待验证／已确认发布（四选一）
```

## 公开仓库数据规则 / Public repo data rule（2026-11-25，Jessica 批准）

**中文**

1. 公开仓库可以保留会员定价，以及明确标为“演示 / 示例”的 CHF、EUR 金额。
2. 以下内容一律不得提交，包括示例配置、截图和日志：JRA 自用的 Stripe 付款链接、`plink_` 编号、非公开的收款主体信息、账户密码，以及真实经营金额。
3. 付款配置一律使用占位符（例如 `STRIPE_PAYMENT_LINK=<your-link>`），由克隆者自行填写；真实值只放私有库或密钥管理。
4. **旧本地副本处理**：历史改写后，旧副本优先采用“另建目录、重新克隆”的方式处理，这样可以保住尚未提交的本地工作；确需保留的改动，逐项检查后再应用到新副本。
5. 即使对 main 执行了 `reset --hard`，旧本地分支和标签仍可能存在，因此**不要从旧副本推送分支、标签，也不要执行 `push --mirror`**，以免把已清除的历史推回远端。

**English**

1. The public repo may keep membership pricing and CHF/EUR amounts that are clearly labelled as demo/example.
2. Never commit — including in example configs, screenshots and logs — JRA's own Stripe payment links, `plink_` ids, non-public payee/entity information, account passwords or real business amounts.
3. Payment configuration uses placeholders (e.g. `STRIPE_PAYMENT_LINK=<your-link>`) that cloners fill in themselves; real values live only in the private repo or a secret store.
4. **Old local copies:** after a history rewrite, prefer cloning fresh into a separate directory; this preserves uncommitted local work. Review any change that must be kept item by item, then apply it to the new copy.
5. Even after `reset --hard` on main, old local branches and tags may remain, so **never push branches or tags, or run `push --mirror`, from an old copy**; doing so would reintroduce the purged history.
