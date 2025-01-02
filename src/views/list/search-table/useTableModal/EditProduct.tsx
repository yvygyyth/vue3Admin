import { Message, type TableData } from '@arco-design/web-vue'
import { ref } from 'vue'
import ModalForm from './ModalForm'
import { type FormData } from '../tableStore'
import { requestSave } from '../tableStore'
import { validateForm } from './ModalForm/rules'

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

  return {
    title: '编辑',
    content: () => <ModalForm ref={modalFormRef} fromProps={formData.value} />,
    onBeforeOk: () =>
      validateForm(modalFormRef.value.submit, async () => {
        await requestSave(formData.value)
        Message.success('编辑成功')
      }),
    onOk: () => {
      console.log('点击了确定')
    }
  }
}
