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
            :columns="colList"
            :pagination="pagination"
        ></a-table>
    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import TableSearchForm from './useTableSearchForm/index.vue'
import { usePagination } from '@/hooks/usePagination'
import { useTableColumns } from './useTableColumns/index'
import { asyncRequestRef } from '@/hooks/syncRequestRef'
import { type AnnouncementQueryParams, announcementQueryApi, type Announcement } from '@/api/announcement'
import { useTableConfig } from './useTableConfig/index'
import { eventBus } from '@/hooks/useEventBus'
import { REFRESH_LIST_EVENT, defaultSearchForm } from './constants.ts'


const formData = ref<AnnouncementQueryParams>({ ...defaultSearchForm })

const dataListApi = () => announcementQueryApi(formData.value)

// 数据列表
const dataList = asyncRequestRef<Announcement[]>(dataListApi, [])

// 分页
const { pagination } = usePagination(dataList, formData);

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