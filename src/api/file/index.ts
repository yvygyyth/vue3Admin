import { useRequestor } from '@net-vert/core'
import type { FileResult } from '@/api/upload/type'

const request = useRequestor()

// 下载文件
export const downloadFile = (id: number): Promise<Blob> => {
    return request.get(`/file/download/${id}`, {
        responseType: 'blob'
    })
}

// 获取文件信息
export const getFileInfo = (id: number): Promise<FileResult> => {
    return request.get(`/file/info/${id}`)
}