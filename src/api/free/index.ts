import axios from 'axios'
import type { QueryParams } from './type'

// 渠道商列表
export function agentList(data: QueryParams) {
  return axios.post('/free/agent/list', data)
}

// 租借物列表
export function matterList(data: QueryParams) {
  return axios.post('/free/matter/list', data)
}

// 支付方式列表
export function payChattList(data: QueryParams) {
  return axios.post('/free/pay/chan/list', data)
}

// 收支类型列表
export function costTypeList(data: QueryParams) {
  return axios.post('/free/bill/type/list', data)
}
