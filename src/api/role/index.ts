import { useRequestor, requestExtender } from '@net-vert/core'
import type { Role, RoleSearch, RoleWithPermissions, RoleSave } from './type'
import type { Permission } from '@/api/permission'

// 导出类型
export type { Role, RoleSearch, RoleWithPermissions, RoleSave } from './type'

const request = useRequestor()

const { requestor:syncRequestor, store:syncStore } = requestExtender.syncRequestor()
const { requestor:idempotencyRequestor } = requestExtender.idempotencyRequestor()

// 获取所有角色
export const getRolesAll = (): Role[] => {
    return syncRequestor.get('/roles/all')
}

// 分页获取角色
export const getRoles = (data: RoleSearch): Promise<RoleWithPermissions[]> => {
    return idempotencyRequestor.post('/roles/query', data)
}

// 删除角色缓存
export const deleteRolesCache = () => {
    return syncStore.remove('/roles/all')
}

// 删除角色
export const deleteRole = async(id: number): Promise<void> => {
    const res = await request.delete(`/roles/${id}`)
    deleteRolesCache()
    return res
}

// 角色保存
export const saveRole = async(data: RoleSave): Promise<RoleWithPermissions> => {
    const res = await request.post('/roles/save', data)
    deleteRolesCache()
    return res
}

// 获取角色权限列表
export const getRolePermissions = (id: number): Promise<Permission[]> => {
    return request.get(`/roles/${id}/permissions`)
}