<template>
    <div class="container">
        <TableSearchForm
            v-model="formData"
            :loading="dataList.loading"
            @search="handleSearch"
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

const { render: ActionAreaRender } = useTableActionArea()

const dataList = asyncRequestRef<Version[]>(getVersionList,[])

const formData = ref({
    app_id:void 0,
    page:1,
    limit:10
})

// 分页
const { pagination } = usePagination(
    dataList,
    formData
)

const { colList } = useTableColumns()

const handleSearch = () => {
    dataList.refresh()
}

</script>
<style lang="scss" scoped>

</style>