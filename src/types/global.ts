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
  current: number
  pageSize: number
  total?: number
}

export type Timestamp = string | number | Date[] | undefined

export interface TimestampedEntity {
  created_at: Timestamp
  updated_at: Timestamp
  deleted_at: Timestamp
}

export interface TimeRange {
  start_time: Timestamp
  end_time: Timestamp
}
