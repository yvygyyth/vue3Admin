import { Space } from '@arco-design/web-vue'
import type { PermissionRender } from '@/hooks/permission'
import { defineComponent, type PropType } from 'vue'
import usePermission from '@/hooks/permission'

export default defineComponent({
  name: 'TableActionArea',
  props: {
    TableActionButtons: {
      type: Array as PropType<PermissionRender[]>,
      default: () => []
    },
    TableSettings: {
      type: Array as PropType<PermissionRender[]>,
      default: () => []
    }
  },
  setup(props) {
    const { checkButtonPermission } = usePermission()
    const filterAndRenderItems = (items: PermissionRender[]) => {
      return items
        .filter((item) => checkButtonPermission(item.permission))
        .map((item) => item.render())
    }

    return () => (
      <div class="flex justify-between mb-4">
        <Space>{filterAndRenderItems(props.TableActionButtons)}</Space>
        <Space size="medium">{filterAndRenderItems(props.TableSettings)}</Space>
      </div>
    )
  }
})
