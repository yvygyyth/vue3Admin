import type { Pagination, TimestampedEntity } from '@/types/global'

// 添加/修改的表单参数
export type FormData = {
  id: number
  name: string
}

// 列表返回的每项数据
export type QueryResult = {
  id: number
  name: string
} & TimestampedEntity

// 请求列表的查询参数
export type QueryParams = {
  keyword?: string
}

// 整个列表返回的数据
export type ListRes = {
  data: QueryResult[]
  count: number
}
