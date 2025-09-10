<template>
    <div class="table-container">
        <TableSearchForm
            v-model="formData"
            :loading="dataList.loading"
        />
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
import { useTableConfig } from './useTableConfig/index'
import { asyncRequestRef } from '@/hooks/syncRequestRef'
import { searchSecret, type Secret } from '@/api/secret'
import { eventBus } from '@/hooks/useEventBus'
import type { SecretSearch } from '@/api/secret'
import { REFRESH_LIST_EVENT, defaultSearchForm } from './constants'

const formData = ref<SecretSearch>({ ...defaultSearchForm })

const dataList = asyncRequestRef<Secret[]>(()=>{
    return searchSecret(formData.value)
},[])

// 分页
const { pagination } = usePagination(
    dataList,
    formData
)

const { colList } = useTableColumns()

const tableConfig = useTableConfig()

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
