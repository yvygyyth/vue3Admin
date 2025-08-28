import { useRequestor } from '@net-vert/core'
import type { 
    UploadFileParams, 
    MergeFileParams, 
    UploadResponse,
    FileResult
} from './type'

const request = useRequestor()

// 检查文件块是否存在
export const checkChunkExists = (hash: string): Promise<boolean> => {
    return request.get(`/file/chunk/${hash}`)
}

// 上传文件或文件块（支持泛型，根据是否传name返回不同类型）
export const upload = <T extends UploadFileParams>(
    uploadFile: T,
    onProgress: (progress: ProgressEvent) => void,
    signal: AbortSignal
): Promise<UploadResponse<T>> => {
    const { file, name, hash } = uploadFile
    const formData = new FormData()
    formData.append('file', file)
    
    // 只有当name存在且不为空时才添加到formData
    if (name) {
        formData.append('name', name)
    }

    const headers: Record<string, string> = {
        'Content-Type': 'multipart/form-data'
    }
    
    // 只有当hash存在时才添加到headers
    if (hash) {
        headers['x-file-hash'] = hash
    }

    return request.post('/file/upload', formData, { 
        headers,
        onUploadProgress: onProgress,
        signal
    })
}

// 合并文件块
export const mergeFile = (params: MergeFileParams): Promise<FileResult> => {
    return request.post('/file/merge', params)
}
