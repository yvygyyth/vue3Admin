import { useI18n } from 'vue-i18n'
import { Avatar, Badge, Link, Space, type TableData } from '@arco-design/web-vue'
import type { ColListType } from '@/components/table-layout/type'
import { TableOperations } from '../TableOperations'
import { formatDate } from '@/utils/timer'
import { cacheData } from '@/hooks/useCacheData'
import { getLabelByValue } from '@/utils'
export const TableColumns = (): ColListType[] => {
  const { t } = useI18n()
  const { tableActionFilters, operations } = TableOperations()
  const colList: ColListType[] = [
    {
      getTitle: () => '日期',
      render: ({ record }: { record: TableData }) => <>{formatDate(record.created_at)}</>,
      checked: true
    },
    {
      getTitle: () => '收支类型',
      dataIndex: 'bill_type_id',
      render: ({ record }: { record: TableData }) => (
        <>{getLabelByValue(cacheData('costTypeList').value, record.bill_type_id)}</>
      ),
      checked: true
    },
    {
      getTitle: () => '收支金额',
      dataIndex: 'amt',
      render: ({ record }: { record: TableData }) => <>￥{record.amt}</>,
      checked: true
    },
    {
      getTitle: () => '备注',
      render: ({ record }: { record: TableData }) => (
        <a-popover title="备注">
          {{
            default: () => (
              <div>
                <a-tag>
                  <div class="text-ellipsis" style={'max-width: 200px'}>
                    {record.memo || '备注'}
                  </div>
                </a-tag>
              </div>
            ),
            content: () => (
              <>
                <p>{record.memo || '空'}</p>
              </>
            )
          }}
        </a-popover>
      ),
      checked: true
    },
    {
      getTitle: () => t('searchTable.columns.operations'),
      dataIndex: 'operations',
      render: ({ record }: { record: TableData }) => tableActionFilters(operations, record),
      checked: true
    }
  ]
  return colList
}
