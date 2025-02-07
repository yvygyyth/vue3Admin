import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'
import type { ColListType, TableSize } from '@/components/table-layout/type'
import { requestList, requestSave, requestDelete, requestGet } from '@/api/otherCost'
import type { QueryParams, QueryResult, ListRes, FormData } from '@/api/otherCost'
import useLoading from '@/hooks/loading'
import EventBus from '@/hooks/useHashEventBus'
import { singleton } from '@/utils/singleton'
import { EBE } from '@/components/table-layout/EventBusEnum'
import { TableColumns } from './useTableColumns'
// 默认的查询对象
const defaultSearchQuery: QueryParams = {
  hirer_keyword: '',
  start_time: undefined,
  end_time: undefined
}

interface TableStoreState {
  tableSize: Ref<TableSize>
  colList: Ref<ColListType[]>
  searchQuery: Ref<QueryParams>
  loading: Ref<boolean>
  setLoading: (state: boolean) => void
}

export { requestList, requestSave, requestDelete, requestGet }
export type { QueryParams, QueryResult, ListRes, FormData }

export const TableEventBus = singleton(EventBus)

export const useTableStore = defineStore('table', (): TableStoreState => {
  // 独属于表格的总线
  const events = new TableEventBus()

  // 加载项
  const { loading, setLoading } = useLoading()

  // 尺寸
  const tableSize = ref<TableSize>('medium')

  // 列表项
  const colList = ref<ColListType[]>(TableColumns())

  // 查询项，使用默认值
  const searchQuery = ref<QueryParams>({ ...defaultSearchQuery }) // 使用默认值初始化

  // 重置查询项
  function resetSearchQuery() {
    searchQuery.value = { ...defaultSearchQuery } // 直接赋值默认值
  }
  // 为resetSearchQuery添加重置表单属性事件
  events.on(EBE.resetSearchQuery, resetSearchQuery)

  return {
    loading,
    setLoading,
    tableSize,
    colList,
    searchQuery
  }
})
