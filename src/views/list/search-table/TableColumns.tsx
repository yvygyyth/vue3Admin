import { useI18n } from 'vue-i18n'
import { computed, defineComponent, nextTick, ref } from 'vue'
import { Avatar, Badge, Link, Space, type TableColumnData } from '@arco-design/web-vue'
import { queryPolicyList, type PolicyQuery, type PolicyRecord } from '@/api/list'
export const TableColumns = () => {
  const { t } = useI18n()
  const colList = ref([
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
      render: ({ record }: { record: PolicyRecord }) => {
        const map: Record<PolicyRecord['contentType'], string> = {
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
      render: ({ record }: { record: PolicyRecord }) => (
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
      render: ({ record }: { record: PolicyRecord }) => {
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
      render: () => <Link>{t('searchTable.columns.operations.view')}</Link>,
      checked: true
    }
  ])

  const tableColumns = computed(() => {
    return colList.value
      .filter((col) => col.checked)
      .map((item) => {
        const ret: TableColumnData = {
          title: item.getTitle(),
          dataIndex: item.dataIndex
        }
        if (item.render) ret.render = item.render as unknown as TableColumnData['render']
        return ret
      })
  })
  return {
    colList,
    tableColumns
  }
}
