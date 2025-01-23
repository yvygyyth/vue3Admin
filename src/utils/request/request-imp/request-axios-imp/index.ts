import axios from 'axios'
import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import type { Requestor, Response } from '../../request-core/type'
import { normalizationMethod } from '../../request-core/interceptors'
import { addInterceptors } from './interceptors'

const instance = axios.create({
  baseURL: '/api',
  timeout: 60000
  // headers: { 'X-Custom-Header': 'foobar' }
})

addInterceptors(instance)

export const requestor: Requestor = {
  get: (url, config) => instance.get(url, config as AxiosRequestConfig),
  post: (url, data, config) => instance.post(url, data, config as AxiosRequestConfig),
  delete: (url, config) => instance.delete(url, config as AxiosRequestConfig),
  put: (url, data, config) => instance.put(url, data, config as AxiosRequestConfig)
}
