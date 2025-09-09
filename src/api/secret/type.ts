import type { TimeRange, PageLimit } from "@/types/global"


export type Secret = {
    id: number
    key: string
    description: string
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