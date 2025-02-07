export const downloadFile = async (downloadUrl: string, fileName: string = 'file') => {
  try {
    // const response = await idempotencyequest.get(downloadUrl, {
    //   responseType: 'blob',
    //   headers: {
    //     apiType: 'download'
    //   }
    // })

    // 创建一个 Blob URL
    // const blob = response
    const link = document.createElement('a')

    link.href = import.meta.env.VITE_API_BASE_URL + downloadUrl
    // link.href = URL.createObjectURL(blob as Blob)
    link.download = `${fileName}.xlsx`
    link.click()
  } catch (error) {
    console.error('下载失败:', error)
  }
}
