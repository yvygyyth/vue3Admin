<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import { eventBus } from '@/hooks/useEventBus'
import { REFRESH_LIST_EVENT, defaultSearchForm } from '../constants'
import { getRolesAll } from '@/api/role'
import { syncRequestRef } from '@/hooks/syncRequestRef'

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

// 获取所有角色选项
const roleOptions = syncRequestRef(getRolesAll, [])

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
					<a-form-item field="account" label="账号">
						<a-input 
							placeholder="请输入账号" 
							clearable
							v-model="searchQuery.account"/>
					</a-form-item>
				</a-col>
				<a-col :span="12">
					<a-form-item field="nickname" label="昵称">
						<a-input 
							placeholder="请输入昵称" 
							clearable
							v-model="searchQuery.nickname"/>
					</a-form-item>
				</a-col>
				<a-col :span="12">
					<a-form-item field="roles" label="角色">
						<a-select 
							v-model="searchQuery.roles"
							placeholder="请选择角色"
							multiple
							allow-clear
							:options="roleOptions.value"
							:field-names="{ label: 'name', value: 'id' }"
						/>
					</a-form-item>
				</a-col>
				<a-col :span="12">
					<a-form-item field="timeRange" label="创建时间">
						<a-range-picker 
							v-model="searchQuery.timeRange"
							style="width: 100%"
							clearable 
							showTime 
							value-format="X"
							/>
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
