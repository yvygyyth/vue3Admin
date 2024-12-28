import { exchangeArray } from '@/utils/sort'
import { Button, Space, Upload } from '@arco-design/web-vue'
import {
  IconDownload,
  IconDragArrow,
  IconLineHeight,
  IconPlus,
  IconSettings
} from '@arco-design/web-vue/es/icon'

import { computed, defineComponent, ref, nextTick, type PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import styles from './style.module.scss'
import usePermission from '@/hooks/permission'
import TableSizeSetting from '@/components/table-layout/ui/TableSizeSetting'
import ColumnSettingPopover from '@/components/table-layout/ui/ColumnSettingPopover'
import type { TableSize } from '@/components/table-layout/type'
import { useTableStore } from '../tableStore'
import { storeToRefs } from 'pinia'

export default defineComponent({
  name: 'TableActionArea',
  emits: [],
  props: {},
  setup(props, { emit }) {
    const { t } = useI18n()
    const { checkButtonPermission } = usePermission()
    const { colList, tableSize } = storeToRefs(useTableStore())

    const TableActionButtons = [
      {
        permission: '*',
        render: () => (
          <Button
            v-slots={{
              icon: () => <IconPlus />
            }}
            type="primary"
          >
            {t('searchTable.operation.create')}
          </Button>
        )
      },
      {
        permission: '*',
        render: () => (
          <Upload action="/" showFileList={false}>
            {{
              'upload-button': () => <Button>{t('searchTable.operation.import')}</Button>
            }}
          </Upload>
        )
      }
    ]

    const TableSettings = [
      {
        permission: '*',
        render: () => (
          <Button
            v-slots={{
              icon: () => <IconDownload />
            }}
          >
            {t('searchTable.operation.download')}
          </Button>
        )
      },
      {
        permission: '*',
        render: () => (
          <TableSizeSetting onSetTableSize={(size: TableSize) => (tableSize.value = size)} />
        )
      },
      {
        permission: '*',
        render: () => (
          <ColumnSettingPopover
            colList={colList.value}
            onExchangeArray={(e) => exchangeArray(colList.value, e.oldIndex, e.newIndex)}
          />
        )
      }
    ]

    const renderItems = (items: any[]) => {
      return items
        .filter((item) => checkButtonPermission(item.permission))
        .map((item) => item.render())
    }

    return () => (
      <div class="flex justify-between mb-4">
        <Space>{renderItems(TableActionButtons)}</Space>
        <Space size="medium">{renderItems(TableSettings)}</Space>
      </div>
    )
  }
})
