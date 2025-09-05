import { defineComponent, ref, reactive, onMounted } from 'vue'
import { Message } from '@arco-design/web-vue'
import { savePermission, getPermissionTree, type PermissionTree, type PermissionSave } from '@/api/permission'

interface Props {
    data?: Partial<PermissionTree>
    onSuccess?: () => void
    onCancel?: () => void
}

export const openSaveForm = defineComponent<Props>((props) => {
    const loading = ref(false)
    const permissionOptions = ref<PermissionTree[]>([])
    
    const form = reactive({
        id: props.data?.id,
        code: props.data?.code || '',
        name: props.data?.name || '',
        type: props.data?.type || 1,
        method: props.data?.method || '',
        route: props.data?.route || '',
        parent_id: props.data?.parent_id || null
    })

    const typeOptions = [
        { label: '菜单', value: 1 },
        { label: '按钮', value: 2 },
        { label: '接口', value: 3 }
    ]

    const methodOptions = [
        { label: 'GET', value: 'GET' },
        { label: 'POST', value: 'POST' },
        { label: 'PUT', value: 'PUT' },
        { label: 'DELETE', value: 'DELETE' },
        { label: 'PATCH', value: 'PATCH' }
    ]

    // 获取权限树用于父权限选择
    const loadPermissionOptions = async () => {
        try {
            const data = await getPermissionTree()
            permissionOptions.value = data
        } catch (error) {
            console.error('加载权限树失败:', error)
        }
    }

    // 递归构建树形选择器选项
    const buildTreeSelectOptions = (permissions: PermissionTree[], level = 0): any[] => {
        return permissions.map(item => ({
            key: item.id,
            title: `${item.name} (${item.code})`,
            value: item.id,
            disabled: item.id === form.id, // 不能选择自己作为父级
            children: item.children && item.children.length > 0 
                ? buildTreeSelectOptions(item.children, level + 1) 
                : undefined
        }))
    }

    const handleSubmit = async () => {
        if (!form.code || !form.name) {
            Message.error('请填写必要信息')
            return
        }

        loading.value = true
        try {
            const saveData: PermissionSave = {
                ...form,
                method: form.method || null,
                route: form.route || null,
                parent_id: form.parent_id || null
            }
            
            await savePermission(saveData)
            Message.success(form.id ? '编辑成功' : '新增成功')
            props.onSuccess?.()
        } catch (error) {
            Message.error(form.id ? '编辑失败' : '新增失败')
        } finally {
            loading.value = false
        }
    }

    const handleCancel = () => {
        props.onCancel?.()
    }

    onMounted(() => {
        loadPermissionOptions()
    })

    return () => (
        <div style={{ padding: '20px' }}>
            <a-form model={form} layout="vertical">
                <a-form-item label="权限代码" required>
                    <a-input 
                        v-model={form.code} 
                        placeholder="请输入权限代码，如：user:create"
                    />
                </a-form-item>
                
                <a-form-item label="权限名称" required>
                    <a-input 
                        v-model={form.name} 
                        placeholder="请输入权限名称"
                    />
                </a-form-item>
                
                <a-form-item label="权限类型">
                    <a-select v-model={form.type} placeholder="请选择权限类型">
                        {typeOptions.map(option => (
                            <a-option key={option.value} value={option.value}>
                                {option.label}
                            </a-option>
                        ))}
                    </a-select>
                </a-form-item>
                
                <a-form-item label="请求方法">
                    <a-select 
                        v-model={form.method} 
                        placeholder="请选择请求方法（接口类型时必填）"
                        allowClear
                    >
                        {methodOptions.map(option => (
                            <a-option key={option.value} value={option.value}>
                                {option.label}
                            </a-option>
                        ))}
                    </a-select>
                </a-form-item>
                
                <a-form-item label="路由">
                    <a-input 
                        v-model={form.route} 
                        placeholder="请输入路由，如：/api/users"
                    />
                </a-form-item>
                
                <a-form-item label="父权限">
                    <a-tree-select
                        v-model={form.parent_id}
                        data={buildTreeSelectOptions(permissionOptions.value)}
                        placeholder="请选择父权限（可选）"
                        allowClear
                        allowSearch
                        treeCheckable={false}
                        fieldNames={{
                            key: 'value',
                            title: 'title',
                            children: 'children'
                        }}
                    />
                </a-form-item>
            </a-form>
            
            <div style={{ textAlign: 'right', marginTop: '20px' }}>
                <a-space>
                    <a-button onClick={handleCancel}>取消</a-button>
                    <a-button 
                        type="primary" 
                        loading={loading.value}
                        onClick={handleSubmit}
                    >
                        {form.id ? '更新' : '创建'}
                    </a-button>
                </a-space>
            </div>
        </div>
    )
}, {
    props: ['data', 'onSuccess', 'onCancel']
})
