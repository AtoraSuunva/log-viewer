import { APIMessage } from 'discord-api-types/v10'
import { Fetcher } from 'swr'
import useSWRImmutable from 'swr/immutable'

class FetchError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message)
  }
}

const fetcher: Fetcher<APIMessage[], string> = async (url) => {
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

export function useMessages(
  channelId: string,
  attachmentId: string,
  fileName: string,
) {
  const { data, error, isLoading } = useSWRImmutable<APIMessage[], FetchError>(
    `http://localhost:8080/api/log/${channelId}/${attachmentId}/${fileName}`,
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

  return {
    messages: data,
    error,
    isLoading,
  }
}
