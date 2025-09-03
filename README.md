# log-viewer

To view Discord logs. https://log.atora.dev

## Running it yourself

This is designed to run on CloudFlare workers. Since Discord blocks CF from their CDN, you'll need some proxy to fetch attachments. Since CF workers don't support proper HTTP proxies, you'll need some service that takes `:channelId/:attachmentId/:fileName` and returns the response status, content-type, and body from Discord's CDN.

```ini
BOT_TOKEN= # Discord Bot Token
ATTACHMENTS_PROXY=https://example.com/attachments/ # :channelId/:attachmentId/:fileName
ATTACHMENTS_TOKEN= # For the proxy used above, sent as `Authorization: Bearer {ATTACHMENT_TOKEN}`
```


## Migration: Cloudflare Pages -> Workers

Project Analysis

- Type: Pages project with Pages Functions (TypeScript files in `functions/`). Build produces a worker at `./dist/worker/index.js` and static assets under `./dist/client`.

Migration Steps performed

- Added `wrangler.jsonc` (Workers config) with `main` pointing to `./dist/worker/index.js` and an `assets` binding for `./dist/client`.
- Removed legacy `wrangler.toml`.
- Ensured Pages Functions are built with `wrangler pages functions build --outdir=./dist/worker/` by keeping `build:worker` script and calling it during `build`.
- Added `.assetsignore` to prevent worker artifacts from being published as static assets.
- Updated `package.json` to call the local `wrangler pages functions build` script directly.

Validation

- Ran `pnpm run lint` (biome + tsc) — no issues.
- Ran `pnpm run build` — produced `./dist/worker/index.js` and `./dist/client` assets.
- Ran `pnpm dlx wrangler deploy --dry-run` — dry-run succeeded and detected the `ASSETS` binding.

How to deploy

1. Install dev dependencies: `pnpm install`
2. Build: `pnpm run build`
3. Dry-run: `pnpm dlx wrangler deploy --dry-run`
4. Deploy: `pnpm dlx wrangler deploy`

Notes

- `wrangler` is used via the project's devDependency (run with `pnpm dlx wrangler ...` if not installed globally).
- If you change the build output directory, update `wrangler.jsonc`'s `main` and `assets.directory` accordingly.
