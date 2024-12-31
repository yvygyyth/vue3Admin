import { Message, type TableData } from '@arco-design/web-vue'
import { ref } from 'vue'
import ModalForm from './ModalForm'
import { type FormData } from '../tableStore'
export const AddProduct = () => {
  const modalFormRef = ref()
  const formData = ref<FormData>({
    id: 0,
    amt: void 0,
    bill_type_id: void 0,
    bill_type_name: '',
    memo: ''
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
    title: '添加',
    content: () => <ModalForm ref={modalFormRef} fromProps={formData.value} />,
    onBeforeOk,
    onOk: () => {
      console.log('点击了确定')
    }
  }
}
