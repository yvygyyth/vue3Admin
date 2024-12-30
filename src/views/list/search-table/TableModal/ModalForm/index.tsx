import { defineComponent, type PropType } from 'vue'
import { Form, InputNumber } from '@arco-design/web-vue'
import { type FormData } from '../../tableStore'
export default defineComponent({
  name: 'ModalForm',
  props: {
    fromProps: {
      type: Object as PropType<FormData>,
      required: true
    }
  },
  emits: ['submit'],
  setup(props) {
    return () => (
      <Form model={props.fromProps}>
        <Form.Item label="金额">
          <InputNumber placeholder={'请输入收支金额'} v-model={props.fromProps.amt} />
        </Form.Item>
      </Form>
    )
  }
})
