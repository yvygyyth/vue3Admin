import { ref } from 'vue'
import type { Secret } from '@/api/secret'
import { useHandlers } from './useHandlers.ts'

export const useTableOperations = () => {
    const { editOk } = useHandlers()
    const operations = ref([
        {
            permission: '编辑',
            render: ({ record }: { record: Secret }) => {
                return <a-button 
                type="text" 
                onClick={() => editOk(record)}>编辑</a-button>
            }
        }
    ])

    const render = ({ record }: { record: Secret }) => {
        return operations.value.map(item => {
            return item.render({ record })
        })
    }

    return {
        render
    }
}
