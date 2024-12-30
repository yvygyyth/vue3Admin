import { Message, type TableData } from '@arco-design/web-vue'
import { TableEventBus } from '../tableStore'
import { EBE } from '@/components/table-layout/EventBusEnum'

export const handlers = () => {
  const events = new TableEventBus()
  const deleteOk = async (record: TableData) => {
    try {
      await Promise.resolve()
      Message.success('删除成功')
      events.emit([EBE.resetPagination, EBE.resetSearchQuery])
      return true
    } catch (e) {
      return false
    }
  }

  return {
    deleteOk
  }
}
