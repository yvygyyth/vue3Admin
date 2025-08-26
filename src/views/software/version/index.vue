<template>
    <div class="container">
        <TableSearchForm
            v-model="formData"
            :loading="dataList.loading"
            @search="handleSearch"
        />
        <a-table
            :loading="dataList.loading"
            :data="renderData"
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

const dataList = asyncRequestRef(()=>{
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve([])
        },2000)
    })
},[])


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




const renderData = ref([])

const handleSearch = () => {

    new Promise((resolve) => {
        setTimeout(() => {

            resolve(true)
        }, 2000)
    })
}

</script>
<style lang="scss" scoped>
// .container{
//     background: #ffffff;
// }
</style>