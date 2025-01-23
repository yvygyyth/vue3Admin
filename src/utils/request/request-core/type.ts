export interface BasicCredentials {
  username: string
  password: string
}

export interface Headers {
  [key: string]: any
}

export interface Data {
  [key: string]: any
}

type BrowserProgressEvent = any

export interface ProgressEvent {
  loaded: number
  total?: number
  progress?: number
  bytes: number
  rate?: number
  estimated?: number
  upload?: boolean
  download?: boolean
  event?: BrowserProgressEvent
  lengthComputable: boolean
}

// 请求配置
export interface RequestConfig<D = any> {
  // 请求url
  url?: string
  // 请求方法
  method?: keyof Requestor
  // baseURL
  baseURL?: string
  // 请求头
  headers?: Headers
  // 请求参数
  params?: any
  // 请求体
  data?: D
  // 超时时间
  timeout?: number
  // `auth` HTTP Basic Auth
  auth?: BasicCredentials
  // 响应体类型
  responseType?: ResponseType
  // 允许为上传处理进度事件
  onUploadProgress?: (progressEvent: ProgressEvent) => void
  // 允许为下载处理进度事件
  onDownloadProgress?: (progressEvent: ProgressEvent) => void
  // `validateStatus` 定义了对于给定的 HTTP状态码是 resolve 还是 reject promise。
  // 如果 `validateStatus` 返回 `true` (或者设置为 `null` 或 `undefined`)，
  // 则promise 将会 resolved，否则是 rejected。
  validateStatus?: ((status: number) => boolean) | null
}

export interface RequiredRequestConfig<D = any> extends RequestConfig<D> {
  url: string
  method: keyof Requestor
}

// 返回体结构
export interface Response<T = any> {
  data: T
  code: number
  msg: string
  count?: number
}

export interface Requestor {
  get<T = any, R = Response<T>, D = any>(url: string, config?: RequestConfig<D>): Promise<R>
  post<T = any, R = Response<T>, D = any>(
    url: string,
    data?: D,
    config?: RequestConfig<D>
  ): Promise<R>
  delete<T = any, R = Response<T>, D = any>(url: string, config?: RequestConfig<D>): Promise<R>
  put<T = any, R = Response<T>, D = any>(
    url: string,
    data?: D,
    config?: RequestConfig<D>
  ): Promise<R>
}
