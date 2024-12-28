import { computed, defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { Dropdown, Tooltip } from '@arco-design/web-vue'
import { IconLineHeight } from '@arco-design/web-vue/es/icon'
import { type TableSize } from '@/components/table-layout/type'

export default defineComponent({
  name: 'TableSizeSetting',
  emits: ['setTableSize'],
  props: {
    tableSize: {
      type: String,
      default: 'medium'
    }
  },
  setup(props, { emit }) {
    const { t } = useI18n()
    const densityList = computed(
      (): Array<{ name: string; value: TableSize }> => [
        {
          name: t('searchTable.size.mini'),
          value: 'mini'
        },
        {
          name: t('searchTable.size.small'),
          value: 'small'
        },
        {
          name: t('searchTable.size.medium'),
          value: 'medium'
        },
        {
          name: t('searchTable.size.large'),
          value: 'large'
        }
      ]
    )
    const handleSelectDensity = (val: TableSize) => {
      emit('setTableSize', val)
    }

    return () => {
      return (
        <Dropdown onSelect={(val) => handleSelectDensity(val as TableSize)}>
          {{
            default: () => (
              <Tooltip content={t('searchTable.actions.density')}>
                <IconLineHeight class="cursor-pointer" size="18" />
              </Tooltip>
            ),
            content: () =>
              densityList.value.map((item) => (
                <Dropdown.Option value={item.value}>
                  <span>{item.name}</span>
                </Dropdown.Option>
              ))
          }}
        </Dropdown>
      )
    }
  }
})
