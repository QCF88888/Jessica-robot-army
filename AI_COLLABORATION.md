# AI collaboration / 000 与 ChatGPT/Codex 同步协议

Prepared: 2026-11-05 21:41:41 CET · Europe/Zurich · [000] · proposal; ownership assignments below require Jessica’s confirmation.

## Source of truth
Canonical remote: https://github.com/QCF88888/Jessica-robot-army, branch `main`. `origin` must point there. j19-plusone/Jessica-robot-army is a downstream mirror only. Do not independently edit both copies or enable reverse mirroring. Do not share credentials, chat sessions or private client records between agents.

## Before and during work
1. Check `git status` and remote URLs. Save unrelated work safely; do not discard it or overwrite someone else’s changes. If the tree is dirty or work overlaps, stop and coordinate scope.
2. Before starting work, run `git pull --rebase origin main` on a clean local main; create a focused work branch. Before publication, refresh canonical main and reconcile against the latest approved changes. Rebase only local unpublished work; do not rewrite a branch another agent uses. If a published/shared branch needs updating, use an agreed non-destructive merge or stop for coordination.
3. Inspect recent commits and agree path ownership. Use minimal scoped changes, never replace an entire site or document blindly. Conflicts or uncertain ownership mean pause and report, not forced resolution.
4. **Never force-push**, delete remote refs, reset shared work, bypass hooks or rewrite published history. Sensitive-history cleanup is a separate owner-approved operation with mirror/fork coordination, not ordinary agent work.
5. Each change carries a precise **Europe/Zurich** timestamp (including UTC offset / CET or CEST as applicable) and agent tag in its commit message, e.g. `[000] docs: public workflow — 2026-11-05 21:40 CET (Europe/Zurich)` or `[codex] fix: … — …`. Modification and actual deployment times are different fields; never claim deployment from a commit alone.
6. Open a focused PR when authorised; review tests, secret scan, links and document/media content. Add a CHANGELOG entry per release. Synchronise the j19 mirror from reviewed canonical commits only; record canonical SHA, mirror SHA, agent and Zurich time. Avoid automatic deletion or forced synchronization.

## Scope ownership / 分工（待确认）
| Agent | Proposed scope | Status |
|---|---|---|
| 000 Jessica Bot | Bot roster, `roles/`, `workflows/`, public `ops-log/`, `deployment/` directory; private live operating records stay outside public Git | 待 Jessica 确认 |
| ChatGPT/Codex | Code and website areas as Jessica assigns; exact repositories/directories to be recorded before work | 待 Jessica 确认 |
| Shared | README, security, governance, CHANGELOG and release notes: agree one writer and reviewer before edits | 待确认 |

Website edits are in the separate website repository. Check Codex’s latest work and the assigned paths first; publication of this proposal grants no authority to deploy or alter website areas.

## Sensitive-data rule / 敏感数据
Only code, role definitions, workflow rules and demos are public. Never add keys, credentials, personal/customer data, internal financial/operating data or unapproved partner agreements—including attachments and commit metadata. Real deployments, budgets, performance scores and private business decisions belong in an access-controlled private repository. Use vault references and synthetic examples. Potential exposure stops publication and triggers private reporting under SECURITY.md.

## Handoff record / 交接
Record: task and path scope, base SHA, branch, agent tag, Zurich timestamp, acceptance/tests, files changed, blockers, release note and actual publication evidence if any. Local drafts say “not published”; demos say “simulation”. This protocol is a document, not proof of an automated sync service or a message sent to another agent.

## Single public promotion entry / 唯一宣传入口

Added 2026-11-05 21:45:41 CET · Europe/Zurich · [000]. Jessica’s Robot Army is promoted independently within Neumann Solo Founder Lab. **All Stars, contribution/Issue links and promotion calls point to QCF88888/Jessica-robot-army only.** j19-plusone is a development-sync mirror, not a second public campaign. The j19-plusone mirror carries the same commits as QCF88888 main. Do not edit code independently on both mirrors. Bot 009 approves any LinkedIn URL/content; placeholders are not published posts.
