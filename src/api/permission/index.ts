import { useRequestor, requestExtender } from '@net-vert/core'
import type { PermissionSearch, Permission, PermissionTree, PermissionNode, PermissionSave } from './type'

const request = useRequestor()
const { requestor:syncRequestor, store:syncStore } = requestExtender.syncRequestor()
const { requestor:idempotencyRequestor } = requestExtender.idempotencyRequestor()

export const getPermissionTree = (): PermissionTree[] => {
    return syncRequestor.get('/permissions/tree')
}

export const deletePermissionTreeCache = () => syncStore.remove('/permissions/tree')

// 获取权限节点
export const getPermissionNode = (data: PermissionSearch): Promise<PermissionNode[]> => {
    return request.post(`/permissions/nodes`, data)
}

// 批量获取权限
export const getPermissions = (ids: number[]): Promise<Permission[]> => {
    return request.post(`/permissions/batch`, { ids })
}


// 删除权限
export const deletePermission = async(id: number): Promise<void> => {
    const res = await request.delete(`/permissions/${id}`)
    deletePermissionTreeCache()
    return res
}


// 权限保存
export const savePermission = async(data: PermissionSave): Promise<Permission> => {
    const res = await request.post(`/permissions/save`, data)
    deletePermissionTreeCache()
    return res
}


export * from './type'
export * from './enum'