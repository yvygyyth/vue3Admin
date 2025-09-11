<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import { timeShortcut } from '@/utils/timer'
import { AnnouncementTypeMap, ExchangeCodeName } from '@/api/announcement'
import { mapToLabelValueArray } from '@/utils/enum'
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
const emit = defineEmits(['update:modelValue', 'search'])

const searchQuery = useVModel(props, 'modelValue', emit)

const handleSubmit = () => {
  // 重置到第一页
  searchQuery.value.page = 1
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
			<a-row :gutter="24">
				<a-col :span="12">
					<a-form-item field="exchange_code" label="交易所">
						<a-select allow-clear placeholder="选择交易所" v-model="searchQuery.exchange_code"
							:options="mapToLabelValueArray(ExchangeCodeName)" />
					</a-form-item>
				</a-col>
				<a-col :span="12">
					<a-form-item field="type" label="公告类型">
						<a-select allow-clear placeholder="选择类型" v-model="searchQuery.type" :options="mapToLabelValueArray(AnnouncementTypeMap)" />
					</a-form-item>
				</a-col>
				<a-col :span="12">
					<a-form-item field="keywords" label="关键词">
						<a-input allow-clear placeholder="搜索标题或描述" v-model="searchQuery.keywords" />
					</a-form-item>
				</a-col>
				<a-col :span="12">
					<a-form-item field="time_range" label="发布时间">
						<a-range-picker style="width: 100%" allow-clear :shortcuts="timeShortcut.rangeShortcuts"
							showTime value-format="timestamp" v-model="searchQuery.time_range" />
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
	padding-top: 20px;
	@include flex(row, flex-start);
	@include gap(20px);

	.table-searchForm__btns {
		@include flex(column, space-between);
		@include gap(20px);
		margin-bottom: 20px;
  }
}
</style>