import { useRequestor } from './index'
import type { RequiredRequestConfig, Requestor } from './type'
import { useCacheStore } from '@/hooks/useCacheStore'
import { eventBus, EventTypes } from '../request-side-effect'

// 定义 CacheRequestor 类型
type CacheRequestor = {
  key: (config: RequiredRequestConfig) => string
  persist: boolean
  duration: number
}

// 默认配置
const defaultCacheConfig: Required<CacheRequestor> = {
  key: (config) => config.url,
  persist: false,
  duration: -1
}

// 定义 createCacheRequestor 函数，提供默认参数
export const createCacheRequestor = (config: Partial<CacheRequestor> = {}): Requestor => {
  const mergedConfig = { ...defaultCacheConfig, ...config }
  const store = useCacheStore(mergedConfig.persist)

  const requestorHandle = {
    get(target: Requestor, prop: keyof Requestor) {
      console.log('缓存前置拦截', prop)
      return Reflect.get(target, prop)
    }
  }
  const requestor = new Proxy(useRequestor(), requestorHandle)

  return requestor
}
