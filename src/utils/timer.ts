import dayjs from 'dayjs'

// 格式化日期时间
export const formatDate = (date: string | number | Date, format: string = 'YYYY-MM-DD HH:mm:ss'): string => {
  const dateObj =
    typeof date === 'string' || typeof date === 'number' ? new Date(+date * 1000) : date
  if (!dateObj) return ''
  const year = dateObj.getFullYear()
  const month = String(dateObj.getMonth() + 1).padStart(2, '0')
  const day = String(dateObj.getDate()).padStart(2, '0')
  const hours = String(dateObj.getHours()).padStart(2, '0')
  const minutes = String(dateObj.getMinutes()).padStart(2, '0')
  const seconds = String(dateObj.getSeconds()).padStart(2, '0')

  return format
    .replace('YYYY', year.toString())
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds)
}

// 计算两个日期的天数差异
export const calculateDateDifference = (date1: number, date2: number): number => {
  const diffTime = Math.abs(date2 - date1) // 获取时间差（毫秒）
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) // 转换为天数
  return diffDays
}

// 获取当前时间戳
export const getCurrentTimestamp = (): number => {
  return Math.floor(Date.now() / 1000)
}

// 将时间戳转换为日期
export const timestampToDate = (timestamp: number): Date => {
  return new Date(timestamp * 1000)
}

// 日期转时间戳
export const dateToTimestamp = (dateString: string | Date): number => {
  return new Date(dateString).getTime() / 1000
}

// 获取某天的开始时间（00:00:00）
export const getStartOfDay = (date: string | Date): Date => {
  const newDate = new Date(date)
  newDate.setHours(0, 0, 0, 0)
  return newDate
}

// 获取某天的结束时间（23:59:59）
export const getEndOfDay = (date: string | Date): Date => {
  const newDate = new Date(date)
  newDate.setHours(23, 59, 59, 999)
  return newDate
}

/**
 * 获取指定日期偏移量的开始和结束时间戳（秒级别）
 * @param dayOffset - 日期偏移量，0 表示今天，1 表示明天，依此类推
 * @returns { start: number, end: number } - 指定日期的开始和结束时间戳
 */
export function getDayTimestamps(dayOffset: number = 0, interval: number = 0): { start: number, end: number } {
  const now = new Date()

  // 计算目标日期
  const targetDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + dayOffset, 0, 0, 0)

  // 计算目标日期开始时间：00:00:00
  const startOfDay = new Date(
    targetDate.getFullYear(),
    targetDate.getMonth(),
    targetDate.getDate(),
    0,
    0,
    0
  )

  // 计算目标日期结束时间：23:59:59
  const endOfDay = new Date(
    targetDate.getFullYear(),
    targetDate.getMonth(),
    targetDate.getDate(),
    23,
    59,
    59
  )

  // 根据间隔调整结束时间
  const endWithInterval = new Date(endOfDay.getTime() + interval * 24 * 60 * 60 * 1000)

  return {
    start: Math.floor(startOfDay.getTime() / 1000),
    end: Math.floor(endWithInterval.getTime() / 1000)
  }
}

interface TimeShortcut {
  label: string;
  value: () => dayjs.Dayjs;
}

interface TimeShortcutRange {
  label: string;
  value: () => [dayjs.Dayjs, dayjs.Dayjs];
}

export const timeShortcut: {
  shortcuts: TimeShortcut[];
  rangeShortcuts: TimeShortcutRange[];
} = {
  shortcuts: [
    {
      label: 'yesterday',
      value: () => dayjs().subtract(1, 'day')
    },
    {
      label: 'today',
      value: () => dayjs()
    },
    {
      label: 'a week later',
      value: () => dayjs().add(1, 'week')
    },
    {
      label: 'a month later',
      value: () => dayjs().add(1, 'month')
    },
    {
      label: '2 months later',
      value: () => dayjs().add(2, 'month')
    }
  ],
  rangeShortcuts: [
    {
      label: '今天',
      value: () => [dayjs().startOf('day'), dayjs().endOf('day')]
    },
    {
      label: '昨天',
      value: () => [
        dayjs().subtract(1, 'day').startOf('day'),
        dayjs().subtract(1, 'day').endOf('day')
      ]
    },
    {
      label: '本周',
      value: () => [dayjs().startOf('week'), dayjs().endOf('week')]
    },
    {
      label: '本月',
      value: () => [dayjs().startOf('month'), dayjs().endOf('month')]
    },
    {
      label: '本年',
      value: () => [dayjs().startOf('year'), dayjs().endOf('year')]
    }
  ]
}