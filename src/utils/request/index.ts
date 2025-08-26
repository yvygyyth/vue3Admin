import axios from 'axios'
import type { AxiosRequestConfig } from 'axios'
import type { UnifiedRequestor, UnifiedConfig } from '@net-vert/core'
import { inject } from '@net-vert/core'
import { setupAxiosInterceptors } from './interceptor'

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 60000,
  proxy: false
})

// 设置axios拦截器
setupAxiosInterceptors(instance)

const requestor: UnifiedRequestor = (config: UnifiedConfig) => {
  return instance.request(config as AxiosRequestConfig).then((res) => res.data.data)
}

inject(requestor)
