<template>
    <div class="table-container">
        <ActionAreaRender />
        <a-table
            v-bind="tableConfig"
            :loading="dataList.loading"
            :data="dataList.value"
            :columns="colList"
            :pagination="false"
        ></a-table>
    </div>
</template>
<script lang="ts" setup>
import { useTableColumns } from './useTableColumns/index'
import { syncRequestRef } from '@/hooks/syncRequestRef'
import { getPermissionTree, type PermissionTree } from '@/api/permission'
import { useTableActionArea } from './useTableActionArea/index'
import { eventBus } from '@/hooks/useEventBus'
import { useTableConfig } from './useTableConfig'
import { REFRESH_LIST_EVENT } from './constants.ts'

const { render: ActionAreaRender } = useTableActionArea()

const dataList = syncRequestRef<PermissionTree[]>(getPermissionTree, [])

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
