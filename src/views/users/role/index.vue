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
import { getRoles, type RoleWithPermissions } from '@/api/role'
import { useTableActionArea } from './useTableActionArea/index'
import { eventBus } from '@/hooks/useEventBus'
import type { RoleSearch } from '@/api/role'
import { REFRESH_LIST_EVENT, defaultSearchForm } from './constants'

const formData = ref<RoleSearch>({ ...defaultSearchForm })

const { render: ActionAreaRender } = useTableActionArea()

const dataList = asyncRequestRef<RoleWithPermissions[]>(()=>{
    return getRoles(formData.value)
},[])

// 分页
const { pagination } = usePagination(
    dataList,
    formData
)

const { colList } = useTableColumns()

eventBus.on(REFRESH_LIST_EVENT, () => {
    console.log('刷新列表',dataList.value)
    dataList.refresh()
})

</script>
<style lang="scss" scoped>
.table-container{
    margin:0 1rem;
}
</style>
