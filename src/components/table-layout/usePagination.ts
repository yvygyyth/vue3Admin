import { type Pagination } from '@/types/global'
import { ref, type Ref } from 'vue'
import { type PaginationProps } from '@arco-design/web-vue'
import { EBE } from './EventBusEnum'
import EventBus from '@/hooks/useEventBus'

interface UsePaginationReturn {
  paginationConfig: Ref<PaginationProps & Pagination>
  resetPagination: () => void
  handleCurrentChange: (page: number) => void
  handleQuerySearch: () => void
}
export const usePagination = ({
  paging,
  events
}: {
  paging: [number, number]
  events: EventBus
}): UsePaginationReturn => {
  const initPagination: Pagination = {
    current: paging[0],
    pageSize: paging[1]
  }

  const paginationConfig = ref<PaginationProps & Pagination>({
    ...initPagination,
    showTotal: true
  })
  const resetPagination = () => {
    paginationConfig.value = {
      ...paginationConfig.value,
      ...initPagination
    }
  }

  const handleCurrentChange = (page: number) => {
    paginationConfig.value.current = page
    events.emit(EBE.fetchData)
  }

  const handleQuerySearch = () => {
    resetPagination()
    events.emit(EBE.fetchData)
  }

  events.on(EBE.handleQuerySearch, handleQuerySearch)

  return {
    paginationConfig,
    resetPagination,
    handleCurrentChange,
    handleQuerySearch
  }
}
