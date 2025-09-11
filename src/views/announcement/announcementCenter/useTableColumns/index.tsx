import { TableColumnData } from '@arco-design/web-vue'
import { AnnouncementTypeMap, ExchangeCodeName, type Announcement } from '@/api/announcement'
import { formatDateTimeMillis } from '@/utils/format'
import { computed, ref } from 'vue'
import { useTableOperations } from '../useTableOperations'

export const useTableColumns = () => {
    const { render: OperationsRender } = useTableOperations()
    const colList = ref<TableColumnData<Announcement>[]>([
        {
            title: 'ID',
            dataIndex: 'id'

        },
        {
            title: '交易所',
            dataIndex: 'exchange_code',
            render: ({ record }: { record: Announcement }) => {
                return ExchangeCodeName.get(record.exchange_code)
            }
        },
        {
            title: '类型',
            dataIndex: 'type',
            render: ({ record }: { record: Announcement }) => {
                return AnnouncementTypeMap.get(record.type)
            }
        },
        {
            title: '标题',
            dataIndex: 'title_zh',
            ellipsis: true,
            tooltip: true,
            width: 300,
            render: ({ record }: { record: Announcement }) => {
                return record.title_zh || record.title
            }
        },
        {
            title: '描述',
            dataIndex: 'description',
            width: 300,
            ellipsis: true,
            tooltip: true,
        },
        {
            title: '网址',
            width: 200,
            dataIndex: 'url',
            ellipsis: true,
            tooltip: true,
            render: ({ record }: { record: Announcement }) => {
                return <a href={record.url} target="_blank">{record.url}</a>
            }
        },
        {
            title: '发布时间',
            dataIndex: 'publish_time',
            render: ({ record }: { record: Announcement }) => formatDateTimeMillis(record.publish_time)
        },
        {
            title: '抓取时间',
            dataIndex: 'fetch_time',
            render: ({ record }: { record: Announcement }) => formatDateTimeMillis(record.fetch_time)
        },
        {
            title: '操作',
            dataIndex: 'operations',
            fixed: 'right',
            width: 160,
            render: ({ record }: { record: Announcement }) => {
                return OperationsRender({ record })
            }
        }
    ])
    
    return {
        colList
    }
}