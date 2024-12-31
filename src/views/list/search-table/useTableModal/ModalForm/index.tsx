import { defineComponent, ref, type PropType } from 'vue'
import {
  Form,
  InputNumber,
  Textarea,
  Select,
  type SelectOptionData,
  type FormInstance
} from '@arco-design/web-vue'
import { type FormData } from '../../tableStore'
import { cacheData } from '@/hooks/useCacheData'
import { CDK } from '@/hooks/useCacheData/type'
import rules from './rules'
export default defineComponent({
  name: 'ModalForm',
  props: {
    fromProps: {
      type: Object as PropType<FormData>,
      required: true
    }
  },
  setup(props, { expose }) {
    const formRef = ref<FormInstance>()
    expose({
      submit: () => formRef.value?.validate()
    })
    return () => (
      <Form ref={formRef} model={props.fromProps} rules={rules()} auto-label-width={true}>
        <Form.Item field="amt" label="金额">
          <InputNumber placeholder={'请输入收支金额'} v-model={props.fromProps.amt} />
        </Form.Item>
        <Form.Item field="bill_type_id" label={'收支类型'} tooltip="可选填没有的字段">
          <Select
            placeholder={'请选择收支类型'}
            v-model={props.fromProps.bill_type_id}
            allow-search
            allow-create
            allow-clear
          >
            {cacheData(CDK.costTypeList).value.map((option: SelectOptionData) => (
              <Select.Option key={option.label} value={option.value}>
                {option.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item field="memo" label={'备注'}>
          <Textarea placeholder="备注" v-model={props.fromProps.memo} allow-clear show-word-limit />
        </Form.Item>
      </Form>
    )
  }
})
