import type { Requestor } from './type'
import { createCacheRequestor } from './createCacheRequestor'
let req: Requestor
export const inject = (requestor: Requestor) => {
  req = requestor
}

function useRequestor(): Requestor {
  return req
}

export {
  useRequestor,
  createCacheRequestor
}