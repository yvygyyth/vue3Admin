import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'
import type { ColListType, TableSize } from '@/components/table-layout/type'
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
