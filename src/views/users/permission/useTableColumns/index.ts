import { ref } from 'vue'
import { PermissionTypeMap } from '@/api/permission'
import type { PermissionTree } from '@/api/permission'
import { useTableOperations } from '../useTableOperations'
import { formatDateTime } from '@/utils/format'

export const useTableColumns = () => {
    const { render: OperationsRender } = useTableOperations()
    
    const colList = ref([
        {
            title: 'ID',
            dataIndex: 'id',
            width: 80
        },
        {
            title: '权限代码',
            dataIndex: 'code',
            width: 200
        },
        {
            title: '权限名称',
            dataIndex: 'name',
            width: 200
        },
        {
            title: '权限类型',
            dataIndex: 'type',
            width: 100,
            render: ({ record }: { record: PermissionTree }) => {
                return PermissionTypeMap.get(record.type)
            }
        },
        {
            title: '请求方法',
            dataIndex: 'method',
            width: 100
        },
        {
            title: '路由',
            dataIndex: 'route',
            ellipsis: true,
            tooltip: true,
            width: 250
        },
        {
            title: '创建时间',
            dataIndex: 'created_at',
            width: 180,
            render: ({ record }: { record: PermissionTree }) => {
                return formatDateTime(record.created_at)
            }
        },
        {
            title: '操作',
            dataIndex: 'operations',
            width: 150,
            render: ({ record }: { record: PermissionTree }) => {
                return OperationsRender({ record })
            }
        }
    ])
    
    return {
        colList
    }
}
