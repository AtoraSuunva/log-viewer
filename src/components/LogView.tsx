import { MessageGroup } from '@widgetbot/message-renderer'
import { MessageFlags, MessageType, type APIMessage } from 'discord-api-types/v10'
import { useParams } from 'react-router-dom'
import { useAttachment } from '../hooks/useAttachment'
import { MetaInfo } from './MetaInfo'
import WrapperRendererProvider from './WrapperRendererProvider'
import { AttachmentBody } from '../types/AttachmentBody'
import { ChatMessage } from '@widgetbot/message-renderer/dist/types'

const PLACEHOLDER_CONTEXT: AttachmentBody = {
  version: 1,
  data: {
    messages: [],
    guild: {
      id: '•••',
      name: '•••',
      icon: null,
    },
    channel: {
      id: '•••',
      name: '•••',
      type: 1,
    }
  }
}

const BASE_MESSAGE: ChatMessage = {
  id: '',
  channel_id: '',
  author: {
    id: '',
    username: '•••',
    discriminator: '',
    global_name: '•••',
    avatar: null,
    bot: true,
    system: true,
  },
  content: '...',
  timestamp: `${new Date().toISOString()}`,
  edited_timestamp: null,
  tts: false,
  mentions: [],
  mention_everyone: false,
  mention_roles: [],
  attachments: [],
  embeds: [],
  pinned: false,
  type: MessageType.Default,
  flags: MessageFlags.Ephemeral,
}

const LOADING_MESSAGE: ChatMessage = {
  ...BASE_MESSAGE,
  author: {
    ...BASE_MESSAGE.author,
    username: 'Loading...',
    global_name: 'Loading...'
  },
  content: 'Loading...',
}

const ERROR_MESSAGE: ChatMessage = {
  ...BASE_MESSAGE,
  author: {
    ...BASE_MESSAGE.author,
    username: 'Error!',
    global_name: 'Error!'
  },
  failedToSend: true,
  content: 'Error!',
}

const EMPTY_LOG_MESSAGE: ChatMessage = {
  ...ERROR_MESSAGE,
  content: 'No messages.'
}

const INVALID_URL_MESSAGE: ChatMessage = {
  ...ERROR_MESSAGE,
  content: 'Invalid URL.'
}

export default function LogView() {
  const { channelId, attachmentId, fileName } = useParams()

  if (!channelId || !attachmentId || !fileName) {
    return (
      <LogWrapper context={PLACEHOLDER_CONTEXT}>
        <MessageGroup key='invalid' thread={false} messages={[INVALID_URL_MESSAGE]}/>
      </LogWrapper>
    )
  }

  const { data, error, isLoading } = useAttachment(
    channelId,
    attachmentId,
    fileName,
  )

  if (isLoading) {
    return (
      <LogWrapper context={PLACEHOLDER_CONTEXT}>
        <MessageGroup key='loading' thread={false} messages={[LOADING_MESSAGE]}/>
      </LogWrapper>
    )
  }

  if (error) {
    const appended = error.status === 404 ? "\nThis log might've been deleted or you entered your URL wrong." : error.status >= 500 ? '\nA server error occurred, try again later.' : ''

    const errorMessage: ChatMessage = {
      ...ERROR_MESSAGE,
      content: `# ${error.status}\n\`\`\`\n${error.message}\n\`\`\`${appended}`,
    }

    return (
      <LogWrapper context={PLACEHOLDER_CONTEXT}>
        <MessageGroup key='error' thread={false} messages={[errorMessage]}/>
      </LogWrapper>
    )
  }

  if (!data || data.data.messages.length === 0) {
    return (
      <LogWrapper context={PLACEHOLDER_CONTEXT}>
        <MessageGroup key='empty' thread={false} messages={[EMPTY_LOG_MESSAGE]}/>
      </LogWrapper>
    )
  }

  const messageGroups = []
  let currentMessages: APIMessage[] = []
  let lastUser = null

  const { messages } = data.data

  for (const message of messages) {
    if (
      lastUser !== message.author.id ||
      message.type === MessageType.Reply ||
      message.interaction_metadata
    ) {
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

  return <LogWrapper context={data}>{messageGroups}</LogWrapper>
}

interface LogWrapperProps {
  context: AttachmentBody
  children: React.ReactNode
}

function LogWrapper({context, children}: LogWrapperProps) {
  return (
    <>
      <MetaInfo context={context} />
      <div className="log-container">
        <WrapperRendererProvider context={context}>
          {children}
        </WrapperRendererProvider>
      </div>
    </>
  )
}
