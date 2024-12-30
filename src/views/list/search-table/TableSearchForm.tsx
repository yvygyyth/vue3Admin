import type { PolicyQuery } from '@/api/list'
import useLocale from '@/hooks/locale'
import { LocaleOptions } from '@/types/constants'
import {
  Button,
  Form,
  Grid,
  Input,
  RangePicker,
  Select,
  type FormInstance,
  type SelectOptionData
} from '@arco-design/web-vue'
import { IconRefresh, IconSearch } from '@arco-design/web-vue/es/icon'
import { computed, defineComponent, ref, type PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import styles from './style.module.scss'
import { useTableStore, TableEventBus } from './tableStore'
import { storeToRefs } from 'pinia'
import { EBE } from '@/components/table-layout/EventBusEnum'
export default defineComponent({
  name: 'TableSearchForm',
  emits: ['onSearch'],
  setup(props, { emit }) {
    const { t } = useI18n()
    const { currentLocale } = useLocale()
    const events = new TableEventBus()
    const { loading, searchQuery } = storeToRefs(useTableStore())

    const formRef = ref<FormInstance>()
    events.on(EBE.resetSearchQuery, () => {
      formRef.value?.resetFields()
    })

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
    return () => (
      <div class="flex">
        <Form
          ref={formRef}
          class={styles.form}
          model={searchQuery.value}
          labelAlign="left"
          labelColProps={{
            span: 5
          }}
          wrapperColProps={{
            span: 19
          }}
        >
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
        </Form>
        <div class={[styles['button-area']]}>
          <Button
            loading={loading.value}
            class="mb-5"
            type="primary"
            v-slots={{
              icon: () => <IconSearch />
            }}
            onClick={() => emit('onSearch')}
          >
            {t('searchTable.form.search')}
          </Button>
          <Button
            loading={loading.value}
            onClick={() => {
              events.emit(EBE.resetSearchQuery)
              emit('onSearch')
            }}
            v-slots={{
              icon: () => <IconRefresh />
            }}
          >
            {t('searchTable.form.reset')}
          </Button>
        </div>
      </div>
    )
  }
})
