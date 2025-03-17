import Task from './Task'
import type { FileUploader, UploadTask, UploadChunk } from './types/index'
import { TASK_STATUS, STATUS, progressDefault } from './types/http'
import { useConfig } from './index'
import { sliceFile } from './worker'
import { reactive } from 'vue'
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
      this.mergeChunks()
      this._status = STATUS.SUCCESS
    } catch (e: any) {
      if (e.code !== 'ERR_CANCELED') {
        this._status = STATUS.FAIL
        console.error(e)
      }
    }
  }

  private async uploadFile() {
    this.uploadChunks()

    await sliceFile(this.file, this.tasks.length, this.totalChunks, this.setTask.bind(this))
    const taskPromises = this.tasks.map((task) => {
      return task.promise
    })
    console.log('切片完成', taskPromises)
    const result = await Promise.all(taskPromises)
    console.log('大文件上传结果', result)
  }

  private uploadChunks() {
    for (const task of this.tasks) {
      if (task.status !== TASK_STATUS.SUCCESS) {
        debugger
        task.execute()
      }
    }
  }

  setTask(chunk: UploadChunk, index: number) {
    const task = new Task(chunk)
    this.tasks.push(task)
  }

  private mergeChunks() {
    console.log('执行合并分片')
  }

  pause() {
    console.log('暂停大文件上传', this.tasks)
    this.tasks.forEach((task) => {
      if (task.status !== TASK_STATUS.SUCCESS && task.status !== TASK_STATUS.FAIL) {
        task.pause()
      }
    })
    this._status = STATUS.PAUSE
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
