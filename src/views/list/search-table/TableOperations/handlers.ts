import { Message, type TableData } from '@arco-design/web-vue'
import { TableEventBus } from '../tableStore'
import { EBE } from '@/components/table-layout/EventBusEnum'

const events = new TableEventBus()
export const deleteOk = async (record: TableData) => {
  try {
    await Promise.resolve()
    Message.success('删除成功')
    events.emit(EBE.handleQuerySearch)
    return true
  } catch (e) {
    return false
  }
}
