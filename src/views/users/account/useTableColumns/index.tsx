import { ref } from 'vue'
import type { User } from '@/api/account'
import { useTableOperations } from '../useTableOperations'
import { formatDateTime } from '@/utils/format'
import { getRolesAll } from '@/api/role'
import { syncRequestRef } from '@/hooks/syncRequestRef'

export const useTableColumns = () => {
    const { render: OperationsRender } = useTableOperations()
    
    // 获取所有角色用于显示
    const roleOptions = syncRequestRef(() => {
        const roles = getRolesAll()
        const rolesMap = new Map(roles.map(role => [role.id, role.name]))
        return rolesMap
    }, new Map())
    
    const colList = ref([
        {
            title: 'ID',
            dataIndex: 'id'
        },
        {
            title: '账号',
            dataIndex: 'account',
            ellipsis: true,
            tooltip: true
        },
        {
            title: '昵称',
            dataIndex: 'nickname',
            ellipsis: true,
            tooltip: true,
            render: ({ record }: { record: User }) => {
                return record.nickname || '-'
            }
        },
        {
            title: '角色',
            dataIndex: 'roles',
            render: ({ record }: { record: User }) => {
                return <div style={{ display: 'flex', gap: '4px' }}>
                    {
                        record.roleIds.map(roleId => 
                            <a-tag color="blue">
                                {roleOptions.value.get(roleId)}
                            </a-tag>
                        )
                    }
                </div>
            }
        },
        {
            title: '上次登录',
            dataIndex: 'last_login',
            render: ({ record }: { record: User }) => {
                return record.last_login ? formatDateTime(record.last_login) : '从未登录'
            }
        },
        {
            title: '创建时间',
            dataIndex: 'created_at',
            render: ({ record }: { record: User }) => {
                return formatDateTime(record.created_at)
            }
        },
        {
            title: '操作',
            dataIndex: 'operations',
            fixed: 'right',
            width: 200,
            render: ({ record }: { record: User }) => {
                return OperationsRender({ record })
            }
        }
    ])
    
    return {
        colList
    }
}
