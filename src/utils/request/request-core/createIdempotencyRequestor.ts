import { createCacheRequestor } from './createCacheRequestor'
import type { RequiredRequestConfig } from './type'

const hashRequest = (config: RequiredRequestConfig) => {
  const { method, url, params, data } = config
  const hash = [method, url, JSON.stringify(params), JSON.stringify(data)].join('|')
  return hash
}

export const createIdempotencyRequestor = (genKey: (config: RequiredRequestConfig) => string) => {
  return createCacheRequestor({
    key: (config) => (genKey ? genKey(config) : hashRequest(config)),
    persist: false
  })
}
