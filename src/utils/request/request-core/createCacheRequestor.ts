import { useRequestor } from './index'
import type { Requestor } from './type'
import { useCacheStore } from '@/hooks/useCacheStore'
import { normalizationMethod, denormalizationMethod } from './interceptors'
type RequestArgs = Parameters<Requestor[keyof Requestor]>

// 定义 CacheRequestor 类型
type CacheRequestor = {
  key: (config: RequestArgs) => string
  persist: boolean
  duration: number
}

// 默认配置
const defaultCacheConfig: Required<CacheRequestor> = {
  key: (args) => args[0],
  persist: false,
  duration: -1
}

// 定义 createCacheRequestor 函数，提供默认参数
export const createCacheRequestor = (config: Partial<CacheRequestor> = {}): Requestor => {
  const mergedConfig = { ...defaultCacheConfig, ...config }
  const store = useCacheStore(mergedConfig.persist)

  const requestorHandle = {
    get<T extends keyof Requestor>(target: Requestor, prop: T) {
      type MethodParams = Parameters<Requestor[T]>
      const originalMethod = (...args: MethodParams) => {
        // 生成缓存 key
        const cacheKey = mergedConfig.key(args)
        if (store.has(cacheKey)) {
          return store.get(cacheKey)
        } else {
          const normalization = normalizationMethod(prop, ...args)
          normalization.onSuccess = (response) => {
            store.set(cacheKey, response)
            console.log('===>cache', '成功', cacheKey, response)
          }
          return Reflect.apply(target[prop], target, denormalizationMethod(normalization))
        }
      }
      return originalMethod
    }
  }
  const requestor = new Proxy(useRequestor(), requestorHandle)
  return requestor
}
