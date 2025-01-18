import axios from 'axios'
import type { AxiosRequestConfig } from 'axios'
import type { XRequestor } from '../../request-core/type'

import { addInterceptors } from './interceptors'

const instance = axios.create({
  baseURL: '/api',
  timeout: 60000
  // headers: { 'X-Custom-Header': 'foobar' }
})

addInterceptors(instance)

if (import.meta.env.VITE_API_BASE_URL) {
  instance.defaults.baseURL = import.meta.env.VITE_API_BASE_URL
}

export const requestor: XRequestor = {
  get: (url, config) => instance.get(url, config as AxiosRequestConfig),
  post: (url, data, config) => instance.post(url, data, config as AxiosRequestConfig),
  delete: (url, config) => instance.delete(url, config as AxiosRequestConfig),
  put: (url, data, config) => instance.put(url, data, config as AxiosRequestConfig)
}
