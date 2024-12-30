export type FetchFunction<T, R> = (params: R) => Promise<T>

export interface CacheDataOptions<T, R> {
  fetchFunction: FetchFunction<T, R>
  params: R
  transform?: (data: T) => any
  expiresIn?: number
}
