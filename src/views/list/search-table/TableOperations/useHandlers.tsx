import { Message, type TableData } from '@arco-design/web-vue'
import { TableEventBus } from '../tableStore'
import { EBE } from '@/components/table-layout/EventBusEnum'
import { Modal } from '@arco-design/web-vue'
import { AddProduct } from '../TableModal/AddProduct'
export const handlers = () => {
  const events = new TableEventBus()

  const addOk = async (record: TableData) => {
    Modal.open(AddProduct(record))
  }
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
    addOk,
    deleteOk
  }
}
