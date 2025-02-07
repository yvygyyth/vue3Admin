import { type TableData } from '@arco-design/web-vue'
import { ref } from 'vue'
import ModalForm from './ModalForm'
import { type FormData } from '../tableStore'
import { validateForm } from './ModalForm/rules'
import { requestCallBack } from './utils'

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
        await requestCallBack('编辑', formData)
      }),
    onOk: () => {
      console.log('点击了确定')
    }
  }
}
