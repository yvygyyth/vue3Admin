import { Message, type TableData } from '@arco-design/web-vue'
import { ref } from 'vue'
export const AddProduct = (record: TableData) => {
  const formData = ref({
    name: '',
    price: '',
    description: '',
    category: '',
    status: '',
    image: '',
    inventory: '',
    rating: '',
    reviews: '',
    createdAt: '',
    updatedAt: ''
  })

  return {
    title: '添加',
    content: () => <div>添加</div>,
    onBeforeOk: () => {
      return false
    },
    onOk: () => {
      console.log('点击了确定')
    }
  }
}
