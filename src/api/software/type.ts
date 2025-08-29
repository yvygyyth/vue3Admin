import type { PageLimit } from '@/types/pagination'

export type softwareType = {
    id: number
    app_key: string
    name: string
    description: string
}

export type SaveVersion = {
    id?: number
    app_id: number
    version: string
    file_id: number
    release_notes?: string
}

export type SearchVersion = PageLimit & {
    app_id?: number
}

export type Version = {
    id: number
    app_id: number
    version: string
    file_id: number
    file_url: string
    release_notes?: string
    created_at: string
}