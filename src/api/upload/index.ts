import { useRequestor, requestExtender } from '@net-vert/core'
import type { UploadFile } from './type'

const request = useRequestor()


export const upload = (
  uploadFile: UploadFile
) => {
    const { file, name, hash } = uploadFile
    const formData = new FormData()
    formData.append('file', file)
    formData.append('name', name || '')
    

    return request.post('/file/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'x-file-hash': hash
        }
    })
}