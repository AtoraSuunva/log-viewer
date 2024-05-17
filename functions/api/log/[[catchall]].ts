import { HttpError } from '../../HttpError'
import { SizedMap } from '../../SizedMap'

interface Env {
  BOT_TOKEN: string
  ATTACHMENTS_PROXY: string
  ATTACHMENTS_TOKEN: string
}

const MISSING_PATH_PARAM = JSON.stringify({
  error: 'channelId, attachmentId, and fileName required',
})

const headers: HeadersInit = {
  'content-type': 'application/json',
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const [channelId, attachmentId, fileName] = context.params
    .catchall as string[]

  console.log(channelId, attachmentId, fileName)

  if (!channelId || !attachmentId || !fileName) {
    return new Response(MISSING_PATH_PARAM, {
      status: 400,
      headers,
    })
  }

  try {
    const messages = await fetchMessages(
      { channelId, attachmentId, fileName },
      context.env.ATTACHMENTS_PROXY,
      context.env.ATTACHMENTS_TOKEN,
    )

    return new Response(messages, {
      headers,
    })
  } catch (err) {
    const error = err instanceof Error ? err.message : String(err)
    const status = err instanceof HttpError ? err.status : 500

    return new Response(JSON.stringify({ error }), {
      status,
      headers,
    })
  }
}

interface AttachmentParams {
  channelId: string
  attachmentId: string
  fileName: string
}

function toAttachmentUrl(
  proxy: string,
  { channelId, attachmentId, fileName }: AttachmentParams,
) {
  return `${proxy}${channelId}/${attachmentId}/${fileName}`
}

const discordCache = new SizedMap<string, string>(100)

async function fetchMessages(
  attachmentParams: AttachmentParams,
  proxy: string,
  token: string,
): Promise<string> {
  const url = toAttachmentUrl(proxy, attachmentParams)

  if (discordCache.has(url)) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return discordCache.get(url)!
  }

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    switch (response.status) {
      case 404:
        throw new HttpError(response.status, 'Attachment not found')
      case 403:
        throw new HttpError(response.status, 'Forbidden to fetch attachment')
      case 429:
        throw new HttpError(response.status, 'Rate limited')
      default:
        throw new HttpError(response.status, 'Failed to fetch attachment')
    }
  }

  const log = await response.text()
  discordCache.set(url, log)
  return log
}
