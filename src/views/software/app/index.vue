<template>
    <div class="table-container">
        <ActionAreaRender />
        <a-table
            v-bind="tableConfig"
            :loading="dataList.loading"
            :data="dataList.value"
            :columns="colList"  
        ></a-table>
    </div>
</template>
<script lang="ts" setup>
import { useTableColumns } from './useTableColumns/index'
import { syncRequestRef } from '@/hooks/syncRequestRef'
import { getSoftTypeList, type softwareType } from '@/api/software'
import { useTableActionArea } from './useTableActionArea/index'
import { useTableConfig } from './useTableConfig/index'
import { eventBus } from '@/hooks/useEventBus'
import { REFRESH_LIST_EVENT } from './constants'

const { render: ActionAreaRender } = useTableActionArea()

const dataList = syncRequestRef<softwareType[]>(getSoftTypeList,[])


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