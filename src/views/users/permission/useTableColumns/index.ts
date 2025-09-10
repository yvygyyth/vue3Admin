import { ref } from 'vue'
import { PermissionTypeMap, AccessLevelMap } from '@/api/permission'
import type { PermissionTree } from '@/api/permission'
import { useTableOperations } from '../useTableOperations'
import { formatDateTime } from '@/utils/format'

export const useTableColumns = () => {
    const { render: OperationsRender } = useTableOperations()
    
    const colList = ref([
        {
            title: 'ID',
            dataIndex: 'id'
        },
        {
            title: '权限代码',
            dataIndex: 'code'
        },
        {
            title: '权限名称',
            dataIndex: 'name'
        },
        {
            title: '权限类型',
            dataIndex: 'type',
            render: ({ record }: { record: PermissionTree }) => {
                return PermissionTypeMap.get(record.type)
            }
        },
        {
            title: '请求方法',
            dataIndex: 'method'
        },
        {
            title: '路由',
            dataIndex: 'route',
            ellipsis: true,
            tooltip: true
        },
        {
            title: '是否公开',
            dataIndex: 'access_level',
            render: ({ record }: { record: PermissionTree }) => {
                return AccessLevelMap.get(record.access_level)
            }
        },
        {
            title: '创建时间',
            dataIndex: 'created_at',
            render: ({ record }: { record: PermissionTree }) => {
                return formatDateTime(record.created_at)
            }
        },
        {
            title: '操作',
            dataIndex: 'operations',
            fixed: 'right',
            width: 160,
            render: ({ record }: { record: PermissionTree }) => {
                return OperationsRender({ record })
            }
        }
    ])
    
    return {
        colList
    }
}
