import { useRequestor } from '@net-vert/core'
import type { Role, RoleSearch, RoleWithPermissions, RoleSave } from './type'
import type { Permission } from '@/api/permission'

const request = useRequestor()

// 获取所有角色
export const getRolesAll = (): Promise<Role[]> => {
    return request.get('/roles')
}

// 分页获取角色
export const getRoles = (data: RoleSearch): Promise<RoleWithPermissions[]> => {
    return request.post('/roles', data)
}


// 删除角色
export const deleteRole = (id: number): Promise<void> => {
    return request.delete(`/roles/${id}`)
}

// 角色保存
export const saveRole = (data: RoleSave): Promise<RoleWithPermissions> => {
    return request.post('/roles', data)
}

// 获取角色权限列表
export const getRolePermissions = (id: number): Promise<Permission[]> => {
    return request.get(`/roles/${id}/permissions`)
}