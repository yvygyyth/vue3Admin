import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'
import type { ColListType, TableSize } from '@/components/table-layout/type'
import { queryPolicyList, type PolicyQuery, type PolicyRecord } from '@/api/list'
import EventBus from '@/hooks/useEventBus'
import { singleton } from '@/hooks/singleton'
import { EBE } from '@/components/table-layout/EventBusEnum'
// 默认的查询对象
const defaultSearchQuery: PolicyQuery = {
  number: '',
  name: '',
  contentType: '',
  filterType: '',
  createdTime: [],
  status: ''
}

interface TableStoreState {
  tableSize: Ref<TableSize>
  colList: Ref<ColListType[]>
  searchQuery: Ref<PolicyQuery>
}

export const TableEventBus = singleton(EventBus)

export const useTableStore = defineStore('table', (): TableStoreState => {
  const events = new TableEventBus()
  // 尺寸
  const tableSize = ref<TableSize>('medium')

  // 列表项
  const colList = ref<ColListType[]>([])

  // 查询项，使用默认值
  const searchQuery = ref<PolicyQuery>({ ...defaultSearchQuery }) // 使用默认值初始化

  // 重置查询项
  function $resetSearchQuery() {
    searchQuery.value = { ...defaultSearchQuery } // 直接赋值默认值
  }
  events.on(EBE.fetchData, $resetSearchQuery)

  return {
    tableSize,
    colList,
    searchQuery
  }
})
