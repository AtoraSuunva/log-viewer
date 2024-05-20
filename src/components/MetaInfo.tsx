import { ReactComponent as SvgIconStageChannel } from '../assets/icon-stage-channel.svg'
import { ReactComponent as SvgIconTextChannel } from '../assets/icon-text-channel.svg'
import { ReactComponent as SvgIconVoiceChannel } from '../assets/icon-voice-channel.svg'

import { ChannelType } from 'discord-api-types/v10'
import { useEffect } from 'react'
import { AttachmentBody, MinimalChannel } from '../types/AttachmentBody'

interface MetaInfoProps {
  context: AttachmentBody
}

export function MetaInfo({ context }: MetaInfoProps) {
  const { guild, channel } = context.data

  useEffect(() => {
    document.title = `Log: #${channel?.name ?? 'Unknown Channel'}`
  }, [])

  return (
    <div className="meta-info">
      <div className="meta-info__guild">
        <h2 className="meta-info__title">Guild</h2>
        <div className="meta-info__content">
          <div className="meta-info__icon">
            {guild?.icon ? (
              <img
                src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png?size=96`}
                alt="Guild Icon"
              />
            ) : (
              <div className="meta-info__icon-placeholder" />
            )}
          </div>
          <div className="meta-info__name">
            {guild?.name} ({guild?.id})
          </div>
        </div>
      </div>
      <div className="meta-info__channel">
        <h2 className="meta-info__title">Channel</h2>
        <div className="meta-info__content">
          <div className="meta-info__icon">
            {SvgIconFromChannelType(channel)}
          </div>
          <div className="meta-info__name">
            {channel?.name ?? 'Unknown Channel'} ({channel?.id ?? '???'})
          </div>
        </div>
      </div>
    </div>
  )
}

function SvgIconFromChannelType(
  channel: MinimalChannel | undefined,
): React.ReactNode {
  switch (channel?.type) {
    case ChannelType.GuildText:
      return <SvgIconTextChannel />
    case ChannelType.GuildVoice:
      return <SvgIconVoiceChannel />
    case ChannelType.GuildStageVoice:
      return <SvgIconStageChannel />
    default:
      return <SvgIconTextChannel />
  }
}
