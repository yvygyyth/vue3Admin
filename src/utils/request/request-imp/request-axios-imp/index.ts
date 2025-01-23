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

const requestHandler = async <T = any, R = Response<T>>(
  method: keyof Requestor,
  ...args: Parameters<Requestor[keyof Requestor]>
): Promise<R> => {
  const normalizationConfig = normalizationMethod(method, ...args)
  const { onSuccess, onError, ...otherConfig } = normalizationConfig || {}
  try {
    const res = (await (method === 'get' || method === 'delete'
      ? instance[method](otherConfig.url, otherConfig as AxiosRequestConfig)
      : instance[method](
          otherConfig.url,
          otherConfig.data,
          otherConfig as AxiosRequestConfig
        ))) as R
    onSuccess?.(res as Response<T>)
    return res
  } catch (err) {
    onError?.(err)
    throw err
  }
}

export const requestor: Requestor = {
  get: (url, config) => requestHandler('get', url, config),
  post: (url, data, config) => requestHandler('post', url, data, config),
  put: (url, data, config) => requestHandler('put', url, data, config),
  delete: (url, config) => requestHandler('delete', url, config)
}
