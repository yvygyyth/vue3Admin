import { ref } from 'vue'
import type { PermissionTree } from '@/api/permission'
import { useTableOperations } from '../useTableOperations'

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
                const typeMap: Record<number, string> = {
                    1: '菜单',
                    2: '按钮',
                    3: '接口'
                }
                return typeMap[record.type] || '未知'
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
                return new Date(record.created_at * 1000).toLocaleString()
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
