import type { PolicyQuery } from '@/api/list'
import useLocale from '@/hooks/locale'
import { LocaleOptions } from '@/types/constants'
import {
  Button,
  Card,
  Checkbox,
  Divider,
  Dropdown,
  Link,
  Popover,
  Space,
  Table,
  Tooltip,
  Upload,
  type FormInstance,
  type SelectOptionData
} from '@arco-design/web-vue'
import {
  IconDownload,
  IconDragArrow,
  IconLineHeight,
  IconPlus,
  IconSettings
} from '@arco-design/web-vue/es/icon'
import Sortable from 'sortablejs'
import { exchangeArray } from '@/utils/sort'
import { computed, defineComponent, ref, nextTick, type PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import styles from './style.module.scss'
import usePermission from '@/hooks/permission'
import { useTableSize } from '@/components/table-layout/useTableSize'
import { useTableStore } from '../tableStore'
import { storeToRefs } from 'pinia'

export default defineComponent({
  name: 'TableActionArea',
  emits: [],
  props: {},
  setup(props, { emit }) {
    const { t } = useI18n()
    const { currentLocale } = useLocale()
    const { checkButtonPermission } = usePermission()
    const { colList, tableSize } = storeToRefs(useTableStore())
    const { render: TableSizeRender } = useTableSize(tableSize)
    const TableActionButtons = () => []

    const TableSettings = () => []
    const popupVisibleChange = (val: boolean) => {
      if (val) {
        nextTick(() => {
          const el = document.getElementById('tableSetting') as HTMLElement
          new Sortable(el, {
            onEnd(e: any) {
              const { oldIndex, newIndex } = e
              exchangeArray(colList.value, oldIndex, newIndex)
            }
          })
        })
      }
    }
    return () => (
      <div class="flex justify-between mb-4">
        <Space>
          <Button
            v-slots={{
              icon: () => <IconPlus />
            }}
            type="primary"
          >
            {t('searchTable.operation.create')}
          </Button>
          <Upload action="/" showFileList={false}>
            {{
              'upload-button': () => <Button>{t('searchTable.operation.import')}</Button>
            }}
          </Upload>
        </Space>
        <Space size="medium">
          <Button
            v-slots={{
              icon: () => <IconDownload />
            }}
          >
            {t('searchTable.operation.download')}
          </Button>
          {TableSizeRender()}
          <Tooltip content={t('searchTable.actions.columnSetting')}>
            <Popover trigger="click" position="left" onPopupVisibleChange={popupVisibleChange}>
              {{
                content: () => (
                  <div id="tableSetting">
                    {colList.value.map((item) => (
                      <div class="w-32">
                        <Space>
                          <IconDragArrow class="cursor-move" />
                          <Checkbox v-model={item.checked} />
                          <div
                            class="text-ellipsis whitespace-nowrap  overflow-hidden w-20"
                            title={item.getTitle()}
                          >
                            {item.getTitle()}
                          </div>
                        </Space>
                      </div>
                    ))}
                  </div>
                ),
                default: () => <IconSettings size="18" class="cursor-pointer" />
              }}
            </Popover>
          </Tooltip>
        </Space>
      </div>
    )
  }
})
