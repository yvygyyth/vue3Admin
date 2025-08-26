/**
 * 基础日期格式化函数
 */
const formatDateBase = (
  date: Date | null | undefined,
  format = 'YYYY-MM-DD HH:mm:ss',
  defaultValue = '-'
): string => {
  if (!date || isNaN(date.getTime())) {
    return defaultValue;
  }
  
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  
  return format
    .replace('YYYY', String(year))
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds);
};

/**
 * 格式化日期时间 (使用秒级时间戳)
 * @param timestamp 秒级时间戳或日期对象或日期字符串
 * @param format 日期格式，默认为 'YYYY-MM-DD HH:mm:ss'
 * @returns 格式化后的日期字符串
 */
export const formatDateTime = (
  timestamp: number | Date | string | null | undefined,
  format = 'YYYY-MM-DD HH:mm:ss'
): string => {
  if (timestamp === null || timestamp === undefined || timestamp === '') {
    return '-';
  }
  
  let date: Date;
  
  if (timestamp instanceof Date) {
    date = timestamp;
  } else if (typeof timestamp === 'number') {
    // 秒级时间戳
    date = new Date(timestamp * 1000);
  } else {
    // 处理字符串
    date = new Date(timestamp);
  }
  
  return formatDateBase(date, format);
};

/**
 * 格式化日期时间 (使用毫秒级时间戳)
 * @param timestamp 毫秒级时间戳或日期对象或日期字符串
 * @param format 日期格式，默认为 'YYYY-MM-DD HH:mm:ss'
 * @returns 格式化后的日期字符串
 */
export const formatDateTimeMillis = (
  timestamp: number | Date | string | null | undefined,
  format = 'YYYY-MM-DD HH:mm:ss'
): string => {
  if (timestamp === null || timestamp === undefined || timestamp === '') {
    return '-';
  }
  
  let date: Date;
  
  if (timestamp instanceof Date) {
    date = timestamp;
  } else if (typeof timestamp === 'number') {
    // 毫秒级时间戳
    date = new Date(timestamp);
  } else {
    // 处理字符串
    date = new Date(timestamp);
  }
  
  return formatDateBase(date, format);
};
