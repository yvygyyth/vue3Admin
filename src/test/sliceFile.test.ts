// sliceFile.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest'
import {
  sliceFile,
  createChunksWithWorkers,
  cutFile
} from '@/components/upload-component/utils/uploader/worker'
import { useConfig } from '@/components/upload-component/utils/uploader/index'
import type { UploadChunk, UploadProps } from '@/components/upload-component/utils/uploader/types'

vi.mock('@/components/upload-component/utils/uploader/index', () => ({
  useConfig: vi.fn(() => ({
    maxSize: 256 * 1024,
    hashApi: '/api/hash',
    concurrency: 4
  }))
}))

beforeEach(() => {
  // 重置所有模拟状态
  vi.restoreAllMocks()
})

describe('util 模块', () => {
  it('sliceFile 方法', () => {
    expect(sliceFile(new File([], 'test.txt'), 2, 3, vi.fn()))
  })
})
