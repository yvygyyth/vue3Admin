import { type Pagination } from '@/types/global'
import { ref, type Ref } from 'vue'
import { type PaginationProps } from '@arco-design/web-vue'
import { EBE } from './EventBusEnum'
import EventBus from '@/hooks/useEventBus'

interface UsePaginationReturn {
  paginationConfig: Ref<PaginationProps & Pagination>
  handleCurrentChange: (page: number) => void
}
export const usePagination = ({
  paging,
  events
}: {
  paging: [number, number]
  events: EventBus
}): UsePaginationReturn => {
  const initPagination: Pagination = {
    page: paging[0],
    limit: paging[1]
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

  events.on(EBE.resetPagination, resetPagination)

  return {
    paginationConfig,
    handleCurrentChange
  }
}
