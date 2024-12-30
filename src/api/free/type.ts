import type { Pagination, TimestampedEntity } from '@/types/global'

// 请求列表的查询参数
export type QueryParams = {
  keyword?: string
} & Pagination
