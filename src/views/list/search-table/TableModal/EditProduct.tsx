import { Message, type TableData } from '@arco-design/web-vue'
import { ref } from 'vue'
import ModalForm from './ModalForm'
import { type FormData } from '../tableStore'
export const EditProduct = (record: TableData) => {
  const modalFormRef = ref()

  const { id, amt, bill_type_id, memo } = record
  const formData = ref<FormData>({
    id: id,
    amt: amt,
    bill_type_id: bill_type_id,
    bill_type_name: '',
    memo: memo
  })

  const onBeforeOk = async () => {
    const valid = await modalFormRef.value.submit()
    if (!valid) {
      Message.success('添加成功')
      return true
    }
    return false
  }
  return {
    title: '编辑',
    content: () => <ModalForm ref={modalFormRef} fromProps={formData.value} />,
    onBeforeOk,
    onOk: () => {
      console.log('点击了确定')
    }
  }
}
