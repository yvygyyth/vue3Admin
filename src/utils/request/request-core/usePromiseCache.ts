export const usePromiseCache = () => {
  // 使用 reactive 创建响应式的 Map 存储缓存的 Promise
  const cache = new Map<string, Promise<any>>()

  /**
   * 检查缓存中是否已有相同的请求
   * @param key 请求的唯一标识
   * @returns 返回 Promise 或 undefined
   */
  const getPromise = (key: string): Promise<any> | undefined => {
    return cache.get(key)
  }

  /**
   * 添加新的请求 Promise 到缓存中
   * @param key 请求的唯一标识
   * @param promise 需要缓存的 Promise
   */
  const addPromise = (key: string, promise: Promise<any>) => {
    cache.set(key, promise)
  }

  /**
   * 从缓存中移除指定的请求
   * @param key 请求的唯一标识
   */
  const removePromise = (key: string) => {
    cache.delete(key)
  }

  /**
   * 清空所有缓存的 Promise
   */
  const clearCache = () => {
    cache.clear()
  }

  return {
    getPromise,
    addPromise,
    removePromise,
    clearCache
  }
}
