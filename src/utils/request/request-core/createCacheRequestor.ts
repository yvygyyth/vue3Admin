import { useRequestor } from './index'
import type { Requestor, RequiredRequestConfig } from './type'
import { useCacheStore } from '@/hooks/useCacheStore'
import { normalizationMethod, denormalizationMethod } from './interceptors'
import { usePromiseCache } from './usePromiseCache'
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
  const { getPromise, addPromise, removePromise } = usePromiseCache()
  const requestorHandle = {
    get<T extends keyof Requestor>(target: Requestor, prop: T) {
      type MethodParams = Parameters<Requestor[T]>
      const originalMethod = (...args: MethodParams) => {
        const normalization = normalizationMethod(prop, ...args)
        // 生成缓存 key
        const cacheKey = mergedConfig.key(normalization)

        // 检查是否存在相同请求的 Promise，防止重复请求
        const existingPromise = getPromise(cacheKey)
        if (existingPromise) {
          console.log(`===> 已存在该请求: ${cacheKey}`)
          return existingPromise
        }

        const cachedData = store.get(cacheKey)
        if (cachedData && !isExpired(cachedData)) {
          return cachedData.value
        } else {
          const requestPromise = Reflect.apply(target[prop], target, args)
            .then((response: ReturnType<Requestor[T]>) => {
              store.set(cacheKey, wrapWithExpiry(response, mergedConfig.duration))
              console.log('===>cache', '成功', cacheKey, response)
              return response
            })
            .finally(() => {
              // 清除promise
              removePromise(cacheKey)
            })
          // 添加promise
          addPromise(cacheKey, requestPromise)
          return requestPromise
        }
      }
      return originalMethod
    }
  }
  const requestor = new Proxy(useRequestor(), requestorHandle)
  return requestor
}
