import type { PolicyQuery } from '@/api/list'
import useLocale from '@/hooks/locale'
import { exchangeArray } from '@/utils/sort'
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
    const { currentLocale } = useLocale()
    const { checkButtonPermission } = usePermission()
    const { colList, tableSize } = storeToRefs(useTableStore())
    const TableActionButtons = () => []

    const TableSettings = () => []

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
          <TableSizeSetting onSetTableSize={(size: TableSize) => (tableSize.value = size)} />
          <ColumnSettingPopover
            colList={colList.value}
            onExchangeArray={(e) => exchangeArray(colList.value, e.oldIndex, e.newIndex)}
          />
        </Space>
      </div>
    )
  }
})
