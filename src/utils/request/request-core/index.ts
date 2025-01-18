import type { XRequestor } from './type'

let req: XRequestor
export const inject = (requestor: XRequestor) => {
  req = requestor
}

export function useRequestor(): XRequestor {
  return req
}
