import { useRequestor, requestExtender } from '@net-vert/core'
import type { PermissionSearch, Permission, PermissionTree, PermissionNode, PermissionSave } from './type'

const request = useRequestor()
const { requestor:syncRequestor, store:syncStore } = requestExtender.syncRequestor()
const { requestor:idempotencyRequestor } = requestExtender.idempotencyRequestor()

export function getPermissionTree(): Promise<PermissionTree[]> {
    return syncRequestor.get('/permissions/tree')
}

export const deletePermissionTreeCache = () => syncStore.remove('/permissions/tree')

// 获取权限节点
export function getPermissionNode(data: PermissionSearch): Promise<PermissionNode[]> {
    return request.post(`/permissions/nodes`, data)
}

// 批量获取权限
export function getPermissions(ids: number[]): Promise<Permission[]> {
    return request.post(`/permissions/batch`, { ids })
}


// 删除权限
export function deletePermission(id: number): Promise<void> {
    return request.delete(`/permissions/${id}`)
}


// 权限保存
export function savePermission(data: PermissionSave): Promise<Permission> {
    return request.post(`/permissions/save`, data)
}


export * from './type'