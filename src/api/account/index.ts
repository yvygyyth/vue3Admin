import { useRequestor, requestExtender } from '@net-vert/core'
import type { SimpleUser, User, UserSearch, CreateUser, UpdateUser } from './type'

const request = useRequestor()
const { requestor:idempotencyRequestor } = requestExtender.idempotencyRequestor()


// 获取所有用户（简单列表）
export const getAllUsers = (): Promise<SimpleUser[]> => {
    return request.get('/users/all')
}


// 获取用户列表(分页)
export const getUsers = (data: UserSearch): Promise<User[]> => {
    return idempotencyRequestor.post('/users/query', data)
}


// 删除用户
export const deleteUser = (id: number): Promise<void> => {
    return request.delete(`/users/${id}`)
}

// 新增用户
export const createUser = (data: CreateUser): Promise<void> => {
    return request.post('/users/create', data)
}

// 更新用户
export const updateUser = (data: UpdateUser): Promise<void> => {
    const { id, ...rest } = data
    return request.put(`/users/${id}`, rest)
}

// 设置角色
export const setRoles = (id: number, roles: number[]): Promise<void> => {
    return request.put(`/users/${id}/roles`, { roles })
}

export * from './type'