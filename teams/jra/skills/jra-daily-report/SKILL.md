---
name: jra-daily-report
description: Compile JRA's weekday 10:00 daily report as one table sorted by bot number with done, open/blocked and overreach/quota-risk columns and at most three decisions; skip when nothing changed.
---

# Daily report / 每日报告

Source: [`workflows/daily-report.md`](../../../../workflows/daily-report.md).

## Use this when

It is a weekday at 10:00 (Europe/Zurich), or the owner asks for a status report.

## Process

1. Collect substantive changes since the last report from each bot's deliverables and handoffs.
2. If no bot has a substantive change, blocker or risk, send nothing.
3. Build one table sorted by number: `No. | Name | Done | Open or blocked | Overreach or quota risk`.
4. Add at most 3 decision items for the owner.
5. Save as `Bot_Daily_Work_Report_YYYYMMDD.md` and hand it to the archiving bot (017).

工作日 10:00，一张表按编号排序；最多 3 条决策项；无实质内容不发；交归档 Bot。

## Guardrails

Weekends only on explicit request (mark "on request"). No usage shares, money figures or private names in any public copy.
