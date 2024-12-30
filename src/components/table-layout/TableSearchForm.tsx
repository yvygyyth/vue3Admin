import type { PolicyQuery } from '@/api/list'
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
import { storeToRefs } from 'pinia'
import { EBE } from '@/components/table-layout/EventBusEnum'
import EventBus from '@/hooks/useEventBus'
export default defineComponent({
  name: 'TableSearchForm',
  props: {
    events: {
      type: Object as PropType<EventBus>,
      required: true
    },
    loading: {
      type: Boolean,
      required: true
    },
    searchQuery: {
      type: Object as PropType<PolicyQuery>,
      required: true
    }
  },
  setup(props, { attrs, slots }) {
    const { t } = useI18n()

    const formRef = ref<FormInstance>()
    // 为resetSearchQuery添加重置表单状态事件
    props.events.on(EBE.resetSearchQuery, () => formRef.value?.resetFields())

    return () => (
      <div class="flex">
        <Form ref={formRef} class={styles.form} model={props.searchQuery} {...attrs}>
          {slots}
        </Form>
        <div class={[styles['button-area']]}>
          <Button
            loading={props.loading}
            class="mb-5"
            type="primary"
            v-slots={{
              icon: () => <IconSearch />
            }}
            onClick={() => props.events.emit([EBE.resetSearchQuery, EBE.fetchData])}
          >
            {t('searchTable.form.search')}
          </Button>
          <Button
            loading={props.loading}
            onClick={() =>
              props.events.emit([EBE.resetPagination, EBE.resetSearchQuery, EBE.fetchData])
            }
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
