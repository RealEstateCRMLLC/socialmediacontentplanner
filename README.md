# socialmediacontentplanner — ContentCommand AI (Unified Content Studio)

AI-powered social media content planner and publishing platform: content creation (social posts, short-form video, podcasts), campaign management, multi-platform publishing, analytics, and a mobile app — with universal business-type support for Real Estate, E-Commerce, Restaurants, and General Business. Built as part of the RealEstateCRM project family for Excel Legacy Realty Group.

## Status

**Active development.** Version 6.1.0 per `CHANGELOG.md` (2026-09-22 merge release) — note `VERSION.md` still says v6.0.2 and root `package.json` says 1.0.0; both are stale. Last commit 2026-11-12 (TypeScript strict-mode fixes — 25 errors cleared, API typecheck clean). Recent work: cross-service workspace mapping and dashboard integration with the main CRM (Oct 22), a hardcoded demo login disabled in production (Oct 22, security fix), and removal of all mock data (Oct 21).

This repo merges two projects: **ContentCommand AI** (socialmediacontentplanner) and **Legacy One Universal Content Platform** (realestateprototype). See `MERGE_GUIDE.md` for the integration points.

## What it does

- **Core platform** — Auth, multi-tenant workspaces, universal business-type config
- **AI studios** — Social posts, short-form videos, podcasts, AI persona / brand voice (extracted from past successful posts)
- **Growth** — Landing page builder, brand kits, Canva integration (deep links in the review flow)
- **Management** — Campaigns & calendar (drag-to-select multi-date), draft review (AI drafts intercepted and edited before scheduling), notifications
- **Publishing** — Multi-platform OAuth (Twitter/X, LinkedIn, Meta, YouTube, TikTok), PKCE
- **Analytics** — Engagement metrics, finance & reports, ad spend tracking
- **Mobile** — React Native app with native post previews
- **Admin** — Stripe billing, rate limiting, RBAC

## Structure

Turborepo monorepo (`turbo.json`, npm workspaces):

| Path | Purpose |
|---|---|
| `apps/web` | Next.js web app |
| `apps/mobile` | React Native mobile app |
| `packages/api` | API package |
| `packages/ai` | AI generation |
| `packages/social` | Social platform integrations |
| `packages/analytics` | Analytics |
| `packages/billing` | Stripe billing |
| `packages/jobs` | BullMQ background workers (publishing) |
| `packages/database` | Prisma / database |
| `packages/config`, `packages/shared` | Shared config and code |

## What's working / what's not

- The platform modules (auth, workspaces, AI studios, campaigns, calendar, publishing, analytics, mobile) are implemented across the monorepo, per the v6.1.0 merge changelog and the Oct–Nov 2026 commits. The Oct 21 mock-data removal means the app now uses real providers, persistence, and auth instead of fabricated data.
- No production deployment is documented in this repo — `DEPLOY.md` exists, but there is no live URL, uptime, or user evidence in the repo itself. The app is built by the main RealEstateCRM repo's CI (contentplanner job), which was green as of Nov 12, 2026 (RealEstateCRM v0.63.6). The web app is mounted under `/contentplanner` in the main CRM's dashboard.
- Housekeeping issues: the repo root is cluttered — a `hypernexus.db` SQLite database (~532 KB) is committed and should not be; five `build-final*.txt` build logs, `fix-strict-build-*.js` scripts, `git_status.txt`, `log.txt`, an empty `eslint.config.mjs`, and an empty `package.json.tmp` are all tracked and should be cleaned up. Version numbers disagree across files (`CHANGELOG.md` v6.1.0, `VERSION.md` v6.0.2, `package.json` 1.0.0).
- Live-service behavior (real publishing, real OAuth, real billing) depends on API keys and OAuth apps configured via `.env` — no evidence in the repo that the full chain has run end-to-end against live platforms.

## Relationship to RealEstateCRM

This is a satellite service of [RealEstateCRM](https://github.com/RealEstateCRMLLC/RealEstateCRM) — the social media content studio that complements the main CRM. It is a separate service, not part of the main CRM codebase. (Note: the Legacy One code merged here came from the `realestateprototype` repo, which still exists separately — see that repo's README.)

## Running it

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env` and fill in API keys and OAuth credentials. See `DEPLOY.md` for deployment; `docs/user-manual.md` for the end-user guide.

## Documentation

| File | Purpose |
|---|---|
| `MERGE_GUIDE.md` | Integration points between the merged projects |
| `VISION.md` | Product vision |
| `ROADMAP.md` | Development phases |
| `CHANGELOG.md` | Version history |
| `docs/user-manual.md` | End-user guide |
| `docs/compliance.md` | Platform compliance guidelines |
| `docs/security.md` | Security safeguards |

## Links

- Main CRM: https://github.com/RealEstateCRMLLC/RealEstateCRM
- Org: https://github.com/RealEstateCRMLLC
