import { useRequestor, requestExtender } from '@net-vert/core'
import type { Role, RoleSearch, RoleWithPermissions, RoleSave } from './type'
import type { Permission } from '@/api/permission'

// 导出类型
export type { Role, RoleSearch, RoleWithPermissions, RoleSave } from './type'

const request = useRequestor()

const { requestor:idempotencyRequestor } = requestExtender.idempotencyRequestor()

// 获取所有角色
export const getRolesAll = (): Promise<Role[]> => {
    return request.get('/roles/all')
}

// 分页获取角色
export const getRoles = (data: RoleSearch): Promise<RoleWithPermissions[]> => {
    return idempotencyRequestor.post('/roles/query', data)
}


// 删除角色
export const deleteRole = (id: number): Promise<void> => {
    return request.delete(`/roles/${id}`)
}

// 角色保存
export const saveRole = (data: RoleSave): Promise<RoleWithPermissions> => {
    return request.post('/roles/save', data)
}

// 获取角色权限列表
export const getRolePermissions = (id: number): Promise<Permission[]> => {
    return request.get(`/roles/${id}/permissions`)
}