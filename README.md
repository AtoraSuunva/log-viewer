# log-viewer

To view Discord logs. <https://log.atora.dev>

## Tooling

This project uses Vite+ (`vp`) as the main toolchain command.

Common commands:

```bash
vp install      # Install dependencies
vp dev          # Start dev server
vp check        # Format + lint + type-check
vp test         # Run tests
vp run build    # Build worker + client
```

Notes:

- `vp build` only builds the Vite client bundle.
- `vp run build` is the full project build for this repo (Cloudflare worker functions + client).

## Running it yourself

This is designed to run on CloudFlare workers. Since Discord blocks CF from their CDN, you'll need some proxy to fetch attachments. Since CF workers don't support proper HTTP proxies, you'll need some service that takes `:channelId/:attachmentId/:fileName` and returns the response status, content-type, and body from Discord's CDN.

```ini
BOT_TOKEN= # Discord Bot Token
ATTACHMENTS_PROXY=https://example.com/attachments/ # :channelId/:attachmentId/:fileName
ATTACHMENTS_TOKEN= # For the proxy used above, sent as `Authorization: Bearer {ATTACHMENT_TOKEN}`
```
