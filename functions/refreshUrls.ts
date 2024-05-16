const REFRESH_URLS =
  'https://canary.discord.com/api/v10/attachments/refresh-urls'

interface RefreshUrlsPayload {
  attachment_urls: string[]
}

interface RefreshUrlsResponse {
  refreshed_urls: {
    original: string
    refreshed: string
  }[]
}

type RefreshResponse<T extends string[]> = {
  [K in keyof T]: {
    original: T[K]
    refreshed: string
  }
}

export async function refreshUrls<const T extends string[]>(
  urls: T,
  token: string,
): Promise<RefreshResponse<T>> {
  const response = await fetch(REFRESH_URLS, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `BOT ${token}`,
    },
    body: JSON.stringify({
      attachment_urls: urls,
    } as RefreshUrlsPayload),
  })

  if (!response.ok) {
    console.error('Failed to refresh urls', response)
    throw new Error('Failed to refresh urls')
  }

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
  const data = (await response.json()) as RefreshUrlsResponse

  return data.refreshed_urls as RefreshResponse<T>
}
