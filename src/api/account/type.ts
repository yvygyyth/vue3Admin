import type { PageLimit, TimeRange } from '@/types/global'

export type SimpleUser = {
    id: number
    account: string
    password_hash: string
    nickname: string
    last_login: number
    created_at: number
}

export type User = SimpleUser & {
    roleIds: number[]
}

export type UserSearch = {
    account?: string
    nickname?: string
    roleIds?: number[]
    timeRange?: TimeRange
} & PageLimit


// 新增用户：必须有账号/密码，昵称和角色可选
export type CreateUser = {
    account: string
    password: string
    nickname?: string
    roleIds?: number[]
}
  
// 更新用户：id 必填，其他可选，nickname 可以为 null
export type UpdateUser = {
    id: number
    account?: string
    password?: string
    nickname?: string | null
    roleIds?: number[]
}
