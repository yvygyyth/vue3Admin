import { ref } from 'vue'
import { useHandlers } from './useHandlers.tsx'
import { IconPlus, IconRefresh } from '@arco-design/web-vue/es/icon'

export const useTableActionArea = () => {

    const { addOk, refresh } = useHandlers()

    const tableActionButtons = ref([
        {
            render: () => (
                <a-button
                  v-slots={{
                    icon: () => <IconPlus />
                  }}
                  onClick={addOk}
                  type="primary"
                >
                  新增权限
                </a-button>
            )
        }
        
    ])

    const tableActionArea = ref([
        {
            render: () => (
                <a-button
                  v-slots={{
                    icon: () => <IconRefresh />
                  }}
                  onClick={refresh}
                >
                  刷新
                </a-button>
            )
        }

    ])

    const render = () => {
        return (
            <a-row justify="space-between">
                {tableActionButtons.value.map(item => {
                    return item.render()
                })}
                {tableActionArea.value.map(item => {
                    return item.render()
                })}
            </a-row>
        )
    }

    return {
        render
    }
}
