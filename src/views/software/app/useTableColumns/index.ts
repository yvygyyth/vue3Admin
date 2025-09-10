import { ref } from 'vue'
import type { softwareType } from '@/api/software'
import { useTableOperations } from '../useTableOperations'

export const useTableColumns = () => {
    const { render: OperationsRender } = useTableOperations()
    
    const colList = ref([
        {
            title: 'ID',
            dataIndex: 'id'
        },
        {
            title: '应用标识',
            dataIndex: 'app_key',
        },
        {
            title: '应用名称',
            dataIndex: 'name',
        },
        {
            title: '应用描述',
            dataIndex: 'description',
            ellipsis: true,
            tooltip: true,
            maxWidth: 300,
        },
        {
            title: '操作',
            dataIndex: 'operations',
            fixed: 'right',
            width: 160,
            render: ({ record }: { record: softwareType }) => {
                return OperationsRender({ record })
            }
        }
    ])
    
    return {
        colList
    }
}
