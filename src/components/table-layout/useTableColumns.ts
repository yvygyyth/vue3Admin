import { computed, type Ref } from 'vue'
import { type ColListType } from '@/components/table-layout/type'
import { type TableColumnData } from '@arco-design/web-vue'
export const useTableColumns = (colList: Ref<ColListType[]>) => {
  const tableColumns = computed(() =>
    colList.value
      .filter((col) => col.checked)
      .map((item) => {
        const { checked, ...rest } = item
        const ret: TableColumnData = {
          title: item.getTitle(),
          ...rest
        }
        return ret
      })
  )

  return {
    tableColumns
  }
}
