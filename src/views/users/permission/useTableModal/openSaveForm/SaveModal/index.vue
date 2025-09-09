<template>
    <a-form :model="formData" ref="formRef" :rules="rule">
        <a-form-item 
            field="code" 
            label="权限代码"
        >
            <a-input 
                placeholder="请输入权限代码，如：user:create" 
                v-model="formData.code"
                :disabled = "formData.type === PermissionType.API"
                />
        </a-form-item>

        <a-form-item field="name" label="权限名称">
            <a-input 
                placeholder="请输入权限名称"
                v-model="formData.name" />
        </a-form-item>

        <a-form-item field="type" label="权限类型">
            <a-select 
                v-model="formData.type" 
                placeholder="请选择权限类型"
                :options="typeOptions"
                :disabled = "formData.type === PermissionType.API"
            />
        </a-form-item>

        <template v-if="formData.type === PermissionType.API">
            <a-form-item field="method" label="请求方法">
                <a-select
                    v-model="formData.method"
                    placeholder="请选择请求方法"
                    disabled
                />
            </a-form-item>

            <a-form-item field="route" label="路由">
                <a-input
                    v-model="formData.route"
                    placeholder="请输入路由，如：/api/users"
                    disabled
                />
            </a-form-item>
        </template>

        <a-form-item field="parent_id" label="父权限">
            <a-tree-select
                v-model="formData.parent_id"
                :data="treeSelectOptions.value"
                :loading="treeSelectOptions.loading"
                placeholder="请选择父权限（可选）"
                allow-clear
                allow-search
                :tree-checkable="false"
                :field-names="{
                    key: 'id',
                    title: 'name',
                    children: 'children'
                }"
            />
        </a-form-item>

        <a-form-item field="is_public" label="是否公开">
            <a-switch
                v-model="formData.is_public"
                :checked-value="PermissionIsPublic.PUBLIC"
                :unchecked-value="PermissionIsPublic.PRIVATE"
            />
        </a-form-item>

        <a-form-item>
            <LoadingButton html-type="submit" type="primary" @click="handleSubmit">
                保存
            </LoadingButton>
        </a-form-item>
    </a-form>
</template>

<script setup lang="ts">
import { useTemplateRef, type PropType } from 'vue'
import type { FormInstance } from '@arco-design/web-vue'
import LoadingButton from '@/components/LoadingButton/index.vue'
import { useVModel } from '@vueuse/core'
import { syncRequestRef } from '@/hooks/syncRequestRef'
import { PermissionType, getPermissionTree, PermissionTypeMap, PermissionIsPublic } from '@/api/permission'
import { traverseMap } from '@/utils/enum'
import { rule } from './rule.ts'

const props = defineProps({
    modelValue: {
        type: Object as PropType<any>,
        required: true
    }
})

const emit = defineEmits(['update:modelValue', 'submit'])

const formData = useVModel(props, 'modelValue', emit)

const formRef = useTemplateRef<FormInstance>('formRef')

const treeSelectOptions = syncRequestRef(getPermissionTree, [])

const typeOptions = traverseMap(PermissionTypeMap, (key, value) => {
    if (key === PermissionType.API) {
        return {
            label: value,
            value: key,
            disabled: true
        }
    } else {
        return {
            label: value,
            value: key
        }
    }
})

const handleSubmit = async() => {
    await formRef.value?.validate()
    await emit('submit', formData.value)
}

</script>
