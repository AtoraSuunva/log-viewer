import SvgAcrobat from '../assets/file-acrobat.svg'
import SvgAe from '../assets/file-ae.svg'
import SvgAi from '../assets/file-ai.svg'
import SvgFileArchive from '../assets/file-archive.svg'
import SvgFileAudio from '../assets/file-audio.svg'
import SvgCode from '../assets/file-code.svg'
import SvgDocument from '../assets/file-document.svg'
import SvgSketch from '../assets/file-sketch.svg'
import SvgSpreadsheet from '../assets/file-spreadsheet.svg'
import SvgFileUnknown from '../assets/file-unknown.svg'
import SvgWebCode from '../assets/file-webcode.svg'

import SvgIconAdd from '../assets/icon-add.svg'
import SvgIconAttachment from '../assets/icon-attachment.svg'
import SvgIconBoost from '../assets/icon-boost.svg'
import SvgIconCheckmark from '../assets/icon-checkmark.svg'
import SvgIconCommand from '../assets/icon-command.svg'
import SvgIconCross from '../assets/icon-cross.svg'
import SvgIconDanger from '../assets/icon-danger.svg'
import SvgIconDownload from '../assets/icon-download.svg'
import SvgIconFullscreen from '../assets/icon-fullscreen.svg'
import SvgIconId from '../assets/icon-id.svg'
import SvgIconLinkExternal from '../assets/icon-link-external.svg'
import SvgIconPause from '../assets/icon-pause.svg'
import SvgIconPencil from '../assets/icon-pencil.svg'
import SvgIconPin from '../assets/icon-pin.svg'
import SvgIconPlay from '../assets/icon-play.svg'
import SvgIconRemove from '../assets/icon-remove.svg'
import SvgIconStageChannel from '../assets/icon-stage-channel.svg'
import SvgIconSticker from '../assets/icon-sticker.svg'
import SvgIconTextChannel from '../assets/icon-text-channel.svg'
import SvgIconThreadCreated from '../assets/icon-thread-created.svg'
import SvgIconUnknownReply from '../assets/icon-unknown-reply.svg'
import SvgIconVoiceChannel from '../assets/icon-voice-channel.svg'
import SvgWarning from '../assets/icon-warning.svg'

import automodAvatarAnimated from '../assets/automod-avatar.gif'
import automodAvatarStill from '../assets/automod-avatar.png'

import { MessageRendererProvider } from '@widgetbot/message-renderer'
import {
  APIChannel,
  APIGuild,
  APIGuildMember,
  APIRole,
  APIUser,
} from 'discord-api-types/v10'
import SvgMiscDiscordImageFailure from '../assets/misc-discord-image-failure.svg'

const svgUrls = {
  FileAudio: SvgFileAudio,
  FileSketch: SvgSketch,
  FileArchive: SvgFileArchive,
  FileUnknown: SvgFileUnknown,
  FileAe: SvgAe,
  FileAi: SvgAi,
  FileAcrobat: SvgAcrobat,
  FileCode: SvgCode,
  FileDocument: SvgDocument,
  FileSpreadsheet: SvgSpreadsheet,
  FileWebCode: SvgWebCode,

  IconAdd: SvgIconAdd,
  IconRemove: SvgIconRemove,
  IconDownload: SvgIconDownload,
  IconWarning: SvgWarning,
  IconCheckmark: SvgIconCheckmark,
  IconCross: SvgIconCross,
  IconPin: SvgIconPin,
  IconPencil: SvgIconPencil,
  IconBoost: SvgIconBoost,
  IconThreadCreated: SvgIconThreadCreated,
  IconId: SvgIconId,
  IconSticker: SvgIconSticker,
  IconCommand: SvgIconCommand,
  IconAttachment: SvgIconAttachment,
  IconDanger: SvgIconDanger,
  IconPause: SvgIconPause,
  IconFullscreen: SvgIconFullscreen,
  IconPlay: SvgIconPlay,
  IconUnknownReply: SvgIconUnknownReply,
  IconTextChannel: SvgIconTextChannel,
  IconVoiceChannel: SvgIconVoiceChannel,
  IconStageChannel: SvgIconStageChannel,
  IconLinkExternal: SvgIconLinkExternal,
  MiscDiscordImageFailure: SvgMiscDiscordImageFailure,
}

function resolveRole(/* id: Snowflake */): APIRole | null {
  return null
}

function resolveChannel(/* id: Snowflake */): APIChannel | null {
  return null
}

function resolveMember(/* { id }: APIUser */): APIGuildMember | null {
  return null
}

function resolveGuild(): APIGuild | null {
  return null
}

function resolveUser(/* userId: Snowflake */): APIUser | null {
  return null
}

interface WrapperRendererProviderProps {
  children: React.ReactNode
}

function copyId(id: string, of = 'ID') {
  navigator.clipboard
    .writeText(id)
    .then(() => {
      alert(`${of} copied!`)
    })
    .catch(() => {
      alert(`Failed to copy ${of}!`)
    })
}

export default function WrapperRendererProvider({
  children,
}: WrapperRendererProviderProps) {
  return (
    <MessageRendererProvider
      svgUrls={svgUrls}
      automodAvatar={{
        still: automodAvatarStill,
        animated: automodAvatarAnimated,
      }}
      messageButtons={(message) => [
        {
          icon: 'IconId',
          onClick: () => {
            copyId(message.id, 'Message ID')
          },
          actionDescription: 'Copy Message ID',
        },
      ]}
      resolveRole={resolveRole}
      resolveChannel={resolveChannel}
      resolveMember={resolveMember}
      resolveGuild={resolveGuild}
      resolveUser={resolveUser}
      currentUser={() => null}
      seeThreadOnClick={(_messageId, thread) => {
        copyId(thread.id, 'Thread ID')
      }}
      userOnClick={(user) => {
        copyId(user.id, 'User ID')
      }}
      roleMentionOnClick={(role) => {
        copyId(role.id, 'Role ID')
      }}
      channelMentionOnClick={(channel) => {
        copyId(channel.id, 'Channel ID')
      }}
      externalLinkOpenRequested={(url) => {
        window.open(url, '_blank')
      }}
      unknownMessageTypeResponse={0}
    >
      {({ themeClass }) => <div className={themeClass}>{children}</div>}
    </MessageRendererProvider>
  )
}
