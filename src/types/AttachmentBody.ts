import { APIMessage } from 'discord-api-types/v10'

export type AttachmentBody = AttachmentBodyV1

export interface AttachmentBodyV1 {
  version: 1
  data: {
    messages: APIMessage[]
  }
}
