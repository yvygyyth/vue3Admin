import Task from './Task'
import type { Uploader, UploadTask, UploadChunk, UploadProps, ProgressInfo } from './types/index'
import { TASK_STATUS, STATUS, progressDefault } from './types/http'
import { reactive } from 'vue'
export default class SimpleFileUploader implements Uploader {
  private _status = STATUS.PENDING
  public tasks: UploadTask[] = []
  constructor(public file: File) {}
  async start() {
    try {
      this._status = STATUS.UPLOADING
      if (this.tasks.length) {
        const [task] = this.tasks
        await task.execute()
      } else {
        await this.uploadFile()
      }
      this._status = STATUS.SUCCESS
    } catch (e: any) {
      if (e.code === 'ERR_CANCELED') {
        this._status = STATUS.PAUSE
      } else {
        this._status = STATUS.FAIL
      }
    }
  }

  private async uploadFile() {
    const task = reactive(
      new Task({
        index: 0,
        start: 0,
        end: this.file.size,
        uploadedSize: this.file.size,
        chunk: this.file
      })
    )
    this.tasks.push(task)
    await task.execute()
  }
  pause() {
    const [task] = this.tasks
    task.pause()
  }

  cancel() {
    const [task] = this.tasks
    task.cancel()
    this.tasks = []
  }

  get progressInfo() {
    const [task] = this.tasks
    return task
      ? task.progressInfo
      : {
          ...progressDefault,
          total: this.file.size
        }
  }

  get status() {
    return this._status
  }
}
