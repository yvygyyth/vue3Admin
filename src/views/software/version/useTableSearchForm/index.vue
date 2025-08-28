<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import { getSoftTypeList } from '@/api/software'
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
const emit = defineEmits(['update:modelValue','search'])

const searchQuery = useVModel(props, 'modelValue', emit)

const softTypeList = syncRequestRef(getSoftTypeList, [])

const handleSubmit = () => {
	emit('search')
}

const handleReset = () => {
	searchQuery.value = {}
	emit('search')
}

</script>

<template>
	<div class="table-searchForm">
		<a-form :model="searchQuery" auto-label-width @submit="handleSubmit">
			<a-row class="grid-demo" :gutter="24">
				<a-col :span="12">
					<a-form-item field="app_id" label="软件类型">
						<a-select 
						placeholder="请选择软件类型" 
						:loading="softTypeList.loading"
						:options="softTypeList.value"
						:field-names="{
							label: 'name',
							value: 'id'
						}"
						clearable
						v-model="searchQuery.app_id"/>
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
	padding: 20px;
	@include flex;
	.table-searchForm__btns{
		@include flex;
		gap: 10px;
	}
}
</style>