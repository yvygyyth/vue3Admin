import { Button, Form, type FormInstance } from '@arco-design/web-vue'
import { IconRefresh, IconSearch } from '@arco-design/web-vue/es/icon'
import { defineComponent, ref, type PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import styles from './style.module.scss'
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
      type: Object as PropType<Record<string, any>>,
      required: true
    }
  },
  setup(props, { attrs, slots }) {
    const { t } = useI18n()

    const formRef = ref<FormInstance>()
    // 为resetSearchQuery添加重置表单状态事件
    props.events.on(EBE.resetSearchQuery, () => formRef.value?.resetFields())

    return () => (
      <div class="flex mb-3 pb-3">
        <Form ref={formRef} class={styles.form} model={props.searchQuery} {...attrs}>
          {slots}
        </Form>
        <div class={[styles['button-area']]}>
          <Button
            loading={props.loading}
            class="mb-5 w-22"
            type="primary"
            v-slots={{
              icon: () => <IconSearch />
            }}
            onClick={() => props.events.emit([EBE.resetPagination, EBE.fetchData])}
          >
            {t('searchTable.form.search')}
          </Button>
          <Button
            loading={props.loading}
            class="w-22"
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
