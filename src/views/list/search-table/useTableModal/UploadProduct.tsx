import { ref } from 'vue'
import UploadComponent from '@/components/upload-component'

export const UploadProduct = () => {
  return {
    title: '上传',
    content: () => (
      <UploadComponent
        uploadApi="/user/file/upload"
        mergeApi="/user/file/merge"
        hashApi="/user/file/hash"
      />
    ),
    fullscreen: true,
    onOk: () => {
      console.log('点击了确定')
    }
  }
}
