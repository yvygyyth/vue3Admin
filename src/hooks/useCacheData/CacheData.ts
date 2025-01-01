import { customRef, type Ref } from 'vue'
import type { FetchFunction, CacheDataOptions } from './http'

export default class CacheData<T, R> {
  private expireTime: number = Number.MAX_SAFE_INTEGER
  private cacheData: Ref<any> = customRef((track, trigger) => {
    let data: any = null
    const get = () => {
      track()
      if (!!(Date.now() > this.expireTime) || !data) {
        this.update()
        return []
      }
      return data
    }

    const set = (newValue: any) => {
      data = newValue
      if (this.expiresIn) {
        this.expireTime = Date.now() + this.expiresIn
      }
      trigger()
    }

    return { get, set }
  })

  private promise: Promise<void> | null = null
  private fetchFunction: FetchFunction<T, R>
  private params: R
  private transform: (data: T) => any
  private expiresIn?: number

  constructor({
    fetchFunction,
    params,
    transform = (data) => data,
    expiresIn
  }: CacheDataOptions<T, R>) {
    this.fetchFunction = fetchFunction
    this.params = params
    this.transform = transform
    this.expiresIn = expiresIn

    if (this.expiresIn) {
      this.expireTime = Date.now() + this.expiresIn
    }
  }

  private async update(): Promise<void> {
    if (this.promise) return
    this.promise = new Promise(async (resolve, reject) => {
      try {
        const res = await this.fetchFunction(this.params)
        this.cacheData.value = this.transform(res)
        resolve()
      } catch (error) {
        this.cacheData.value = []
        reject(error)
      } finally {
        this.promise = null
      }
    })
  }
  get value() {
    return this.cacheData.value
  }
  get isExpired() {
    return Date.now() > this.expireTime
  }
}
