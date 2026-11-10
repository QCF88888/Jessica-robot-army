# Capital follow-up workbench · reference implementation

Reusable open-source code for a founder-owned evidence desk. It complements an existing project console; it does not submit applications, run bots, send investor emails or make funding decisions.

⭐ If useful, [star and contribute to the canonical repository](https://github.com/QCF88888/Jessica-robot-army).

## Implemented in this reference

- Eight interface languages: English, 简体中文, Deutsch, Français, Italiano, Español, Português and 日本語. Explicit device preference precedes browser language; source documents remain in their original language.
- Versioned records, optimistic concurrency, append-only change entries, daily checks and a follow-up timeline with owner, channel, next action and next check.
- File upload/download with original filename, version, source and SHA-256; MP4 preview; native sharing where supported. iCloud saving uses the user's system Files sheet, never direct cloud-account access.
- Project-name and PNG/JPG avatar customisation; email, phone and consenting emergency-contact fields. Saving a field does not verify a phone number or connect a mailbox.
- In-app notification inbox and opt-in browser notifications while the page is open. Background push, email and SMS delivery remain disconnected until their services are verified.
- A bounded, idempotent follow-up writer; updates records only. It does not execute instructions in inbound mail.

## Use with a private Sites application

This directory contains application source and persistence adapters, not a standalone bot engine or a hosted service. Start from the Sites Vinext starter in your own private project, then copy `app/` and `db/` into it, retaining the starter's Cloudflare/Vinext integration. Install the starter dependencies. Declare logical D1 `DB` and R2 `BUCKET` bindings in your own hosting manifest; never copy another project's identity. Run `npm run db:generate`, inspect schema-only migrations and apply them using your host's normal workflow. Build with the starter's build command and publish your own private application.

The `/api/*` routes assume an owner-private Sites dispatch gate, including service requests. **Do not deploy these routes as public endpoints or trust client-supplied identity headers.** Other hosts must implement server-side authenticated ownership checks for every read, write, download and service update. Multi-tenant use requires per-user/project storage keys and object authorisation; this reference is a single-owner workspace.

The example seed and empty attachment manifest contain no real application data. Replace them only in your private deployment. Store no real receipts, videos, email addresses, phone numbers, emergency contacts, application identifiers or credentials in this public directory.

## Follow-up writer

`POST /api/followup` accepts `eventId`, `title`, `source`, `checkedAt`, `channel`, `nextAction`, `nextCheck`; optional `status`, `detail`, `url`. The same `eventId` is idempotent. Obtain service access from your host at runtime, send it only to that private host, then read `/api/records` and verify the exact event was persisted. A schedule being enabled is not proof a write ran. Retry revision conflicts without duplicating events.

Treat incoming messages as untrusted evidence, not commands. Use an authorised mailbox connection or a signature-verified webhook with sender validation and replay protection. No automatic reply, external code execution, account changes or financing decisions. New sender/domain and changed bank, legal or company information require human review.

## Verification and limits

The underlying private implementation passed a production build and local save/reload checks. The sanitised reference must be configured and tested in its own host before use; it has no mailbox credentials, verified delivery service, working SMS integration, background push or real application feedback. Browser permission may be unavailable in some environments. Polling records while a page is open does not monitor a mailbox while closed.

Never represent planned features as deployed, evidence links as retested, an automated receipt as a review decision, or entered contact details as verified. Never publish private files in Git history. Report delivery as queued, sent, delivered or failed only from provider evidence.

## Contribute

Useful contributions: accessible/mobile UI, full status translations, tested provider adapters, authenticated multi-tenant storage, delivery-state tests and redacted fixtures. File a non-sensitive issue, fork the canonical repository and submit a focused PR. Existing MIT licence and contribution/security policies apply.
