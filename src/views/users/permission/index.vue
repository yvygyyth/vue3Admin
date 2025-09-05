<template>
    <div class="table-container">
        <ActionAreaRender />
        <a-table
            :loading="dataList.loading"
            :data="dataList.value"
            :bordered="false"
            :columns="colList"
            row-key="id"
            :pagination="false"
            :expandable="{
                childrenColumnName: 'children',
                loadMore: loadMore
            }"
        ></a-table>
    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { useTableColumns } from './useTableColumns/index'
import { asyncRequestRef } from '@/hooks/syncRequestRef'
import { getPermissionTree, type PermissionTree } from '@/api/permission'
import { useTableActionArea } from './useTableActionArea/index'
import { eventBus } from '@/hooks/useEventBus'
import { REFRESH_LIST_EVENT } from './constants.ts'

const { render: ActionAreaRender } = useTableActionArea()

const dataList = asyncRequestRef<PermissionTree[]>(() => getPermissionTree(), [])

const { colList } = useTableColumns()

// 懒加载子节点
const loadMore = async (record: any) => {
    // 如果已经有子节点，直接返回
    if (record.children && record.children.length > 0) {
        return
    }
    
    // 这里可以根据需要实现懒加载逻辑
    // 目前使用 getPermissionTree 获取完整树，所以不需要额外的懒加载
    return Promise.resolve()
}

eventBus.on(REFRESH_LIST_EVENT, () => {
    dataList.refresh()
})

</script>
<style lang="scss" scoped>
.table-container{
    margin:0 1rem;
}
</style>
