<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import { eventBus } from '@/hooks/useEventBus'
import { REFRESH_LIST_EVENT, defaultSearchForm } from '../constants'

const props = defineProps({
	modelValue: {
		type: Object,
		required: true
	},
	loading: {
		type: Boolean,
		default: false
	}
})
const emit = defineEmits(['update:modelValue'])

const searchQuery = useVModel(props, 'modelValue', emit)

const handleSubmit = () => {
	eventBus.emit(REFRESH_LIST_EVENT)
}

const handleReset = () => {
	searchQuery.value = { ...defaultSearchForm }
	eventBus.emit(REFRESH_LIST_EVENT)
}

</script>

<template>
	<div class="table-searchForm">
		<a-form :model="searchQuery" auto-label-width @submit="handleSubmit">
			<a-row class="grid-demo" :gutter="24">
				<a-col :span="12">
					<a-form-item field="keyword" label="关键词">
						<a-input 
							placeholder="请输入角色名称或描述" 
							clearable
							v-model="searchQuery.keyword"/>
					</a-form-item>
				</a-col>
				<a-col :span="12">
					<a-form-item field="time_range" label="创建时间">
						<a-range-picker 
							v-model="searchQuery.time_range"
							style="width: 100%"
							clearable />
					</a-form-item>
				</a-col>
			</a-row>
		</a-form>
		<div class="table-searchForm__btns">
			<a-button type="primary" @click="handleSubmit" :loading="loading">查询</a-button>
			<a-button @click="handleReset" :loading="loading">重置</a-button>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.table-searchForm {
	@include flex;
	.table-searchForm__btns{
		@include flex;
		gap: 10px;
	}
}
</style>
