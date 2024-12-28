import { queryPolicyList, type PolicyQuery, type PolicyRecord } from '@/api/list'
import useLoading from '@/hooks/loading'
import { type Pagination } from '@/types/global'

import {
  Avatar,
  Badge,
  Button,
  Card,
  Checkbox,
  Divider,
  Dropdown,
  Link,
  Popover,
  Space,
  Table,
  Tooltip,
  Upload,
  type PaginationProps
} from '@arco-design/web-vue'
import { computed, defineComponent, nextTick, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import TableSearchForm from './TableSearchForm'
import TableActionArea from './TableActionArea'
import { useTableStore } from './tableStore'
import { ViewNames } from '@/types/constants'
import usePermission from '@/hooks/permission'
import { usePagination } from '@/components/table-layout/usePagination'
import EventBus from '@/components/table-layout/useEventBus'
import { EBE } from '@/components/table-layout/EventBusEnum'
import { TableColumns } from './useTableColumns'
export default defineComponent({
  name: ViewNames.searchTable,
  setup() {
    const { t } = useI18n()
    const { checkButtonPermission } = usePermission()
    const TableStore = useTableStore()
    const events = new EventBus()
    // 分页
    const { paginationConfig, handleCurrentChange, handleQuerySearch } = usePagination({
      paging: [1, 5]
    })

    // =============== DIVIDER ==================
    // fetch data logic

    const renderData = ref<PolicyRecord[]>([])
    const searchQuery = ref<PolicyQuery>({
      number: '',
      name: '',
      contentType: '',
      filterType: '',
      createdTime: [],
      status: ''
    })

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
    const { tableColumns } = TableColumns()

    return () => (
      <div>
        <Card class="general-card " title={t('menu.list.searchTable')}>
          <TableSearchForm
            searchLoading={loading.value}
            searchQuery={searchQuery.value}
            onOnSearch={handleQuerySearch}
          />
          <Divider />
          <TableActionArea />
          <Table
            loading={loading.value}
            data={renderData.value}
            bordered={false}
            size={TableStore.tableSize}
            pagination={paginationConfig.value as PaginationProps}
            columns={tableColumns.value}
            onPageChange={handleCurrentChange}
          ></Table>
        </Card>
      </div>
    )
  }
})
