import { ref } from 'vue'
import type { RoleWithPermissions } from '@/api/role'
import { useHandlers } from './useHandlers.ts'

export const useTableOperations = () => {
    const { editOk, deleteOk } = useHandlers()
    const operations = ref([
        {
            permission: '编辑',
            render: ({ record }: { record: RoleWithPermissions }) => {
                return <a-button 
                type="text" 
                onClick={() => editOk(record)}>编辑</a-button>
            }
        },
        {
            permission: '删除',
            render: ({ record }: { record: RoleWithPermissions }) => {
                return (
                    <a-popconfirm 
                    content={`确定要删除角色"${record.name}"吗？`}
                    onOk={() => deleteOk(record)}>
                        <a-button 
                        type="text" 
                        status="danger">删除</a-button>
                    </a-popconfirm>
                )
            }
        }
    ])

    const render = ({ record }: { record: RoleWithPermissions }) => {
        return operations.value.map(item => {
            return item.render({ record })
        })
    }

    return {
        render
    }
}
