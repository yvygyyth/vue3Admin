import type { Pagination, TimestampedEntity, TimeRange } from '@/types/global'
import type { Timestamp } from '@/types/global'

// 添加/修改的表单参数
export type FormData = {
  id: number
  amt: number | undefined
  bill_type_id: number | undefined
  bill_type_name: number | string | undefined
  memo: string
}

// 列表返回的每项数据
export type QueryResult = {
  id: number
  memo: string
  amt: number
  bill_type_id: number
} & TimestampedEntity

// 请求列表的查询参数
export type QueryParams = {
  hirer_keyword?: string
  bill_type_id?: number
} & Partial<TimeRange>

// 整个列表返回的数据
export type ListRes = {
  data: QueryResult[]
  count: number
}
