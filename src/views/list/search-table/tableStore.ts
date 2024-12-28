import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'
import { type TableColumnData } from '@arco-design/web-vue'
import { type TableSize } from '@/components/table-layout/useTableSize'
interface ColListType extends TableColumnData {
  getTitle: () => string
  checked: boolean
}

interface TableStoreState {
  tableSize: Ref<TableSize>
  colList: Ref<ColListType[]>
}

export const useTableStore = defineStore('table', (): TableStoreState => {
  // 尺寸
  const tableSize = ref<TableSize>('medium')
  // 列表项
  const colList = ref<ColListType[]>([])

  return {
    tableSize,
    colList
  }
})
