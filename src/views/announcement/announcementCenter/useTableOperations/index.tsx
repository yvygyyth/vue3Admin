import { ref } from 'vue'
import type { Announcement } from '@/api/announcement'
import { useHandlers } from './useHandlers'

export const useTableOperations = () => {
    const { viewDetail, deleteOk } = useHandlers()
    const operations = ref([
        {
            permission: '查看',
            render: ({ record }: { record: Announcement }) => {
                return <a-button 
                type="text" 
                onClick={() => viewDetail(record)}>详情</a-button>
            }
        },
        {
            permission: '删除',
            render: ({ record }: { record: Announcement }) => {
                return (
                    <a-popconfirm 
                    content="确定删除这条公告吗？" 
                    onOk={() => deleteOk(record)}>
                        <a-button 
                        type="text" 
                        status="danger">删除</a-button>
                    </a-popconfirm>
                )
            }
        }
    ])

    const render = ({ record }: { record: Announcement }) => {
        return operations.value.map(item => {
            return item.render({ record })
        })
    }

    return {
        render
    }
}
