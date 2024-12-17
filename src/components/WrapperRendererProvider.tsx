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
  GuildMemberFlags,
  GuildSystemChannelFlags,
  Locale,
  RoleFlags,
  Snowflake,
} from 'discord-api-types/v10'
import SvgMiscDiscordImageFailure from '../assets/misc-discord-image-failure.svg'
import { AttachmentBody } from '../types/AttachmentBody'

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

function resolveRole(context: AttachmentBody, id: Snowflake): APIRole | null {
  const role = context.data.roles?.[id]

  return role === undefined
    ? null
    : {
        id: role.id,
        name: role.name,
        color: role.color,
        flags: 0 as RoleFlags,
        hoist: false,
        managed: false,
        mentionable: false,
        permissions: '0',
        position: 0,
      }
}

function resolveChannel(
  context: AttachmentBody,
  id: Snowflake,
): APIChannel | null {
  const c = context.data.channel
  if (c?.id === id) {
    return {
      id: c.id,
      type: c.type,
      name: c.name,
      position: 0,
      guild_id: c.guild_id,
    } as unknown as APIChannel
  }

  const channel = context.data.channels?.[id]

  return channel === undefined
    ? null
    : ({
        id: channel.id,
        type: channel.type,
        name: channel.name,
        position: 0,
        guild_id: channel.guild_id,
      } as unknown as APIChannel) // dumb hack but otherwise TS complains about `type` not matching
}

function resolveMember(
  context: AttachmentBody,
  { id }: APIUser,
): APIGuildMember | null {
  const guildMember = context.data.members?.[id]

  return guildMember === undefined
    ? null
    : {
        roles: guildMember.roles,
        joined_at: '1970-01-01T00:00:00.000Z',
        deaf: false,
        mute: false,
        flags: 0 as GuildMemberFlags,
        user: resolveUser(context, id) ?? {
          id,
          avatar: null,
          discriminator: '0000',
          global_name: null,
          username: 'Unknown User',
        },
      }
}

function resolveGuild(context: AttachmentBody, id: Snowflake): APIGuild | null {
  const { guild } = context.data

  return !guild || guild.id !== id
    ? null
    : {
        id: guild.id,
        name: guild.name,
        icon: guild.icon,

        discovery_splash: null,
        owner_id: '0',
        region: '',
        afk_channel_id: null,
        afk_timeout: 60,
        verification_level: 0,
        default_message_notifications: 0,
        explicit_content_filter: 0,
        roles: [],
        emojis: [],
        features: [],
        mfa_level: 0,
        system_channel_id: null,
        system_channel_flags: 0 as GuildSystemChannelFlags,
        application_id: null,
        rules_channel_id: null,
        vanity_url_code: null,
        description: null,
        banner: null,
        premium_tier: 0,
        premium_subscription_count: 0,
        preferred_locale: 'en-US' as Locale,
        public_updates_channel_id: null,
        max_video_channel_users: 0,
        approximate_member_count: 0,
        nsfw_level: 0,
        stickers: [],
        premium_progress_bar_enabled: false,
        hub_type: null,
        safety_alerts_channel_id: null,
        splash: null,
      }
}

function resolveUser(context: AttachmentBody, id: Snowflake): APIUser | null {
  const user = context.data.users?.[id]

  return user === undefined
    ? null
    : {
        id: user.id,
        avatar: user.avatar,
        discriminator: user.discriminator,
        global_name: user.global_name,
        username: user.username,
      }
}

function copyId(id: string, of = 'ID') {
  if (!id) {
    return
  }

  navigator.clipboard
    .writeText(id)
    .then(() => {
      alert(`${of} copied!`)
    })
    .catch(() => {
      alert(`Failed to copy ${of}!`)
    })
}

interface WrapperRendererProviderProps {
  context: AttachmentBody
  children: React.ReactNode
}

export default function WrapperRendererProvider({
  context,
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
      resolveRole={(id) => resolveRole(context, id)}
      resolveChannel={(id) => resolveChannel(context, id)}
      resolveMember={(id) => resolveMember(context, id)}
      resolveGuild={(id) => resolveGuild(context, id)}
      resolveUser={(id) => resolveUser(context, id)}
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
