import type { Fetcher, SWRResponse } from 'swr'
import useSWRImmutable from 'swr/immutable'
import type { AttachmentBody } from '../types/AttachmentBody'

class FetchError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message)
  }
}

const fetcher: Fetcher<AttachmentBody, string> = async (url) => {
  const res = await fetch(url)

  if (!res.ok) {
    const error = new FetchError(res.status, 'Failed to fetch message archive.')

    try {
      const resp = (await res.json()) as { error: string }

      if ('error' in resp) {
        error.message = resp.error
      } else {
        error.message = 'Failed to get error.'
      }
    } catch (e) {
      error.message = e instanceof Error ? e.message : 'Failed to parse error.'
    }

    throw error
  }

  return res.json()
}

const DEV_SUFFIX =
  process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : ''

export function useAttachment(
  channelId: string,
  attachmentId: string,
  fileName: string,
): SWRResponse<AttachmentBody, FetchError> {
  return useSWRImmutable<AttachmentBody, FetchError>(
    `${DEV_SUFFIX}/api/log/${channelId}/${attachmentId}/${fileName}`,
    fetcher,
    {
      onErrorRetry: (error, _, __, revalidate, { retryCount }) => {
        if (error instanceof FetchError) {
          switch (error.status) {
            case 404:
            case 403:
              return
          }
        }

        if (retryCount >= 3) {
          return
        }

        setTimeout(
          () => void revalidate({ retryCount }),
          3 ** retryCount * 1000,
        )
      },
    },
  )
}
