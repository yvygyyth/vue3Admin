import type { JSX } from 'vue/jsx-runtime'

export type AnyObject = {
  [key: string]: unknown
}

export type GetParams = {
  body: string
  type: string
  url: string
}
export type OKResponse = 'ok'

export type Pagination = {
  page: number
  limit: number
  total?: number
}

export type PageLimit = {
  page?: number;
  limit?: number;
}

export const COUNT_SYMBOL = Symbol('count');

export type TimeRange = [number | undefined, number | undefined]