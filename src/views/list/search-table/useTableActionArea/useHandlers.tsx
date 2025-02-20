import { Message, type TableData } from '@arco-design/web-vue'
import { TableEventBus, requestDelete } from '../tableStore'
import { EBE } from '@/components/table-layout/EventBusEnum'
import { Modal } from '@arco-design/web-vue'
import { AddProduct } from '../useTableModal'
import { UploadProduct } from '../useTableModal/UploadProduct'
export const useHandlers = () => {
  const events = new TableEventBus()

  const addOk = async () => {
    Modal.open(AddProduct())
  }

  const uploadOk = () => {
    Modal.open(UploadProduct())
  }
  return {
    addOk,
    uploadOk
  }
}
