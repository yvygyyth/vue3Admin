import { readonly } from 'vue'
import { STATUS, TASK_STATUS } from './http'
import type { ProgressEvent } from '@/utils/request/request-core/type'
import type { Ref, ComputedRef } from 'vue'
export type UploadStatus = STATUS

export type ProgressInfo = Partial<ProgressEvent> & {
  /** 文件大小 */
  total: number
  /** 已传输字节数 */
  loaded: number
  /** 进度（0~1 之间） */
  progress: number
  /** 传输速率（字节/秒） */
  rate: number
  /** 预估剩余时间（秒） */
  estimated: number
}

export interface UploadChunk {
  /** 文件数据 */
  readonly chunk: Blob
  /** 文件位序 */
  readonly index: number
  /** 开始位置 */
  readonly start: number
  /** 结束位置 */
  readonly end: number
  /** 文件大小 */
  readonly size: number
  /** 文件哈希 */
  readonly hash?: string
}

export interface UploadTask<T = any> {
  /** 唯一任务标识 */
  readonly id: string
  /** 任务进度 0-任务大小 */
  progressInfo: ProgressInfo
  /** 任务状态 */
  status: TASK_STATUS
  /** 剩余重试次数 */
  // retries: number
  /** 取消控制器 */
  controller: AbortController
  /** 执行任务 */
  execute: () => Promise<T>
  /** 取消任务 */
  cancel: () => void
  /** 暂停任务 */
  pause: () => void
  /** 更新进度 */
  updateProgress: (progressEvent: ProgressEvent) => void
  /** 文件元数据 */
  metadata: UploadChunk
  /** 当前任务promise */
  promise: Promise<T>
}

export type OnProgressChange = (id: string, progressEvent: ProgressInfo) => void

export interface FileUploader {
  file: File

  start: () => Promise<void>
  pause: () => void
  cancel: () => void
}

export interface Uploader {
  progressInfo: ProgressInfo
  status: UploadStatus
  tasks: UploadTask[]

  file: File

  start: () => Promise<void>
  pause: () => void
  cancel: () => void
}

export type FileExt = `.${string}`

// 组件 Props
export interface UploadProps {
  maxSize: number
  concurrency: number
  exts: FileExt[]
  uploadApi: string
  mergeApi?: string
  hashApi?: string
}
