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
  // 静态配置与线程池
  private static _initialized = false
  private static _globalConfig: ReturnType<typeof useConfig>
  private static _taskConcurrency: ConcurrentPool

  // 静态方法：确保全局配置只初始化一次
  private static ensureConfig() {
    if (!this._initialized) {
      this._globalConfig = useConfig()
      this._taskConcurrency = new pool(this._globalConfig?.maxSize ?? 1024 * 1024)
      this._initialized = true
    }
    return this._globalConfig!
  }

  // 实例属性
  id: string = `t_${Date.now()}`
  retries: number
  controller: AbortController = new AbortController()
  status: TASK_STATUS = TASK_STATUS.PENDING
  private responseInterval: number = 1000
  // 内部进度数据与代理，更新时自动调用防抖回调
  private _progress: ProgressInfo = { ...progressDefault }
  progress: ProgressInfo = new Proxy(this._progress, {
    get: (target, prop) => Reflect.get(target, prop),
    set: (target, prop, val) => {
      this.debouncedOnProgressChange()
      return Reflect.set(target, prop, val)
    }
  })

  // 防抖回调，防止 onProgressChange 过于频繁
  private debouncedOnProgressChange: () => void

  // 构造函数
  constructor(
    public metadata: UploadChunk,
    onProgressChange: OnProgressChange
  ) {
    Task.ensureConfig()
    this.retries = Task._globalConfig.concurrency
    this.metadata = metadata
    this.debouncedOnProgressChange = debounce(() => {
      onProgressChange(this.id, this._progress)
    }, 100)
  }

  // 发送请求的方法
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

  // 执行任务，添加到并发控制池中
  execute() {
    return Task._taskConcurrency.add(this.id, this.request)
  }

  // 取消任务，根据不同状态进行相应处理
  cancel() {
    if (this.status === TASK_STATUS.UPLOADING) {
      Task._taskConcurrency.remove(this.id)
      this.controller.abort()
    } else if (this.status === TASK_STATUS.PENDING) {
      Task._taskConcurrency.remove(this.id)
    }
  }

  // 暂停任务：取消当前任务、重置状态和控制器，并取消 pending 的 throttle 调用
  pause() {
    this.cancel()
    this.status = TASK_STATUS.PENDING
    this.controller = new AbortController()
    this.updateProgress.cancel()
    Object.assign(this.progress, progressDefault)
  }

  // 节流更新进度，防止过于频繁更新
  updateProgress = throttle((progressEvent: ProgressEvent) => {
    this.status = TASK_STATUS.UPLOADING
    Object.assign(this.progress, progressEvent)
  }, this.responseInterval)
}
