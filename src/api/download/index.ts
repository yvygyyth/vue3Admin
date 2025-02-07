import { createIdempotencyRequestor, downloadFile } from '@/utils/request'

const idempotencyequest = createIdempotencyRequestor()

// 新订单导入模板文件
export const downloadNewOrderTemplate = async () => {
  const { data } = await idempotencyequest.post('/user/excel/tpl/trade/add')
  downloadFile(data.excel_file, '新订单模板')
}

// 离线导入模板文件
export const downloadOfflineTemplate = async () => {
  const { data } = await idempotencyequest.post('/user/excel/tpl/trade/offline')
  downloadFile(data.excel_file, '订单离线模板')
}
