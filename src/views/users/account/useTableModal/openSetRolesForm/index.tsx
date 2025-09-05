import { Modal, Message } from "@arco-design/web-vue"
import SetRolesModal from './SetRolesModal/index.vue'
import { ref } from 'vue'
import type { User } from '@/api/account'
import { setRoles } from '@/api/account'

export const openSetRolesForm = (data: User) => {
    return new Promise(async (resolve, reject) => {
        
        const formData = ref({
            userId: data.id,
            account: data.account,
            nickname: data.nickname,
            roles: [...(data.roles || [])]
        })

        const submit = async() => {
            try {
                await setRoles(formData.value.userId, formData.value.roles)
                Message.success('设置角色成功')
                close()
                resolve(true)
            } catch (error) {
                Message.error('设置角色失败')
                console.log(error)
            }
        }
    
        const { close } = Modal.open({
            title: `设置用户角色 - ${data.account}`,
            width: 500,
            footer: false,
            content: () => <SetRolesModal 
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
