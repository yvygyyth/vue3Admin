import { TASK_STATUS } from '../types/http'
import { pool, ConcurrentPool } from './concurrentPool'
import type { UploadTask, UploadChunk, OnProgressChange, ProgressInfo } from '../types'
import type { ProgressEvent } from '@/utils/request/request-core/type'
import { progressDefault } from '../types/http'
import { useConfig } from './uploader/uploader-core/index'
import request from '@/utils/request'
import { createFormData } from './file'
import { throttle, debounce } from 'lodash'

export default class Task implements UploadTask {
  id: string
  private _progress: ProgressInfo = { ...progressDefault }
  progress: ProgressInfo
  retries: number
  controller: AbortController
  status: TASK_STATUS = TASK_STATUS.PENDING
  responseInterval: number = 1000

  private debouncedOnProgressChange: () => void

  // 静态标志位
  private static _initialized = false
  // 静态配置存储
  private static _globalConfig: ReturnType<typeof useConfig>
  // 静态线程池
  private static _taskConcurrency: ConcurrentPool
  constructor(
    public metadata: UploadChunk,
    onProgressChange: OnProgressChange
  ) {
    Task.ensureConfig()
    this.id = `t_${Date.now()}`
    this.retries = Task._globalConfig.concurrency
    this.controller = new AbortController()
    this.metadata = metadata

    this.debouncedOnProgressChange = debounce(() => {
      onProgressChange(this.id, this._progress)
    }, 100)

    this.progress = new Proxy(this._progress, {
      get: (target, prop) => {
        return Reflect.get(target, prop)
      },
      set: (target, prop, val) => {
        this.debouncedOnProgressChange()
        return Reflect.set(target, prop, val)
      }
    })
  }

  private static ensureConfig() {
    if (!this._initialized) {
      this._globalConfig = useConfig()
      this._taskConcurrency = new pool(this._globalConfig?.maxSize ?? 1024 * 1024)
      this._initialized = true
    }
    return this._globalConfig!
  }
  private request = () => {
    return request.post(
      Task._globalConfig.uploadApi,
      createFormData({
        file: this.metadata.chunk,
        name: 'file'
      }),
      {
        signal: this.controller.signal,
        onUploadProgress: this.updateProgress
      }
    )
  }
  execute() {
    return Task._taskConcurrency.add(this.id, this.request)
  }
  cancel() {
    if (this.status === TASK_STATUS.UPLOADING) {
      Task._taskConcurrency.remove(this.id)
      this.controller.abort()
    } else if (this.status === TASK_STATUS.PENDING) {
      Task._taskConcurrency.remove(this.id)
    }
  }
  pause() {
    this.cancel()
    this.status = TASK_STATUS.PENDING
    this.controller = new AbortController()
    this.updateProgress.cancel()
    Object.assign(this.progress, progressDefault)
  }

  updateProgress = throttle((progressEvent: ProgressEvent) => {
    this.status = TASK_STATUS.UPLOADING
    Object.assign(this.progress, progressEvent)
  }, this.responseInterval)
}
