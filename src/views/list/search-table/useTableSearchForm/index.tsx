import useLocale from '@/hooks/locale'
import { LocaleOptions } from '@/types/constants'
import { Form, Grid, Input, RangePicker, Select, type SelectOptionData } from '@arco-design/web-vue'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useTableStore } from '../tableStore'
import { storeToRefs } from 'pinia'
import { createRangeComputed } from '@/utils/ref'
import { cacheData } from '@/hooks/useCacheData'
import { CDK } from '@/hooks/useCacheData/type'
export const useTableSearchForm = () => {
  const { t } = useI18n()
  const { currentLocale } = useLocale()
  const { searchQuery } = storeToRefs(useTableStore())

  const colSpan = computed(() => {
    if (currentLocale.value === LocaleOptions.en) return 12
    return 8
  })

  const formAttrs = {
    labelAlign: 'left',
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
  }

  const searchForm = (
    <Grid.Row gutter={8}>
      <Grid.Col span={colSpan.value}>
        <Form.Item field="hirer_keyword" label={'关键词'}>
          <Input v-model={searchQuery.value.hirer_keyword} placeholder={'请填写关键词'} />
        </Form.Item>
      </Grid.Col>
      <Grid.Col span={8}>
        <Form.Item field="bill_type_id" label={'收支类型'}>
          <Select
            placeholder={'请选择收支类型'}
            v-model={searchQuery.value.bill_type_id}
            allow-search
            allow-clear
          >
            {cacheData(CDK.costTypeList).value.map((option: SelectOptionData) => (
              <Select.Option key={option.label} value={option.value}>
                {option.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Grid.Col>
      <Grid.Col span={8} offset={0}>
        <Form.Item field="start_time" label={'时间范围'}>
          <a-range-picker
            showTime
            time-picker-props={{
              defaultValue: ['00:00:00', '00:00:00']
            }}
            value-format="timestamp"
            v-model={createRangeComputed(searchQuery.value, 'start_time', 'end_time').value}
          />
        </Form.Item>
      </Grid.Col>
    </Grid.Row>
  )
  return {
    formAttrs,
    searchForm
  }
}
