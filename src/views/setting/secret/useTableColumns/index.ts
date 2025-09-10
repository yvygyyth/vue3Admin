import { ref } from 'vue'
import type { Secret } from '@/api/secret'
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
            title: '密钥名称',
            dataIndex: 'key',
            ellipsis: true,
            tooltip: true
        },
        {
            title: '描述',
            dataIndex: 'description',
            ellipsis: true,
            tooltip: true
        },
        // {
        //     title: '创建时间',
        //     dataIndex: 'created_at',
        //     render: ({ record }: { record: Secret }) => {
        //         return formatDateTime(record.created_at)
        //     }
        // },
        {
            title: '更新时间',
            dataIndex: 'updated_at',
            render: ({ record }: { record: Secret }) => {
                return formatDateTime(record.updated_at)
            }
        },
        {
            title: '操作',
            dataIndex: 'operations',
            fixed: 'right',
            width: 160,
            render: ({ record }: { record: Secret }) => {
                return OperationsRender({ record })
            }
        }
    ])
    
    return {
        colList
    }
}

