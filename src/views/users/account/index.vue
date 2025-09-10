<template>
    <div class="table-container">
        <TableSearchForm
            v-model="formData"
            :loading="dataList.loading"
        />
        <ActionAreaRender />
        <a-table
            v-bind="tableConfig"
            :loading="dataList.loading"
            :data="dataList.value"
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
import { getUsers, type User } from '@/api/account'
import { useTableActionArea } from './useTableActionArea'
import { useTableConfig } from './useTableConfig/index'
import { eventBus } from '@/hooks/useEventBus'
import type { UserSearch } from '@/api/account'
import { REFRESH_LIST_EVENT, defaultSearchForm } from './constants'

const formData = ref<UserSearch>({ ...defaultSearchForm })

const { render: ActionAreaRender } = useTableActionArea()

const dataList = asyncRequestRef<User[]>(()=>{
    return getUsers(formData.value)
},[])

// 分页
const { pagination } = usePagination(
    dataList,
    formData
)

const { colList } = useTableColumns()

const tableConfig = useTableConfig()

eventBus.on(REFRESH_LIST_EVENT, () => {
    dataList.refresh()
})

</script>
<style lang="scss" scoped>
.table-container{
    margin:0 1rem;
}
</style>
