import { useRequestor } from './index'
// 定义 CacheRequestor 类型
type CacheRequestor = {
  key: string
  persist: boolean
}

// 定义 createCacheRequestor 函数
export const createCacheRequestor = ({
  key,
  persist
}: {
  key: string
  persist: boolean
}): CacheRequestor => {
  // 内存缓存（可以替换为 LocalStorage 或其他方式）
  const cache: Record<string, any> = {}
  const requestor = useRequestor()
  
  return {
    key,
    persist
  }
}
