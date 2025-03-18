import md5 from 'js-md5'
import type { UploadChunk } from './types/index'
import { useConfig } from './index'
export const createChunkCommon = (
  file: File,
  index: number,
  chunkSize: number
): Promise<UploadChunk> => {
  return new Promise((resolve) => {
    const start = index * chunkSize
    const end = Math.min(start + chunkSize, file.size)
    const blob = file.slice(start, end)

    resolve({
      start,
      end,
      index,
      chunk: blob,
      uploadedSize: end - start
    })
  })
}

// 带哈希计算的切片方法
export const createChunkHash = (
  file: File,
  index: number,
  chunkSize: number
): Promise<UploadChunk> => {
  return new Promise((resolve, reject) => {
    const start = index * chunkSize
    const end = Math.min(start + chunkSize, file.size)
    const blob = file.slice(start, end)

    const reader = new FileReader()
    reader.readAsBinaryString(blob)

    reader.addEventListener('load', (e) => {
      if (!e.target?.result) {
        reject(new Error('Failed to read file chunk'))
        return
      }

      resolve({
        start,
        end,
        index,
        chunk: blob,
        uploadedSize: end - start,
        hash: md5(e.target.result)
      })
    })

    reader.addEventListener('error', (error) => {
      reject(error)
    })
  })
}

export const createChunk = (file: File, index: number, chunkSize: number): Promise<UploadChunk> => {
  return new Promise(async (resolve, reject) => {
    const config = useConfig()
    if (config.hashApi) {
      const chunk = await createChunkHash(file, index, chunkSize)
      resolve(chunk)
    } else {
      const chunk = await createChunkCommon(file, index, chunkSize)
      resolve(chunk)
    }
  })
}
