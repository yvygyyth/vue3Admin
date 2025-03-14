import { TASK_STATUS } from './types/http'
import { pool } from '../concurrentPool'
import type { UploadTask, UploadChunk, ProgressInfo } from './types'
import type { ProgressEvent } from '@/utils/request/request-core/type'
import { progressDefault } from './types/http'
import { useConfig } from './index'
import request from '@/utils/request'
import { createFormData } from '../file'
import { throttle } from 'lodash'
import { ref, type Ref } from 'vue'
import { refDebounced } from '@vueuse/core'
export const useTaskConfig = () => {
  const globalConfig = useConfig()
  const taskConcurrency = new pool(globalConfig?.maxSize ?? 1024 * 1024)
  return {
    globalConfig,
    taskConcurrency
  }
}

export default class Task implements UploadTask {
  // 实例属性
  id: string = `t_${Date.now()}`
  controller: AbortController = new AbortController()
  private useTaskConfig = useTaskConfig()
  private responseInterval: number = 1000
  // 内部进度数据与代理，更新时自动调用防抖回调
  // private _progressInfo: Ref<ProgressInfo> = ref({ ...progressDefault })
  // progressInfo: Readonly<Ref<ProgressInfo>> = refDebounced(this._progressInfo, 100)
  progressInfo = { ...progressDefault }
  status = TASK_STATUS.PENDING
  // 构造函数
  constructor(public metadata: UploadChunk) {
    this.metadata = metadata
  }

  // 发送请求的方法
  private request = () => {
    return request.post(
      this.useTaskConfig.globalConfig.uploadApi,
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
    return this.useTaskConfig.taskConcurrency.add(this.id, this.request)
  }

  // 取消任务，根据不同状态进行相应处理
  cancel() {
    if (this.status === TASK_STATUS.UPLOADING) {
      this.useTaskConfig.taskConcurrency.remove(this.id)
      this.controller.abort()
    } else if (this.status === TASK_STATUS.PENDING) {
      this.useTaskConfig.taskConcurrency.remove(this.id)
    }
  }

  // 暂停任务：取消当前任务、重置状态和控制器
  pause() {
    this.cancel()
    this.status = TASK_STATUS.PENDING
    this.controller = new AbortController()
    this.updateProgress.cancel()
    this.progressInfo = { ...progressDefault }
  }

  // 节流更新进度，防止过于频繁更新
  updateProgress = throttle((progressEvent: ProgressEvent) => {
    console.log('updateProgress', progressEvent, this.status)
    this.status = TASK_STATUS.UPLOADING
    this.progressInfo = progressEvent
  }, this.responseInterval)
}
