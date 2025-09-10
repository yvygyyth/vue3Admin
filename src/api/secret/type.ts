import type { TimeRange, PageLimit } from "@/types/global"
import type { IsEncryption } from "./enum"


export type Secret = {
    id: number
    key: string
    description: string
    is_encryption: IsEncryption
    created_at: string
    updated_at: string
}

export type SecretSearch = {
    keyword: string
    timeRange: TimeRange
} & PageLimit


export type SecretUpdate = {
    id:number
    value: string
    description: string
}