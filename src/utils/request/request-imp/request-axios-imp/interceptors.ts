import useAuth from '@/hooks/auth'
import { ResCode } from '@/types/constants'
import LocalStorageService from '@/utils/localStorage'
import { LS } from '@/utils/localStorage/http'
import { Message, Modal } from '@arco-design/web-vue'
import axios, { type AxiosResponse, type InternalAxiosRequestConfig } from 'axios'

// InternalAxiosRequestConfig
export interface HttpResponse<T = unknown> extends AxiosResponse {
  msg: string
  code: number
  data: T
  count?: number
}
const localStore = new LocalStorageService()
// 请求拦截器
axios.interceptors.request.use(
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
axios.interceptors.response.use(
  (response: AxiosResponse<HttpResponse>) => {
    const { data: responseData } = response
    // 如果是文件下载
    if (response.config.headers.apiType === 'download') {
      return responseData
    }
    if (responseData.code !== ResCode.success) {
      Message.error({
        content: responseData.msg || 'Error',
        duration: 5 * 1000
      })
      if (
        [ResCode.illegalToken, ResCode.expiredToken, ResCode.otherLogin].includes(responseData.code)
      ) {
        Modal.error({
          title: 'Confirm logout',
          content: 'You have been logged out, you can cancel to stay on this page, or log in again',
          okText: 'Re-Login',
          async onOk() {
            const { logoutApp } = useAuth()
            await logoutApp()
            window.location.reload()
          }
        })
      }
      return Promise.reject(new Error(responseData.msg || 'Error'))
    }

    return responseData
  },
  (error) => {
    Message.error({
      content: error.msg || 'Request Error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)
