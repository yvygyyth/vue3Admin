import useLocale from '@/hooks/locale'
import { LocaleOptions } from '@/types/constants'
import { Form, Grid, Input, RangePicker, Select, type SelectOptionData } from '@arco-design/web-vue'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useTableStore } from '../tableStore'
import { storeToRefs } from 'pinia'
export const useTableSearchForm = () => {
  const { t } = useI18n()
  const { currentLocale } = useLocale()
  const { searchQuery } = storeToRefs(useTableStore())

  const contentTypeOptions = computed<SelectOptionData[]>(() => [
    {
      label: t('searchTable.form.contentType.img'),
      value: 'img'
    },
    {
      label: t('searchTable.form.contentType.horizontalVideo'),
      value: 'horizontalVideo'
    },
    {
      label: t('searchTable.form.contentType.verticalVideo'),
      value: 'verticalVideo'
    }
  ])
  const filterTypeOptions = computed<SelectOptionData[]>(() => [
    {
      label: t('searchTable.form.filterType.artificial'),
      value: 'artificial'
    },
    {
      label: t('searchTable.form.filterType.rules'),
      value: 'rules'
    }
  ])
  const statusOptions = computed<SelectOptionData[]>(() => [
    {
      label: t('searchTable.form.status.online'),
      value: 'online'
    },
    {
      label: t('searchTable.form.status.offline'),
      value: 'offline'
    }
  ])

  const colSpan = computed(() => {
    if (currentLocale.value === LocaleOptions.en) return 12
    return 8
  })

  const formAttrs = {
    labelAlign: 'left',
    labelCol: { span: 6 },
    wrapperCol: { span: 18 }
  }

  const searchForm = (
    <Grid.Row gutter={8}>
      <Grid.Col span={colSpan.value}>
        <Form.Item field="hirer_keyword" label={'关键词'}>
          <Input v-model={searchQuery.value.hirer_keyword} placeholder={'请填写关键词'} />
        </Form.Item>
      </Grid.Col>
    </Grid.Row>
  )
  return {
    formAttrs,
    searchForm
  }
}
