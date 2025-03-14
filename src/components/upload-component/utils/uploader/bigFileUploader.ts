import md5 from 'js-md5'
import Task from './Task'
import type {
  FileUploader,
  UploadTask,
  UploadChunk,
  UploadProps,
  ProgressInfo
} from './types/index'
import { TASK_STATUS, STATUS, progressDefault } from './types/http'
import { useConfig } from './index'
import { ref, reactive, computed, type Ref } from 'vue'

export default class BigFileUploader implements FileUploader {
  public totalChunks: number

  constructor(
    public file: File,
    public tasks: Ref<UploadTask[]>,
    public status: Ref<STATUS>
  ) {
    const config = useConfig()
    this.totalChunks = Math.ceil(this.file.size / config.maxSize)
  }
  // 这里可以实现大文件的分片上传逻辑
  async start() {
    try {
      this.status.value = STATUS.UPLOADING
      await this.uploadFile()
      await this.mergeChunks()
      this.status.value = STATUS.SUCCESS
    } catch (e: any) {
      if (e.code === 'ERR_CANCELED') {
        this.status.value = STATUS.PAUSE
      } else {
        this.status.value = STATUS.FAIL
      }
      console.error(e)
    }
  }

  private async uploadFile() {
    return new Promise((resolve, reject) => {
      this.uploadChunks()
      this.cutFile()
    })
  }

  private async uploadChunks() {
    for (let i = 0; i < this.tasks.value.length; i++) {
      if (this.tasks.value[i].status !== TASK_STATUS.SUCCESS) {
        this.tasks.value[i].execute()
      }
    }
  }
  async pushTask(chunk: UploadChunk) {
    const task = new Task(chunk)
    this.tasks.value.push(task)
    return await task.execute()
  }
  async cutFile() {
    const config = useConfig()
    for (let i = this.tasks.value.length; i < this.totalChunks; i++) {
      try {
        const chunk = await this.createChunk(this.file, i, config.maxSize)
        this.pushTask(chunk)
      } catch (error) {
        console.error('Error creating chunk:', error)
      }
    }
  }
  private mergeChunks() {}
  createChunk(file: File, index: number, chunkSize: number): Promise<UploadChunk> {
    return new Promise((resolve, reject) => {
      const start = index * chunkSize
      const end = Math.min(start + chunkSize, file.size)
      const blob = file.slice(start, end)

      const config = useConfig()
      if (config.hashApi) {
        const fileRederInstance = new FileReader()

        fileRederInstance.addEventListener('load', (e) => {
          if (e.target?.result === null) {
            reject(new Error('Failed to read file'))
            return
          }
          const fileBolb = e.target?.result
          const fileMD5 = md5(fileBolb)
          resolve({
            start,
            end,
            index,
            hash: fileMD5,
            chunk: blob,
            uploadedSize: end - start
          })
        })
        fileRederInstance.readAsBinaryString(blob)
      } else {
        resolve({
          start,
          end,
          index,
          chunk: blob,
          uploadedSize: end - start
        })
      }
    })
  }

  pause() {
    // 暂停上传实现
  }

  cancel() {}
}
