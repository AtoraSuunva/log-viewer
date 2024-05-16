import { APIMessage } from 'discord-api-types/v10'
import useSWR, { Fetcher } from 'swr'

const fetcher: Fetcher<APIMessage[], string> = (url) =>
  fetch(url).then((res) => res.json())

export function useMessages(
  channelId: string,
  attachmentId: string,
  fileName: string,
) {
  const { data, error, isLoading } = useSWR<APIMessage[], Error>(
    `/api/log/${channelId}/${attachmentId}/${fileName}`,
    fetcher,
  )

  return {
    messages: data,
    error,
    isLoading,
  }
}
