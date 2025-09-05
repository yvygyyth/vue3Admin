import { Modal, Message } from "@arco-design/web-vue"
import EditModal from './EditModal/index.vue'
import { ref } from 'vue'
import type { User } from '@/api/account'
import { updateUser } from '@/api/account'

export const openEditForm = (data: Partial<User>) => {
    return new Promise(async (resolve, reject) => {
        
        const formData = ref({
            id: data.id!,
            account: data.account || '',
            password: '',
            nickname: data.nickname || '',
            roles: data.roles || []
        })

        const submit = async() => {
            try {
                const updateData = {
                    id: formData.value.id,
                    account: formData.value.account,
                    nickname: formData.value.nickname || null,
                    roles: formData.value.roles
                }
                
                // 如果密码不为空，则包含密码
                if (formData.value.password) {
                    (updateData as any).password = formData.value.password
                }
                
                await updateUser(updateData)
                
                Message.success('编辑成功')
                close()
                resolve(true)
            } catch (error) {
                Message.error('编辑失败')
                console.log(error)
            }
        }
    
        const { close } = Modal.open({
            title: '编辑用户',
            width: 600,
            footer: false,
            content: () => <EditModal 
                v-model={formData.value}
                onSubmit={submit}
            />,
            onBeforeCancel: () => {
                reject(false)
                return true
            }
        })

    })
}
