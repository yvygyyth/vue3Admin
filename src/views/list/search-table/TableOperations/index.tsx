import usePermission from '@/hooks/permission'
import { Message, type TableData } from '@arco-design/web-vue'
import type { PermissionRender } from '@/hooks/permission'
import { EBE } from '@/components/table-layout/EventBusEnum'
import { TableEventBus } from '../tableStore'
export const TableOperations = () => {
  const { checkButtonPermission } = usePermission()
  const events = new TableEventBus()
  const deleteOk = async (record: TableData) => {
    try {
      await Promise.resolve()
      Message.success('删除成功')
      events.emit(EBE.handleQuerySearch)
      return true
    } catch (e) {
      return false
    }
  }
  const operations: PermissionRender[] = [
    {
      permission: '*',
      render: (record: TableData) => (
        <a-popconfirm content={'确定删除？'} on-before-ok={() => deleteOk(record)}>
          <a-link>{'删除'}</a-link>
        </a-popconfirm>
      )
    }
  ]

  const filterTableOperations = (items: PermissionRender[], record: TableData) => {
    return items
      .filter((item) => checkButtonPermission(item.permission))
      .map((item) => item.render(record))
  }

  return {
    filterTableOperations,
    operations
  }
}
