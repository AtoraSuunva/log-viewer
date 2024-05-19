import { MessageGroup } from '@widgetbot/message-renderer'
import { MessageType, type APIMessage } from 'discord-api-types/v10'
import { useParams } from 'react-router-dom'
import { useAttachment } from '../hooks/useAttachment'
import { MetaInfo } from './MetaInfo'
import WrapperRendererProvider from './WrapperRendererProvider'

export default function LogView() {
  const { channelId, attachmentId, fileName } = useParams()

  if (!channelId || !attachmentId || !fileName) {
    return <div>Invalid URL</div>
  }

  const { data, error, isLoading } = useAttachment(
    channelId,
    attachmentId,
    fileName,
  )

  if (isLoading) return <div>Loading...</div>
  if (error)
    return (
      <div>
        Error: [{error.status}] {error.message}
      </div>
    )
  if (!data || data.data.messages.length === 0) return <div>No messages</div>

  const messageGroups = []
  let currentMessages: APIMessage[] = []
  let lastUser = null

  const { messages } = data.data

  for (const message of messages) {
    if (lastUser !== message.author.id || message.type === MessageType.Reply) {
      if (currentMessages.length > 0) {
        messageGroups.push(
          <MessageGroup
            key={currentMessages[0]?.id}
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
        key={currentMessages[0]?.id}
        thread={false}
        messages={currentMessages}
      />,
    )
  }

  return (
    <>
      <MetaInfo context={data} />
      <div className="log-container">
        <WrapperRendererProvider context={data}>
          {messageGroups}
        </WrapperRendererProvider>
      </div>
    </>
  )
}
