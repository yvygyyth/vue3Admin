import type { Requestor } from './type'
import { createCacheRequestor } from './createCacheRequestor'
import { createIdempotencyRequestor } from './createIdempotencyRequestor'
import { downloadFile } from './createDownloadRequestor'
let req: Requestor
export const inject = (requestor: Requestor) => {
  req = requestor
}

function useRequestor(): Requestor {
  return req
}

export { useRequestor, createCacheRequestor, createIdempotencyRequestor, downloadFile }
