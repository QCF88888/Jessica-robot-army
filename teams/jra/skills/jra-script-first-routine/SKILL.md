---
name: jra-script-first-routine
description: Design a routine so a cheap script checks for new events first and the model runs only when something changed; use for news scans, market briefings, monitors and audits.
---

# Script-first routine / 先脚本、后模型

Implements the quota rule "scan with scripts, not with a model reading item by item; no output when nothing changed" ([`governance/quota-rules.md`](../../../../governance/quota-rules.md)).

## Use this when

Creating or reviewing any recurring job that watches sources (feeds, pages, inboxes, repositories, calendars, prices).

## Process

1. Define the source list and a fingerprint per item (URL + title hash, commit SHA, message id, ETag/Last-Modified, value + threshold).
2. A plain script fetches the sources and compares fingerprints with the saved state file.
3. No new or changed items: exit silently, no model call, no message.
4. New items: pass only the delta (not the whole source) to the model for the briefing or decision.
5. Save the new state after a successful run; on errors, keep the old state and report once.
6. Weekdays only, unless the owner asks otherwise.

## Guardrails

The state file holds fingerprints only, never credentials or private content. Thresholds and source lists that reveal internal business data stay in private configuration.
