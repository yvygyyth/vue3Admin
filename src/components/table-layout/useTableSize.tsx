import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { Dropdown, Tooltip } from '@arco-design/web-vue'
import { IconLineHeight } from '@arco-design/web-vue/es/icon'
export const useTableSize = () => {
  const { t } = useI18n()
  type TableSize = 'medium' | 'mini' | 'small' | 'large'
  const tableSize = ref<TableSize>('medium')
  const densityList = computed(() => [
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
  ])
  const handleSelectDensity = (val: unknown) => {
    tableSize.value = val as TableSize
  }

  const render = () => {
    return (
      <Dropdown onSelect={handleSelectDensity}>
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
  return {
    tableSize,
    render
  }
}
