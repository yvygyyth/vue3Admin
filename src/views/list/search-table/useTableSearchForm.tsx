import useLocale from '@/hooks/locale'
import { LocaleOptions } from '@/types/constants'
import { Form, Grid, Input, RangePicker, Select, type SelectOptionData } from '@arco-design/web-vue'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useTableStore } from './tableStore'
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
        <Form.Item field="number" label={t('searchTable.form.number')}>
          <Input
            v-model={searchQuery.value.number}
            placeholder={t('searchTable.form.number.placeholder')}
          />
        </Form.Item>
      </Grid.Col>
      <Grid.Col span={colSpan.value}>
        <Form.Item field="name" label={t('searchTable.form.name')}>
          <Input
            v-model={searchQuery.value.name}
            placeholder={t('searchTable.form.name.placeholder')}
          />
        </Form.Item>
      </Grid.Col>
      <Grid.Col span={colSpan.value}>
        <Form.Item field="contentType" label={t('searchTable.form.contentType')}>
          <Select
            v-model={searchQuery.value.contentType}
            options={contentTypeOptions.value}
            placeholder={t('searchTable.form.contentType')}
          />
        </Form.Item>
      </Grid.Col>

      <Grid.Col span={colSpan.value}>
        <Form.Item field="filterType" label={t('searchTable.form.filterType')}>
          <Select
            v-model={searchQuery.value.filterType}
            options={filterTypeOptions.value}
            placeholder={t('searchTable.form.selectDefault')}
          />
        </Form.Item>
      </Grid.Col>
      <Grid.Col span={colSpan.value}>
        <Form.Item field="createdTime" label={t('searchTable.form.createdTime')}>
          <RangePicker class="w-full" v-model={searchQuery.value.createdTime} />
        </Form.Item>
      </Grid.Col>
      <Grid.Col span={colSpan.value}>
        <Form.Item field="status" label={t('searchTable.form.status')}>
          <Select
            v-model={searchQuery.value.status}
            options={statusOptions.value}
            placeholder={t('searchTable.form.selectDefault')}
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
