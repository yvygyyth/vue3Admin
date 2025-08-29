<template>
    <div class="table-container">
        <TableSearchForm
            v-model="formData"
            :loading="dataList.loading"
        />
        <ActionAreaRender />
        <a-table
            :loading="dataList.loading"
            :data="dataList.value"
            :bordered="false"
            :pagination="pagination"
            :columns="colList"
        ></a-table>
    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import TableSearchForm from './useTableSearchForm/index.vue'
import { usePagination } from '@/hooks/usePagination'
import { useTableColumns } from './useTableColumns/index'
import { asyncRequestRef } from '@/hooks/syncRequestRef'
import { getVersionList, type Version } from '@/api/software'
import { useTableActionArea } from './useTableActionArea/index'
import { eventBus } from '@/hooks/useEventBus'
import type { SearchVersion } from '@/api/software'
import { REFRESH_LIST_EVENT } from './constants'

const formData = ref<SearchVersion>({
    app_id: void 0,
    page:1,
    limit:10
})

const { render: ActionAreaRender } = useTableActionArea()

const dataList = asyncRequestRef<Version[]>(()=>{
    return getVersionList(formData.value)
},[])

// 分页
const { pagination } = usePagination(
    dataList,
    formData
)

const { colList } = useTableColumns()


eventBus.on(REFRESH_LIST_EVENT, () => {
    dataList.refresh()
})

</script>
<style lang="scss" scoped>
.table-container{
    margin:0 1rem;
}
</style>