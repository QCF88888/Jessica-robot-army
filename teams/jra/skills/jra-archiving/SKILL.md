---
name: jra-archiving
description: File every JRA deliverable by project/type/date with English filenames ending YYYYMMDD, move old versions to _superseded, and log a backlog when the device is offline.
---

# Archiving / 归档

Source: [`workflows/archiving.md`](../../../../workflows/archiving.md). Owner: 017 (Device & Archive Officer).

## Process

1. Receive deliverables from every bot.
2. Store by `project / type / date`.
3. Filenames in English plus `YYYYMMDD`; an update changes the date.
4. Move the previous version into `_superseded`.
5. If the archive device is offline, record a backlog and file it once back online.
6. New top-level archive folders need the owner's approval.

各 Bot 交付文件 → 归档 Bot（017）按"项目/类型/日期"存放；文件名英文 + YYYYMMDD；旧版移入 `_superseded`；设备离线时记录积压，上线后补存。

## Guardrails

Private archives stay private; the public repository only holds the rules, never archived content.
