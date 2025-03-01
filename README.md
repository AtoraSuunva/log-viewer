# log-viewer

To view Discord logs. https://log.atora.dev

## Running it yourself

This is designed to run on CloudFlare workers. Since Discord blocks CF from their CDN, you'll need some proxy to fetch attachments. Since CF workers don't support proper HTTP proxies, you'll need some service that takes `:channelId/:attachmentId/:fileName` and returns the response status, content-type, and body from Discord's CDN.

```ini
BOT_TOKEN= # Discord Bot Token
ATTACHMENTS_PROXY=https://example.com/attachments/ # :channelId/:attachmentId/:fileName
ATTACHMENTS_TOKEN= # For the proxy used above, sent as `Authorization: Bearer {ATTACHMENT_TOKEN}`
```
