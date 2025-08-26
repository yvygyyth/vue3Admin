import { ref, computed, watch } from 'vue';
import type { PageLimit } from '@/types/pagination';
import { COUNT_SYMBOL } from '@/types/pagination';
import type { SyncRequestRef } from '@/hooks/syncRequestRef';
import type { Ref } from 'vue';

export const usePagination = <T, F extends { page?: number; limit?: number }>(
    dataList: SyncRequestRef<T>, 
    formData: Ref<F>,
    initialPageSize = 10
) => {
    const current = ref(formData.value.page || 1)
    const pageSize = ref(formData.value.limit || initialPageSize)
    const total = ref(0)
    const showTotal = ref(true)
    const showJumper = ref(true)
    const showPageSize = ref(true)
    const pageSizeOptions = ref([10, 20, 30, 50, 100])

    const onPageChange = (page: number) => {
        current.value = page
        formData.value.page = page
        dataList.refresh()
    }

    const onPageSizeChange = (size: number) => {
        pageSize.value = size
        current.value = 1 // 重置到第一页
        formData.value.page = 1
        formData.value.limit = size
        dataList.refresh()
    }

    const pagination = computed(() => ({
        current: current.value,
        pageSize: pageSize.value,
        total: total.value,
        showTotal: showTotal.value,
        showJumper: showJumper.value,
        showPageSize: showPageSize.value,
        pageSizeOptions: pageSizeOptions.value,
        onChange: onPageChange,
        onPageSizeChange: onPageSizeChange,
    }))

    const pageLimit = computed<PageLimit>(() => ({
        page: current.value,
        limit: pageSize.value,
    }))

    const resetPagination = () => {
        current.value = 1
        pageSize.value = initialPageSize
        total.value = 0
        formData.value.page = 1
        formData.value.limit = initialPageSize
    }

    const setTotal = (newTotal: number) => {
        total.value = newTotal
    }

    watch(
        () => dataList.value,
        () => {
            total.value = (dataList.value as any)[COUNT_SYMBOL] || 0
        }
    )

    return {
        current,
        pageSize,
        total,
        pagination,
        pageLimit,
        onPageChange,
        onPageSizeChange,
        resetPagination,
        setTotal
    }
}