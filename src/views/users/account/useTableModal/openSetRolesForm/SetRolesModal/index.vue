<template>
    <a-form :model="formData" ref="formRef">
        <a-form-item label="用户信息">
            <div class="user-info">
                <div><strong>账号：</strong>{{ formData.account }}</div>
                <div v-if="formData.nickname"><strong>昵称：</strong>{{ formData.nickname }}</div>
            </div>
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

const handleSubmit = async() => {
    await emit('submit', formData.value)
}

</script>

<style lang="scss" scoped>
.user-info {
    padding: 12px;
    background-color: var(--color-fill-2);
    border-radius: 4px;
    
    div {
        margin-bottom: 4px;
        
        &:last-child {
            margin-bottom: 0;
        }
    }
}
</style>
