import { requestList } from './tableStore'
import type { ColListType } from '@/components/table-layout/type'
import type { QueryResult } from './tableStore'
import { useTableStore, TableEventBus } from './tableStore'
import { Card, Table, type PaginationProps } from '@arco-design/web-vue'
import { onUnmounted, defineComponent, ref, type Ref } from 'vue'
import { useI18n } from 'vue-i18n'
import TableActionArea from '@/components/table-layout/TableActionArea'
import { useTableActionArea } from './useTableActionArea'
import { useTableSearchForm } from './useTableSearchForm'
import TableSearchForm from '@/components/table-layout/TableSearchForm'
import { storeToRefs } from 'pinia'
import { usePagination } from '@/components/table-layout/usePagination'
import { EBE } from '@/components/table-layout/EventBusEnum'
import { useTableColumns } from '@/components/table-layout/useTableColumns'
export default defineComponent({
  name: 'other-list',
  setup() {
    const { t } = useI18n()
    const { loading, tableSize, colList, searchQuery } = storeToRefs(useTableStore())
    const { setLoading } = useTableStore()
    const events = new TableEventBus()

    // 分页
    const { paginationConfig, handleCurrentChange } = usePagination({
      paging: [1, 10],
      events
    })
    // =============== DIVIDER ==================
    // fetch data logic

    const renderData = ref<QueryResult[]>([])

    const fetchData = async () => {
      setLoading(true)
      try {
        const { data, count } = await requestList({
          ...searchQuery.value,
          ...paginationConfig.value
        })

        renderData.value = data
        paginationConfig.value.total = count
      } catch (err) {
        // you can report use errorHandler or other
      } finally {
        setLoading(false)
      }
    }

    events.on(EBE.fetchData, fetchData)
    events.emit(EBE.fetchData, fetchData)

    // =============== DIVIDER ==================
    // table columns render logic
    const { tableColumns } = useTableColumns(colList as Ref<ColListType[]>)
    const { searchForm, formAttrs } = useTableSearchForm()
    const { TableActionButtons, TableSettings } = useTableActionArea()

    onUnmounted(() => {
      events.clear()
    })
    return () => (
      <div>
        <Card class="general-card " title={t('menu.list.searchTable')}>
          <TableSearchForm
            events={events}
            loading={loading.value}
            searchQuery={searchQuery.value}
            {...formAttrs}
            v-slots={{
              default: () => searchForm
            }}
          />
          <TableActionArea TableActionButtons={TableActionButtons} TableSettings={TableSettings} />
          <Table
            loading={loading.value}
            data={renderData.value}
            bordered={false}
            size={tableSize.value}
            pagination={paginationConfig.value as PaginationProps}
            columns={tableColumns.value}
            onPageChange={handleCurrentChange}
          ></Table>
        </Card>
      </div>
    )
  }
})
