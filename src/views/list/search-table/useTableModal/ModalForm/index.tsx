import { defineComponent, ref, type PropType, type ObjectEmitsOptions } from 'vue'
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
import { CDK } from '@/hooks/useCacheData/http'
import rules from './rules'
import { useVModel } from '@/hooks/useVModel'
export default defineComponent({
  name: 'ModalForm',
  props: {
    fromProps: {
      type: Object as PropType<FormData>,
      required: true
    }
  },
  emits: {
    'update:fromProps': (value: FormData) => value
  } as ObjectEmitsOptions,
  setup(props, { emit, expose }) {
    const formRef = ref<FormInstance>()
    const fromData = useVModel(props, emit, 'fromProps')
    expose({
      submit: () => formRef.value?.validate()
    })
    return () => (
      <Form ref={formRef} model={fromData} rules={rules()} auto-label-width={true}>
        <Form.Item field="amt" label="金额">
          {/* @ts-ignore */}
          <InputNumber placeholder={'请输入收支金额'} v-model={fromData.amt} />
        </Form.Item>
        <Form.Item field="bill_type_id" label={'收支类型'} tooltip="可选填没有的字段">
          {/* @ts-ignore */}
          <Select
            placeholder={'请选择收支类型'}
            v-model={fromData.bill_type_id}
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
          {/* @ts-ignore */}
          <Textarea placeholder="备注" v-model={fromData.memo} allow-clear show-word-limit />
        </Form.Item>
      </Form>
    )
  }
})
