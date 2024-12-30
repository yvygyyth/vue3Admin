import { cacheJson } from './cacheJson'
import CacheData from './CacheData'

const cacheManage = new Map()

export const fetchDataWithCache = (key: keyof typeof cacheJson) => {
  if (!cacheManage.has(key)) {
    const cacheData = new CacheData(cacheJson[key])
    cacheManage.set(key, cacheData)
  }
  return cacheManage.get(key)
}

export const clearCache = (key: string) => {
  if (cacheManage.has(key)) {
    const CacheData = cacheManage.get(key)
    CacheData.cacheData.value = null
    console.log(`缓存 "${key}" 删除成功`)
  } else {
    console.log(`缓存 "${key}"不存在.`)
  }
}
