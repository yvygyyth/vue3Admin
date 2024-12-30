import { useI18n } from 'vue-i18n'
import { Avatar, Badge, Link, Space, type TableData } from '@arco-design/web-vue'
import type { ColListType } from '@/components/table-layout/type'
import { TableOperations } from './TableOperations'
export const TableColumns = (): ColListType[] => {
  const { t } = useI18n()
  const { tableActionFilters, operations } = TableOperations()
  const colList: ColListType[] = [
    {
      getTitle: () => t('searchTable.columns.number'),
      dataIndex: 'number',
      checked: true
    },
    {
      getTitle: () => t('searchTable.columns.name'),
      dataIndex: 'name',
      checked: true
    },
    {
      getTitle: () => t('searchTable.columns.contentType'),
      dataIndex: 'contentType',
      render: ({ record }: { record: TableData }) => {
        const map: Record<TableData['contentType'], string> = {
          img: '//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/581b17753093199839f2e327e726b157.svg~tplv-49unhts6dw-image.image',
          horizontalVideo:
            '//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/77721e365eb2ab786c889682cbc721c1.svg~tplv-49unhts6dw-image.image',
          verticalVideo:
            '//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/ea8b09190046da0ea7e070d83c5d1731.svg~tplv-49unhts6dw-image.image'
        }
        return (
          <>
            <Space>
              <Avatar size={16} shape="square">
                <img alt="avatar" src={map[record.contentType]} />
              </Avatar>
              {t(`searchTable.form.contentType.${record.contentType}`)}
            </Space>
          </>
        )
      },
      checked: true
    },
    {
      getTitle: () => t('searchTable.columns.filterType'),
      dataIndex: 'filterType',
      render: ({ record }: { record: TableData }) => (
        <>{t(`searchTable.form.filterType.${record.filterType}`)}</>
      ),
      checked: true
    },
    {
      getTitle: () => t('searchTable.columns.count'),
      dataIndex: 'count',
      checked: true
    },
    {
      getTitle: () => t('searchTable.columns.createdTime'),
      dataIndex: 'createdTime',
      checked: true
    },
    {
      getTitle: () => t('searchTable.columns.status'),
      dataIndex: 'status',
      render: ({ record }: { record: TableData }) => {
        return (
          <Space>
            <Badge status={record.status === 'offline' ? 'danger' : 'success'}></Badge>
            {t(`searchTable.form.status.${record.status}`)}
          </Space>
        )
      },
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
