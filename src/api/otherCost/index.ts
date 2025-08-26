import { useRequestor } from '@net-vert/core'

import type { FormData, QueryResult, QueryParams, ListRes } from './type'
export type { FormData, QueryResult, QueryParams, ListRes }

const request = useRequestor()

export function requestList(data: QueryParams) {
  return request.post('/other-cost/list', data)
}

// 保存
export function requestSave(data: FormData) {
  return request.post('/other-cost/save', data)
}

// 删除
export function requestDelete(data: { id: number }) {
  return request.post('/other-cost/del', data)
}

// 详情
export function requestGet(data: { id: number }) {
  return request.post('/other-cost/get', data)
}
