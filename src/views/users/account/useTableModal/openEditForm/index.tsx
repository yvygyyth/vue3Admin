import { Modal, Message } from "@arco-design/web-vue"
import EditModal from './EditModal/index.vue'
import { ref } from 'vue'
import type { User } from '@/api/account'
import { updateUser, type UpdateUser } from '@/api/account'

export const openEditForm = (data: Partial<User>) => {
    return new Promise(async (resolve, reject) => {
        
        const formData = ref<UpdateUser>({
            id: data.id!,
            account: data.account || '',
            password: '',
            nickname: data.nickname || '',
            roleIds: data.roleIds || []
        })

        const submit = async() => {
            try {
                await updateUser(formData.value)
                
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
