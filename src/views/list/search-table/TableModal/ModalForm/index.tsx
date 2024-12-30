import { defineComponent, type PropType } from 'vue'
import { type TableData } from '@arco-design/web-vue'
export default defineComponent({
  name: 'ProductForm',
  props: {
    fromProps: {
      type: Object as PropType<TableData>
    }
  },
  emits: ['submit'],
  setup(props) {
    ;<a-form>
      <a-form-item label="名称"></a-form-item>
    </a-form>
  }
})
