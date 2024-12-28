import { queryPolicyList, type PolicyQuery, type PolicyRecord } from '@/api/list'
import useLoading from '@/hooks/loading'
import { type Pagination } from '@/types/global'
import { exchangeArray } from '@/utils/sort'
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
import {
  IconDownload,
  IconDragArrow,
  IconLineHeight,
  IconPlus,
  IconSettings
} from '@arco-design/web-vue/es/icon'
import Sortable from 'sortablejs'
import { computed, defineComponent, nextTick, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import TableSearchForm from './TableSearchForm'
import { ViewNames } from '@/types/constants'
import usePermission from '@/hooks/permission'
import { useTableSize } from '@/components/table-layout/useTableSize'
import { usePagination } from '@/components/table-layout/usePagination'
import EventBus from '@/components/table-layout/useEventBus'
import { EBE } from '@/components/table-layout/EventBusEnum'
import { TableColumns } from './TableColumns'
export default defineComponent({
  name: ViewNames.searchTable,
  setup() {
    const { t } = useI18n()
    const { checkButtonPermission } = usePermission()
    const events = new EventBus()
    // 分页
    const { paginationConfig, handleCurrentChange, handleQuerySearch } = usePagination({
      paging: [1, 5]
    })

    // =============== DIVIDER ==================
    // table size change
    const { tableSize, render: TableSizeRender } = useTableSize()
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
    const { colList, tableColumns } = TableColumns()

    const popupVisibleChange = (val: boolean) => {
      if (val) {
        nextTick(() => {
          const el = document.getElementById('tableSetting') as HTMLElement
          new Sortable(el, {
            onEnd(e: any) {
              const { oldIndex, newIndex } = e
              exchangeArray(colList.value, oldIndex, newIndex)
            }
          })
        })
      }
    }

    return () => (
      <div>
        <Card class="general-card " title={t('menu.list.searchTable')}>
          <TableSearchForm
            searchLoading={loading.value}
            searchQuery={searchQuery.value}
            onOnSearch={handleQuerySearch}
          />
          <Divider />
          <div class="flex justify-between mb-4">
            <Space>
              <Button
                v-slots={{
                  icon: () => <IconPlus />
                }}
                type="primary"
              >
                {t('searchTable.operation.create')}
              </Button>
              <Upload action="/" showFileList={false}>
                {{
                  'upload-button': () => <Button>{t('searchTable.operation.import')}</Button>
                }}
              </Upload>
            </Space>
            <Space size="medium">
              <Button
                v-slots={{
                  icon: () => <IconDownload />
                }}
              >
                {t('searchTable.operation.download')}
              </Button>
              {TableSizeRender()}
              <Tooltip content={t('searchTable.actions.columnSetting')}>
                <Popover trigger="click" position="left" onPopupVisibleChange={popupVisibleChange}>
                  {{
                    content: () => (
                      <div id="tableSetting">
                        {colList.value.map((item) => (
                          <div class="w-32">
                            <Space>
                              <IconDragArrow class="cursor-move" />
                              <Checkbox v-model={item.checked} />
                              <div
                                class="text-ellipsis whitespace-nowrap  overflow-hidden w-20"
                                title={item.getTitle()}
                              >
                                {item.getTitle()}
                              </div>
                            </Space>
                          </div>
                        ))}
                      </div>
                    ),
                    default: () => <IconSettings size="18" class="cursor-pointer" />
                  }}
                </Popover>
              </Tooltip>
            </Space>
          </div>
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
