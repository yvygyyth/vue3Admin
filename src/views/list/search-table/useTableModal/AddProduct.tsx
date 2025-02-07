import { ref } from 'vue'
import ModalForm from './ModalForm'
import { type FormData, TableEventBus } from '../tableStore'
import { validateForm } from './ModalForm/rules'
import { requestCallBack } from './utils'
export const AddProduct = () => {
  const events = new TableEventBus()

  const modalFormRef = ref()

  const formData = ref<FormData>({
    id: 0,
    amt: void 0,
    bill_type_id: void 0,
    bill_type_name: '',
    memo: ''
  })

  return {
    title: '添加',
    content: () => <ModalForm ref={modalFormRef} fromProps={formData.value} />,
    onBeforeOk: () =>
      validateForm(modalFormRef.value.submit, async () => {
        await requestCallBack('添加', formData)
      }),
    onOk: () => {
      console.log('点击了确定')
    }
  }
}
