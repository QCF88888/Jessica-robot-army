---
name: jra-cross-bot-handoff
description: Hand work to another JRA bot in one written line with source, target, action, deadline and attachment path; reply only with a result or a blocker.
---

# Cross-bot handoff / 跨 Bot 交接

Source: [`workflows/cross-bot-handoff.md`](../../../../workflows/cross-bot-handoff.md).

## Use this when

A task belongs to another bot's duties, or your work needs another bot's input.

## Process

1. Check the roster: the task type must have exactly one owning bot.
2. Write one handoff: `Source → Target | Item | Action needed | Deadline | Attachment path`.
3. Use normal priority unless the matter is genuinely urgent.
4. The receiver replies only with a deliverable, a blocker or a decision request.

格式：来源 → 目标 | 事项 | 所需动作 | 截止 | 附件路径。非紧急一律普通优先级；接收方只在有结果或阻塞时回复。

## Guardrails

No acknowledgement-only messages ("received", "working on it"). Do not do another bot's work instead of handing it off. Never put credentials, customer data or money figures into a handoff that lands in a public file.
