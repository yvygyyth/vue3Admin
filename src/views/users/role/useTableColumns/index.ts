import { ref } from 'vue'
import type { RoleWithPermissions } from '@/api/role'
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
            title: '角色名称',
            dataIndex: 'name',
            ellipsis: true,
            tooltip: true
        },
        {
            title: '角色描述',
            dataIndex: 'description',
            ellipsis: true,
            tooltip: true
        },
        {
            title: '权限数量',
            dataIndex: 'permissionIds',
            render: ({ record }: { record: RoleWithPermissions }) => {
                return record.permissionIds?.length || 0
            }
        },
        {
            title: '创建时间',
            dataIndex: 'created_at',
            render: ({ record }: { record: RoleWithPermissions }) => {
                return formatDateTime(record.created_at)
            }
        },
        {
            title: '操作',
            dataIndex: 'operations',
            fixed: 'right',
            width: 160,
            render: ({ record }: { record: RoleWithPermissions }) => {
                return OperationsRender({ record })
            }
        }
    ])
    
    return {
        colList
    }
}
