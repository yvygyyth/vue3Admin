import { ref, computed } from 'vue'
import LoadingButton from '@/components/LoadingButton/index.vue'
import { useHandlers } from './useHandlers'
import { IconPlus } from '@arco-design/web-vue/es/icon'

export const useTableActionArea = () => {

    const { addOk } = useHandlers()

    const tableActionButtons = ref([
        {
            render: () => (
                <LoadingButton
                  v-slots={{
                    icon: () => <IconPlus />
                  }}
                  onClick={addOk}
                  type="primary"
                >
                  新增
                </LoadingButton>
            )
        }
        
    ])

    const ActionAreaRender = () => {
        return tableActionButtons.value.map(item => {
            return item.render()
        })
    }

    return {
        ActionAreaRender
    }
}
