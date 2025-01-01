import axios, { type AxiosResponse, type InternalAxiosRequestConfig } from 'axios'
import type { XRequestor } from '../../request-core'

import './interceptors'

if (import.meta.env.VITE_API_BASE_URL) {
  axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL
}

export const requestor: XRequestor = {
  get(url: string, options: InternalAxiosRequestConfig) {
    return axios.get(url, options)
  },
  post(url: string, options: InternalAxiosRequestConfig) {
    return axios.post(url, options)
  },
  put(url: string, options: InternalAxiosRequestConfig) {
    return axios.put(url, options)
  },
  delete(url: string, options: InternalAxiosRequestConfig) {
    return axios.delete(url, options)
  }
}
