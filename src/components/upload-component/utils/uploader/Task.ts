import { TASK_STATUS } from './types/http'
import { pool } from '../concurrentPool'
import type { UploadTask, UploadChunk, ProgressInfo } from './types'
import type { ProgressEvent } from '@/utils/request/request-core/type'
import { progressDefault } from './types/http'
import { useConfig } from './index'
import request from '@/utils/request'
import { createFormData } from '../file'
import { throttle } from 'lodash'
export const useTaskConfig = () => {
  const globalConfig = useConfig()
  const taskConcurrency = new pool(2)
  return {
    globalConfig,
    taskConcurrency
  }
}

export default class Task implements UploadTask {
  // 实例属性
  id: string
  controller: AbortController = new AbortController()
  private useTaskConfig = useTaskConfig()
  private responseInterval: number = 1000
  // 内部进度数据与代理，更新时自动调用防抖回调
  // private _progressInfo: Ref<ProgressInfo> = ref({ ...progressDefault })
  // progressInfo: Readonly<Ref<ProgressInfo>> = refDebounced(this._progressInfo, 100)
  progressInfo = { ...progressDefault }
  status = TASK_STATUS.PENDING
  promise = new Promise(() => {})
  // 构造函数
  constructor(public metadata: UploadChunk) {
    this.metadata = metadata
    if (this.metadata.hash) {
      this.id = this.metadata.hash
    } else {
      this.id = `${Date.now()}_${Math.random().toString().slice(2, 8)}_${this.metadata.index}`
    }
  }

  // 发送请求的方法
  private request() {
    return request.post(
      this.useTaskConfig.globalConfig.uploadApi,
      createFormData({
        ...this.metadata,
        file: this.metadata.chunk,
        name: 'file'
      }),
      {
        signal: this.controller.signal,
        onUploadProgress: this.updateProgressThrottle.bind(this)
      }
    )
  }

  // 执行任务，添加到并发控制池中
  execute() {
    this.promise = this.useTaskConfig.taskConcurrency.add(this.id, this.request.bind(this))
    return this.promise
      .then((res) => {
        this.status = TASK_STATUS.SUCCESS
        return res
      })
      .catch((err) => {
        this.status = TASK_STATUS.FAIL
        return err
      })
  }

  // 取消任务，根据不同状态进行相应处理
  cancel() {
    this.useTaskConfig.taskConcurrency.remove(this.id)
    this.controller.abort()
  }

  // 暂停任务：取消当前任务、重置状态和控制器
  pause() {
    this.cancel()
    this.controller = new AbortController()
    this.updateProgressThrottle.cancel()
    this.progressInfo = { ...progressDefault }
  }

  // 节流更新进度，防止过于频繁更新
  updateProgressThrottle = throttle(this.updateProgress, this.responseInterval)
  updateProgress(progressEvent: ProgressEvent) {
    this.progressInfo = progressEvent
  }
}
