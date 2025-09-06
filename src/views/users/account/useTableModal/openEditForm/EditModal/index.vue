<template>
    <a-form :model="formData" ref="formRef" :rules="rules">
        <a-form-item 
            field="account" 
            label="账号"
        >
            <a-input 
                placeholder="请输入账号" 
                v-model="formData.account"/>
        </a-form-item>

        <a-form-item 
            field="password" 
            label="新密码"
        >
            <a-input-password 
                v-model="formData.password"
                placeholder="留空则不修改密码" 
                allow-clear/>
        </a-form-item>

        <a-form-item field="nickname" label="昵称">
            <a-input 
                v-model="formData.nickname"
                placeholder="请输入昵称" 
                allow-clear/>
        </a-form-item>

        <a-form-item field="roleIds" label="角色配置">
            <a-select
                v-model="formData.roleIds"
                :options="roleOptions.value"
                :field-names="{ label: 'name', value: 'id' }"
                multiple
                placeholder="请选择角色"
                allow-clear
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
import { getRolesAll } from '@/api/role'
import { syncRequestRef } from '@/hooks/syncRequestRef'
import { editUserRules } from './rule'
import type { UpdateUser } from '@/api/account'

const props = defineProps({
    modelValue:{
        type: Object as PropType<UpdateUser>,
        required: true
    }
})

const emit = defineEmits(['update:modelValue', 'submit'])

const formData = useVModel(props, 'modelValue', emit)
const formRef = useTemplateRef<FormInstance>('formRef')
const roleOptions = syncRequestRef(getRolesAll, [])

// 使用外部规则文件
const rules = editUserRules

const handleSubmit = async() => {
    await formRef.value?.validate()
    await emit('submit', formData.value)
}

</script>
