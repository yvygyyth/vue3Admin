import axios from 'axios'

import type { FormData, QueryResult, QueryParams, ListRes } from './type'
export type { FormData, QueryResult, QueryParams, ListRes }
export function requestList(data: QueryParams) {
  return axios.post('/user/bill/list', data)
}

// 保存
export function requestSave(data: FormData) {
  return axios.post('/user/bill/save', data)
}

// 删除
export function requestDelete(data: { id: number }) {
  return axios.post('/user/bill/del', data)
}

// 详情
export function requestGet(data: { id: number }) {
  return axios.post('/user/bill/get', data)
}
