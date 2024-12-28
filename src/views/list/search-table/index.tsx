import { queryPolicyList, type PolicyQuery, type PolicyRecord } from '@/api/list'
import useLoading from '@/hooks/loading'
import { Card, Table, type PaginationProps } from '@arco-design/web-vue'
import { computed, defineComponent, nextTick, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import TableSearchForm from './TableSearchForm'
import TableActionArea from './TableActionArea'
import { useTableStore, TableEventBus } from './tableStore'
import { storeToRefs } from 'pinia'
import { ViewNames } from '@/types/constants'
import { usePagination } from '@/components/table-layout/usePagination'
import { EBE } from '@/components/table-layout/EventBusEnum'
import { useTableColumns } from '@/components/table-layout/useTableColumns'
export default defineComponent({
  name: ViewNames.searchTable,
  setup() {
    const { t } = useI18n()
    const { tableSize, colList, searchQuery } = storeToRefs(useTableStore())
    const events = new TableEventBus()
    // 分页
    const { paginationConfig, handleCurrentChange, handleQuerySearch } = usePagination({
      paging: [1, 5]
    })

    // =============== DIVIDER ==================
    // fetch data logic

    const renderData = ref<PolicyRecord[]>([])

    const { loading, setLoading } = useLoading()
    const fetchData = async () => {
      setLoading(true)
      try {
        const query = searchQuery.value
        const params = {
          ...query,
          current: paginationConfig.value.current,
          pageSize: paginationConfig.value.pageSize
        }
        const { data } = await queryPolicyList(params)

        renderData.value = data.list
        paginationConfig.value.total = data.total
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
    const { tableColumns } = useTableColumns(colList)
    return () => (
      <div>
        <Card class="general-card " title={t('menu.list.searchTable')}>
          <TableSearchForm searchLoading={loading.value} onOnSearch={handleQuerySearch} />
          <TableActionArea />
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
