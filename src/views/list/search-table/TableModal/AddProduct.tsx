import { Message, type TableData } from '@arco-design/web-vue'
import { ref } from 'vue'
import ModalForm from './ModalForm'
import { type FormData } from '../tableStore'
import { validateForm } from './ModalForm/rules'
export const AddProduct = () => {
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
      validateForm(modalFormRef.value.submit, () => {
        Message.success('添加成功')
      }),
    onOk: () => {
      console.log('点击了确定')
    }
  }
}
