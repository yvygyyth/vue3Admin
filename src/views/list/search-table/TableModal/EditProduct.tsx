import { Message, type TableData } from '@arco-design/web-vue'
import { ref } from 'vue'
import ModalForm from './ModalForm'
import { type FormData } from '../tableStore'
export const EditProduct = (record: TableData) => {
  const formData = ref<FormData>({
    id: 0,
    amt: void 0,
    bill_type_id: void 0,
    bill_type_name: '',
    memo: ''
  })

  return {
    title: '添加',
    content: () => <ModalForm fromProps={formData.value} />,
    onBeforeOk: () => {
      return false
    },
    onOk: () => {
      console.log('点击了确定')
    }
  }
}
