import type { Requestor, RequestConfig, RequiredRequestConfig } from './type'

const normalizationMethod = <T extends keyof Requestor>(
  method: T,
  ...args: Parameters<Requestor[T]>
) => {
  let url: string
  let data: any
  let config: RequestConfig

  if (method === 'get' || method === 'delete') {
    // GET 和 DELETE 请求没有 data 参数
    ;[url, config = {}] = args as [string, RequestConfig]
  } else {
    // POST 和 PUT 请求
    ;[url, data, config = {}] = args as [string, any, RequestConfig]
  }

  // 归一化请求参数
  const normalizedConfig = {
    url,
    data: data ?? config.data,
    method,
    ...config
  }

  return normalizedConfig
}

const denormalizationMethod = <T extends keyof RequiredRequestConfig>(
  config: RequestConfig
): Parameters<RequiredRequestConfig[T]> => {
  const { url, method, data } = config

  if (method === 'get' || method === 'delete') {
    // GET 和 DELETE 请求格式: [url, config]
    return [url, config] as Parameters<RequiredRequestConfig[T]>
  } else {
    // POST 和 PUT 请求格式: [url, data, config]
    return [url, data ?? {}, config] as Parameters<RequiredRequestConfig[T]>
  }
}

export { normalizationMethod, denormalizationMethod }
