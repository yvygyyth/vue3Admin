import axios from 'axios'

export interface BaseInfoModel {
  activityName: string
  channelType: string
  promotionTime: string[]
  promoteLink: string
}
export interface ChannelInfoModel {
  advertisingSource: string
  advertisingMedia: string
  keyword: string[]
  pushNotify: boolean
  advertisingContent: string
}

export type UnitChannelModel = BaseInfoModel & ChannelInfoModel

export function submitChannelForm(data: UnitChannelModel) {
  return axios.post('/api/channel-form/submit', { data })
}

export interface GroupFormModel {
  video: {
    mode: string
    acquisition: {
      resolution: string
      frameRate: number
    }
    encoding: {
      resolution: string
      rate: {
        min: number
        max: number
        default: number
      }
      frameRate: number
      profile: string
    }
  }
  audio: {
    mode: string
    explanation: string
    acquisition: {
      channels: number
    }
    encoding: {
      channels: number
      rate: number
      profile: string
    }
  }
}
export function submitGroupForm(data: GroupFormModel) {
  return axios.post('/api/channel-form/group', { data })
}
