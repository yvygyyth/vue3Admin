import axios from 'axios'

import type { Pagination } from '@/types/global'
import type { FormData, QueryResult, QueryParams, ListRes } from './type'
export type { FormData, QueryResult, QueryParams, ListRes }
export function requestList(data: Pagination) {
  return axios.post('/admin/bill/type/list', data)
}

// 保存
export function requestSave(data: FormData) {
  return axios.post('/admin/bill/type/save', data)
}

// 删除
export function requestDelete(data: { id: number }) {
  return axios.post('/admin/bill/type/del', data)
}

// 详情
export function requestGet(data: { id: number }) {
  return axios.post('/admin/bill/type/get', data)
}
