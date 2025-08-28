import { formatDateTime } from '@/utils/format'
import { ref } from 'vue'
import type { Version } from '@/api/software'
import { getSoftTypeList } from '@/api/software'
import { syncRequestRef } from '@/hooks/syncRequestRef'
import { useTableOperations } from '../useTableOperations'
export const useTableColumns = () => {
    const softTypeList = syncRequestRef(getSoftTypeList, [])

    const { render: OperationsRender } = useTableOperations()
    const colList = ref([
        {
            title: 'ID',
            dataIndex: 'id'
        },
        {
            title: '软件类型',
            dataIndex: 'app_id',
            render: ({ record }: { record: Version }) => softTypeList.value.find(item => item.id === record.app_id)?.name
        },
        {
            title: '版本',
            dataIndex: 'version',
        },
        {
            title: '下载地址',
            dataIndex: 'file_url',
        },
        {
            title: '更新内容',
            dataIndex: 'release_notes',
        },
        {
            title: '更新时间',
            dataIndex: 'created_at',
            render: ({ record }: { record: Version }) => formatDateTime(record.created_at)
        },
        {
            title: '操作',
            dataIndex: 'operations',
            render: ({ record }: { record: Version }) => {
                return OperationsRender({ record })
            }
        }
    ])
    
    return {
        colList
    }
}