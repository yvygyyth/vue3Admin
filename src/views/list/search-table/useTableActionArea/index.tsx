import { exchangeArray } from '@/utils/sort'
import { Button, Upload } from '@arco-design/web-vue'
import { IconDownload, IconPlus } from '@arco-design/web-vue/es/icon'
import type { PermissionRender } from '@/hooks/permission'
import { useI18n } from 'vue-i18n'
import TableSizeSetting from '@/components/table-layout/ui/TableSizeSetting'
import ColumnSettingPopover from '@/components/table-layout/ui/ColumnSettingPopover'
import type { TableSize } from '@/components/table-layout/type'
import { useTableStore } from '../tableStore'
import { storeToRefs } from 'pinia'
import { useHandlers } from './useHandlers'
export const useTableActionArea = () => {
  const { t } = useI18n()
  const { colList, tableSize } = storeToRefs(useTableStore())
  const { addOk } = useHandlers()

  const TableActionButtons: PermissionRender[] = [
    {
      permission: '*',
      render: () => (
        <Button
          v-slots={{
            icon: () => <IconPlus />
          }}
          onClick={addOk}
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

  const TableSettings: PermissionRender[] = [
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

  return {
    TableActionButtons,
    TableSettings
  }
}
