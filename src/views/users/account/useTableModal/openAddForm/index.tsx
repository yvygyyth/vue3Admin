import { Modal, Message } from "@arco-design/web-vue"
import AddModal from './AddModal/index.vue'
import { ref } from 'vue'
import { createUser } from '@/api/account'

export const openAddForm = () => {
    return new Promise(async (resolve, reject) => {
        
        const formData = ref({
            account: '',
            password: '',
            nickname: '',
            roles: []
        })

        const submit = async() => {
            try {
                await createUser({
                    account: formData.value.account,
                    password: formData.value.password,
                    nickname: formData.value.nickname || undefined,
                    roles: formData.value.roles
                })
                
                Message.success('新增成功')
                close()
                resolve(true)
            } catch (error) {
                Message.error('新增失败')
                console.log(error)
            }
        }
    
        const { close } = Modal.open({
            title: '新增用户',
            width: 600,
            footer: false,
            content: () => <AddModal 
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
