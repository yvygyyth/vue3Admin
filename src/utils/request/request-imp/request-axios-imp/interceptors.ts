import persistenceStore from '@/utils/localStorage'
import { LS } from '@/utils/localStorage/http'
import type { AxiosResponse, InternalAxiosRequestConfig, AxiosInstance } from 'axios'
import { errorHandling } from './error'
// InternalAxiosRequestConfig
export interface HttpResponse<T = unknown> extends AxiosResponse {
  msg: string
  code: number
  data: T
  count?: number
}
const localStore = new persistenceStore()
export const addInterceptors = (axiosInstance: AxiosInstance) => {
  // 请求拦截器
  axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = localStore.get(LS.token)
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )
  // 响应拦截器
  axiosInstance.interceptors.response.use(
    (response: AxiosResponse<HttpResponse>) => {
      const { data: responseData } = response
      // 如果是文件下载
      if (response.config.headers.apiType === 'download') {
        return responseData
      }
      if (responseData.code >= 400) {
        errorHandling(responseData.code, responseData.msg)
        return Promise.reject(new Error(responseData.msg || 'Error'))
      }
      console.log('===>response', response)
      return responseData
    },
    (error) => {
      errorHandling(error.code, error.msg)
      return Promise.reject(error)
    }
  )
}
