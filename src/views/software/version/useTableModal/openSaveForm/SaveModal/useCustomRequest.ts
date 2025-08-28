import type { RequestOption, UploadRequest } from '@arco-design/web-vue'
import { upload } from '@/api/upload'

export const useCustomRequest = async(option: RequestOption): UploadRequest => {
    const { onProgress, onError, onSuccess, fileItem, name } = option

    const signal = new AbortController()
    try{
        const request = await upload({
            file: fileItem.file,
            name: name || fileItem.file.name
        }, (progressEvent: ProgressEvent) => {
            let percent
            if (progressEvent.total > 0) {
                percent = progressEvent.loaded / progressEvent.total
            }
            onProgress(percent)
        }, signal.signal)

        onSuccess(request)


    } catch (err) {
        onError(err)
    }

    return {
        abort() {
            signal.abort()
        }   
    }
}
