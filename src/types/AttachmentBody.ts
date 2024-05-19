import {
  APIChannel,
  APIGuild,
  APIGuildMember,
  APIMessage,
  APIRole,
  APIUser,
  ChannelType,
} from 'discord-api-types/v10'

export type AttachmentBody = AttachmentBodyV1

export type MinimalGuild = Pick<APIGuild, 'id' | 'name' | 'icon'>
export type MinimalChannel = Pick<APIChannel, 'id' | 'name'> & {
  type: ChannelType
  guild_id?: string
}
export type MinimalRole = Pick<
  APIRole,
  'id' | 'name' | 'color' | 'icon' | 'unicode_emoji'
>
export type MinimalUser = Pick<
  APIUser,
  'id' | 'avatar' | 'discriminator' | 'global_name' | 'username'
>
export type MinimalGuildMember = Pick<APIGuildMember, 'roles'>

interface AttachmentBodyV1 {
  version: 1
  data: {
    messages: APIMessage[]
    guild?: MinimalGuild
    channel?: MinimalChannel
    members?: Record<string, MinimalGuildMember>
    roles?: Record<string, MinimalRole>
    channels?: Record<string, MinimalChannel>
    users?: Record<string, MinimalUser>
  }
}
