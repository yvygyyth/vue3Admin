import { ref } from 'vue'
import type { User } from '@/api/account/index.ts'
import { useHandlers } from './useHandlers.ts'

export const useTableOperations = () => {
    const { editOk, deleteOk, setRolesOk } = useHandlers()
    const operations = ref([
        {
            permission: '编辑',
            render: ({ record }: { record: User }) => {
                return <a-button 
                type="text" 
                onClick={() => editOk(record)}>编辑</a-button>
            }
        },
        {
            permission: '设置角色',
            render: ({ record }: { record: User }) => {
                return <a-button 
                type="text" 
                onClick={() => setRolesOk(record)}>设置角色</a-button>
            }
        },
        {
            permission: '删除',
            render: ({ record }: { record: User }) => {
                return (
                    <a-popconfirm 
                    content={`确定要删除用户"${record.account}"吗？`}
                    onOk={() => deleteOk(record)}>
                        <a-button 
                        type="text" 
                        status="danger">删除</a-button>
                    </a-popconfirm>
                )
            }
        }
    ])

    const render = ({ record }: { record: User }) => {
        return operations.value.map(item => {
            return item.render({ record })
        })
    }

    return {
        render
    }
}
