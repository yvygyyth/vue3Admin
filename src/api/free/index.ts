import axios from 'axios'
import type { QueryParams } from './type'
import request, { createCacheRequestor } from '@/utils/request'

const CacheRequest = createCacheRequestor()
// 渠道商列表
export function agentList(data: QueryParams) {
  return request.post('/free/agent/list', data)
}

// 租借物列表
export function matterList(data: QueryParams) {
  return request.post('/free/matter/list', data)
}

// 支付方式列表
export function payChattList(data: QueryParams) {
  return request.post('/free/pay/chan/list', data)
}

// 收支类型列表
export function costTypeList(data: QueryParams) {
  return CacheRequest.post('/free/bill/type/list', data)
}
