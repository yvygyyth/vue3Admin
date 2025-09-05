import { ref } from 'vue'
import { useHandlers } from './useHandlers.tsx'
import { IconPlus } from '@arco-design/web-vue/es/icon'

export const useTableActionArea = () => {

    const { addOk } = useHandlers()

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

    const render = () => {
        return tableActionButtons.value.map(item => {
            return item.render()
        })
    }

    return {
        render
    }
}
