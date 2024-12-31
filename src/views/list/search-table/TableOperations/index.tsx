import usePermission from '@/hooks/permission'
import { type TableData } from '@arco-design/web-vue'
import type { PermissionRender } from '@/hooks/permission'
import { useHandlers } from './useHandlers'
export const TableOperations = () => {
  const { checkButtonPermission } = usePermission()
  const { editOk, deleteOk } = useHandlers()
  const operations: PermissionRender[] = [
    {
      permission: '*',
      render: (record: TableData) => <a-link onClick={() => editOk(record)}>{'编辑'}</a-link>
    },
    {
      permission: '*',
      render: (record: TableData) => (
        <a-popconfirm content={'确定删除？'} on-before-ok={() => deleteOk(record)}>
          <a-link>{'删除'}</a-link>
        </a-popconfirm>
      )
    }
  ]

  const tableActionFilters = (items: PermissionRender[], record: TableData) => {
    return items
      .filter((item) => checkButtonPermission(item.permission))
      .map((item) => item.render(record))
  }

  return {
    tableActionFilters,
    operations
  }
}
