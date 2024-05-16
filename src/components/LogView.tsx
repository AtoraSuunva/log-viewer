import { MessageGroup } from '@widgetbot/message-renderer'
import type { APIMessage } from 'discord-api-types/v10'
import { useParams } from 'react-router-dom'
import { useMessages } from '../hooks/useMessages'

export default function LogView() {
  const { channelId, attachmentId, fileName } = useParams()

  if (!channelId || !attachmentId || !fileName) {
    return <div>Invalid URL</div>
  }

  const { messages, error, isLoading } = useMessages(
    channelId,
    attachmentId,
    fileName,
  )

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  if (!messages) return <div>No messages</div>

  const messageGroups = []
  let currentMessages: APIMessage[] = []
  let lastUser = null

  for (const message of messages) {
    if (lastUser !== message.author.id) {
      if (currentMessages.length > 0) {
        messageGroups.push(
          <MessageGroup
            key={currentMessages[0].id}
            thread={false}
            messages={currentMessages}
          />,
        )
      }
      currentMessages = [message]
      lastUser = message.author.id
    } else {
      currentMessages.push(message)
    }
  }

  if (currentMessages.length > 0) {
    messageGroups.push(
      <MessageGroup
        key={currentMessages[0].id}
        thread={false}
        messages={currentMessages}
      />,
    )
  }

  return <div className="log-container">{messageGroups}</div>
}
