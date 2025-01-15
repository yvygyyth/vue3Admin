interface RequestorOptions {
  baseURL?: string
  timeout?: number
  headers?: Record<string, any>
}

interface Response {
  data: unknown
}

export interface XRequestor {
  get(url: string, options: RequestorOptions): Promise<Response>
  post(url: string, options: RequestorOptions): Promise<Response>
  put(url: string, options: RequestorOptions): Promise<Response>
  delete(url: string, options: RequestorOptions): Promise<Response>
}

let req: XRequestor
export const inject = (requestor: XRequestor) => {
  req = requestor
}

export function useRequestor(): XRequestor {
  return req
}
