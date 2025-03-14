import type { UploadTask, Uploader } from './uploader/types/index'
import { TASK_STATUS, STATUS, progressDefault } from './uploader/types/http'
import { useConfig } from './uploader/index'
import { ref, computed, type Ref } from 'vue'
import SimpleFileUploader from './uploader/simpleFileUploader'
import BigFileUploader from './uploader/bigFileUploader'
const useSimpleUploader = (file: File): Uploader => {
  const status = STATUS.PENDING
  const tasks = []
  const fileUploader = new SimpleFileUploader()

  const progressInfo = computed(() => {
    const [task] = tasks.value
    if (task) {
      return task.progressInfo
    } else {
      return progressDefault
    }
  })

  return {
    status,
    progressInfo,
    tasks,
    fileUploader
  }
}

const useBigUploader = (file: File): Uploader => {
  const status = ref(STATUS.PENDING)
  const tasks = ref<UploadTask[]>([])

  const uploader = new BigFileUploader(file, tasks, status)

  const progressInfo = computed(() => {
    const totalChunks = uploader.totalChunks

    const initial = {
      loaded: 0,
      sumProgress: 0,
      rate: 0,
      totalSize: file.size
    }

    const accumulated = tasks.value.reduce((acc, cur: UploadTask): typeof initial => {
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
    const remainingBytes = file.size - accumulated.loaded
    const overallRate = accumulated.rate

    return {
      total: file.size,
      loaded: accumulated.loaded,
      progress: globalProgress,
      rate: overallRate,
      estimated: overallRate > 0 ? remainingBytes / overallRate : Infinity
    }
  })

  return {
    status,
    progressInfo,
    tasks,
    uploader
  }
}

export function createFileUploader(file: File) {
  const config = useConfig()
  if (file.size > config.maxSize) {
    return new SimpleFileUploader(file)
  } else {
    return new SimpleFileUploader(file)
  }
}
