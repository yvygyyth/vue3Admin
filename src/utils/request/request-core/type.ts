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
  url?: string
  baseURL?: string
  headers?: Headers
  params?: any
  data?: D
  timeout?: number
  timeoutErrorMessage?: string
  withCredentials?: boolean
  auth?: BasicCredentials
  responseType?: ResponseType
  onUploadProgress?: (progressEvent: ProgressEvent) => void
  onDownloadProgress?: (progressEvent: ProgressEvent) => void
  validateStatus?: ((status: number) => boolean) | null
}

// 返回体结构
export interface Response<T = any> {
  data: T
  code: number
  msg: string
  count?: number
}

export interface XRequestor {
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
