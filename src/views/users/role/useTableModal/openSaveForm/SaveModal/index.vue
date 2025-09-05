<template>
    <a-form :model="formData" ref="formRef" :rules="rule">
        <a-form-item 
            field="name" 
            label="角色名称"
        >
            <a-input 
                placeholder="请输入角色名称" 
                v-model="formData.name"/>
        </a-form-item>

        <a-form-item field="description" label="角色描述">
            <a-textarea 
                v-model="formData.description"
                placeholder="请输入角色描述" 
                allow-clear
                :max-length="200"
                show-word-limit/>
        </a-form-item>

        <a-form-item field="permissionIds" label="权限配置">
            <a-tree
                v-model:checked-keys="formData.permissionIds"
                :data="treeSelectOptions.value"
                :field-names="{
                    key: 'id',
                    title: 'name',
                    children: 'children'
                }"
                checkable
                :default-expand-all="false"
                :check-strictly="false"
                size="small"
            />
        </a-form-item>

        <a-form-item>
            <LoadingButton html-type="submit" type="primary" @click="handleSubmit">保存</LoadingButton>
        </a-form-item>
    </a-form>
</template>

<script setup lang="ts">
import { useTemplateRef, type PropType } from 'vue'
import type { FormInstance } from '@arco-design/web-vue'
import LoadingButton from '@/components/LoadingButton/index.vue'
import { useVModel } from '@vueuse/core'
import type { RoleWithPermissions } from '@/api/role'
import { rule } from './rule'
import { getPermissionTree } from '@/api/permission'
import { syncRequestRef } from '@/hooks/syncRequestRef'

const props = defineProps({
    modelValue:{
        type: Object as PropType<Partial<RoleWithPermissions>>,
        required: true
    }
})

const emit = defineEmits(['update:modelValue', 'submit'])

const formData = useVModel(props, 'modelValue', emit)
const formRef = useTemplateRef<FormInstance>('formRef')
const treeSelectOptions = syncRequestRef(getPermissionTree, [])

const handleSubmit = async() => {
    await formRef.value?.validate()
    await emit('submit', formData.value)
}


</script>
