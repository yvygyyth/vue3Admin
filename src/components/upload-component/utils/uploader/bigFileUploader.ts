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

export default class BigFileUploader implements FileUploader {
  private _status = STATUS.PENDING
  public tasks: UploadTask[] = []
  public totalChunks: number
  constructor(public file: File) {
    const config = useConfig()
    this.totalChunks = Math.ceil(this.file.size / config.maxSize)
  }
  // 这里可以实现大文件的分片上传逻辑
  async start() {
    try {
      this._status = STATUS.UPLOADING
      await this.uploadFile()
      await this.mergeChunks()
      this._status = STATUS.SUCCESS
    } catch (e: any) {
      if (e.code === 'ERR_CANCELED') {
        this._status = STATUS.PAUSE
      } else {
        this._status = STATUS.FAIL
      }
      console.error(e)
    }
  }

  private async uploadFile() {
    this.uploadChunks()
    this.cutFile()
    const promises = this.tasks.map((task) => task.promise)
    await Promise.all(promises)
  }

  private async uploadChunks() {
    for (const task of this.tasks) {
      if (task.status !== TASK_STATUS.SUCCESS) {
        task.execute()
      }
    }
  }
  async pushTask(chunk: UploadChunk) {
    const task = new Task(chunk)
    this.tasks.push(task)
  }
  async cutFile() {
    const config = useConfig()
    for (let i = this.tasks.length; i < this.totalChunks; i++) {
      try {
        const chunk = await this.createChunk(this.file, i, config.maxSize)
        this.pushTask(chunk)
      } catch (error) {
        console.error('Error creating chunk:', error)
      }
    }
  }
  private mergeChunks() {
    console.log('执行合并分片')
  }
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
    this.tasks.forEach((task) => {
      if (task.status !== TASK_STATUS.SUCCESS) {
        task.pause()
      }
    })
  }

  cancel() {
    this.tasks.forEach((task) => {
      if (task.status !== TASK_STATUS.SUCCESS) {
        task.cancel()
      }
    })
    this.tasks = []
  }

  get progressInfo() {
    const totalChunks = this.totalChunks

    const initial = {
      loaded: 0,
      sumProgress: 0,
      rate: 0,
      totalSize: this.file.size
    }

    const accumulated = this.tasks.reduce((acc, cur: UploadTask): typeof initial => {
      const progress = cur.progressInfo
      return {
        loaded: acc.loaded + progress.loaded,
        sumProgress: acc.sumProgress + progress.progress,
        rate: acc.rate + progress.rate,
        totalSize: acc.totalSize
      }
    }, initial)

    // 计算全局进度（考虑总分片数）
    const globalProgress = totalChunks > 0 ? accumulated.sumProgress / totalChunks : 0

    // 计算剩余时间和整体速率
    const remainingBytes = this.file.size - accumulated.loaded
    const overallRate = accumulated.rate

    return {
      total: this.file.size,
      loaded: accumulated.loaded,
      progress: globalProgress,
      rate: overallRate,
      estimated: overallRate > 0 ? remainingBytes / overallRate : Infinity
    }
  }

  get status() {
    return this._status
  }
}
