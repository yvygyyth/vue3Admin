import { useRequestor } from './index'
import type { Requestor, RequiredRequestConfig } from './type'
import { useCacheStore } from '@/hooks/useCacheStore'
import { normalizationMethod, denormalizationMethod } from './interceptors'

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

// 包装数据
export const wrapWithExpiry = <T>(data: T, duration: number) => {
  return {
    value: data,
    expiresAt: duration > 0 ? Date.now() + duration : -1 // -1 代表永不过期
  }
}

// 是否过期
export const isExpired = (cachedData: { expiresAt: number }) => {
  if (cachedData.expiresAt === -1) {
    return false // 永不过期
  }
  return Date.now() > cachedData.expiresAt
}

// 定义 createCacheRequestor 函数，提供默认参数
export const createCacheRequestor = (config: Partial<CacheRequestor> = {}): Requestor => {
  const mergedConfig = { ...defaultCacheConfig, ...config }
  const store = useCacheStore(mergedConfig.persist)

  const requestorHandle = {
    get<T extends keyof Requestor>(target: Requestor, prop: T) {
      type MethodParams = Parameters<Requestor[T]>
      const originalMethod = (...args: MethodParams) => {
        const normalization = normalizationMethod(prop, ...args)
        // 生成缓存 key
        const cacheKey = mergedConfig.key(normalization)

        const cachedData = store.get(cacheKey)
        if (cachedData && !isExpired(cachedData)) {
          return cachedData.value
        } else {
          return Reflect.apply(target[prop], target, args).then(
            (response: ReturnType<Requestor[T]>) => {
              store.set(cacheKey, wrapWithExpiry(response, mergedConfig.duration))
              console.log('===>cache', '成功', cacheKey, response)
              return response
            }
          )
        }
      }
      return originalMethod
    }
  }
  const requestor = new Proxy(useRequestor(), requestorHandle)
  return requestor
}
