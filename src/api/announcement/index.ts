import { useRequestor, requestExtender } from '@net-vert/core'
import type { 
    AnnouncementQueryParams, 
    Announcement, 
} from './type'

const request = useRequestor()

const { requestor:idempotencyRequestor } = requestExtender.idempotencyRequestor()

// 分页查询公告
export const announcementQueryApi = (data: AnnouncementQueryParams): Promise<Announcement[]> => {
    return idempotencyRequestor.post('/announcements/query', data)
}

// 获取单个公告详情
export const announcementDetailApi = (id: number): Promise<Announcement> => {
    return request.get(`/announcements/detail/${id}`)
}

// 删除单个公告
export const announcementDeleteApi = (id: number) => {
    return request.delete(`/announcements/delete/${id}`)
}

export * from './type'
export * from './enum'