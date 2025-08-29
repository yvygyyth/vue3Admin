import { ref } from 'vue'
import type { softwareType } from '@/api/software'
import { useHandlers } from './useHandlers'

export const useTableOperations = () => {
    const { editOk, deleteOk } = useHandlers()
    const operations = ref([
        {
            permission: '编辑',
            render: ({ record }: { record: softwareType }) => {
                return <a-button 
                type="text" 
                onClick={() => editOk(record)}>编辑</a-button>
            }
        },
        {
            permission: '删除',
            render: ({ record }: { record: softwareType }) => {
                return (
                    <a-popconfirm 
                    content="确定删除吗？" 
                    onOk={() => deleteOk(record)}>
                        <a-button 
                        type="text" 
                        status="danger">删除</a-button>
                    </a-popconfirm>
                )
            }
        }
    ])

    const render = ({ record }: { record: softwareType }) => {
        return operations.value.map(item => {
            return item.render({ record })
        })
    }

    return {
        render
    }
}
