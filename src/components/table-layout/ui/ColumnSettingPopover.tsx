import { defineComponent, nextTick, type PropType } from 'vue'
import { Tooltip, Popover, Checkbox, Space } from '@arco-design/web-vue'
import { IconDragArrow, IconSettings } from '@arco-design/web-vue/es/icon'
import { useI18n } from 'vue-i18n'
import Sortable from 'sortablejs'
import { exchangeArray } from '@/utils/sort'
import { type ColListType } from '@/components/table-layout/type'

export default defineComponent({
  name: 'ColumnSettingPopover',
  props: {
    colList: {
      type: Array as PropType<ColListType[]>,
      required: true
    }
  },
  emits: ['exchangeArray'],
  setup(props, { emit }) {
    const { t } = useI18n()

    const popupVisibleChange = (val: boolean) => {
      if (val) {
        nextTick(() => {
          const el = document.getElementById('tableSetting') as HTMLElement
          new Sortable(el, {
            onEnd(e: any) {
              emit('exchangeArray', e)
              // const { oldIndex, newIndex } = e
              // exchangeArray(props.colList, oldIndex, newIndex)
            }
          })
        })
      }
    }

    return () => (
      <Tooltip content={t('searchTable.actions.columnSetting')}>
        <Popover trigger="click" position="left" onPopupVisibleChange={popupVisibleChange}>
          {{
            default: () => <IconSettings size={18} class="cursor-pointer" />,
            content: () => (
              <div id="tableSetting">
                {props.colList.map((item, index) => (
                  <div key={index} class="w-32">
                    <Space>
                      <IconDragArrow class="cursor-move" />
                      <Checkbox v-model={item.checked} />
                      <div
                        class="text-ellipsis whitespace-nowrap overflow-hidden w-20"
                        title={item.getTitle()}
                      >
                        {item.getTitle()}
                      </div>
                    </Space>
                  </div>
                ))}
              </div>
            )
          }}
        </Popover>
      </Tooltip>
    )
  }
})
