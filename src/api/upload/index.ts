import axios from 'axios'

export const uploadFile = async (file: File) => {
  console.log(file)
  try {
    // 创建 FormData 对象
    const formData = new FormData()
    formData.append('file', file)
    formData.append('name', file.name)
    // 发送文件上传请求
    const response = await axios.post('/user/file/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data' // 设置为文件上传格式
      },
      onUploadProgress: (progressEvent) => {
        if (progressEvent.total) {
          const percentage = Math.round((progressEvent.loaded / progressEvent.total) * 100)
          console.log(`Upload progress: ${percentage}%`)
        } else {
          console.log('Total size is unknown.')
        }
      }
    })

    console.log('Upload successful:', response.data)
    return response // 返回服务器响应
  } catch (error) {
    console.error('Upload failed:', error)
    throw error // 抛出错误以便调用方处理
  }
}

export const mergeFiles = () => {}
