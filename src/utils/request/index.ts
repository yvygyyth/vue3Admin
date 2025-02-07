import {
  useRequestor,
  createCacheRequestor,
  createIdempotencyRequestor,
  downloadFile
} from './request-core'

export default useRequestor()
export { useRequestor, createCacheRequestor, createIdempotencyRequestor, downloadFile }
