import { formatDateTime } from '@/utils/format'
import { ref } from 'vue'

export const useTableColumns = () => {

    const colList = ref([
        {
            title: '序号',
            dataIndex: 'index',
            align: 'center',
            render: ({ rowIndex }: { rowIndex: number }) => rowIndex + 1
        },
        {
            title: '交易所',
            dataIndex: 'exchange',
            align: 'center'
        },
        {
            title: '交易对',
            dataIndex: 'trading_pair',
            align: 'center'
        },

        {
            title: '收益类型',
            dataIndex: 'profit_type',
            align: 'center'
        },
        {
            title: '订单类型',
            dataIndex: 'order_type',
            align: 'center'
        },
        {
            title: '结单时间',
            dataIndex: 'settlement_time',
            align: 'center',
            render: ({ record }: { record: any }) => formatDateTime(record.settlement_time)
        }
    ])
    
    return {
        colList
    }
}