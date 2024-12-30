export const formatDate = (timestamp: number, format = 'YYYY-MM-DD HH:mm:ss'): string => {
  // 将秒级时间戳转换为毫秒级时间戳
  const date = new Date(timestamp * 1000)

  const formatMap: Record<string, string> = {
    YYYY: date.getFullYear().toString(),
    MM: (date.getMonth() + 1).toString().padStart(2, '0'),
    DD: date.getDate().toString().padStart(2, '0'),
    HH: date.getHours().toString().padStart(2, '0'),
    mm: date.getMinutes().toString().padStart(2, '0'),
    ss: date.getSeconds().toString().padStart(2, '0')
  }

  return format.replace(/YYYY|MM|DD|HH|mm|ss/g, (match) => formatMap[match])
}
