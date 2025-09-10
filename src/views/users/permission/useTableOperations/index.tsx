import { ref } from 'vue'
import type { PermissionTree } from '@/api/permission'
import { PermissionType } from '@/api/permission/enum'
import { useHandlers } from './useHandlers.ts'

export const useTableOperations = () => {
    const { editOk, deleteOk, addChildOk } = useHandlers()
    const operations = ref([
        {
            permission: '编辑',
            render: ({ record }: { record: PermissionTree }) => {
                return <a-button 
                type="text" 
                onClick={() => editOk(record)}>编辑</a-button>
            }
        },
        {
            permission: '删除',
            render: ({ record }: { record: PermissionTree }) => {
                return (
                    <a-popconfirm 
                    content="确定删除该权限吗？删除后子权限也会被删除！" 
                    onOk={() => deleteOk(record)}>
                        <a-button 
                        type="text" 
                        status="danger">删除</a-button>
                    </a-popconfirm>
                )
            }
        },
        {
            permission: '新增子权限',
            render: ({ record }: { record: PermissionTree }) => {
                return <a-button 
                type="text" 
                onClick={() => addChildOk(record)}>新增子权限</a-button>
            }
        }
    ])

    const render = ({ record }: { record: PermissionTree }) => {
        return operations.value.map(item => {
            if (item.permission === '删除' && record.type === PermissionType.API) {
                return null
            }
            return item.render({ record })
        })
    }

    return {
        render
    }
}
