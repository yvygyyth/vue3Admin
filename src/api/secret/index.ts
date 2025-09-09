import { useRequestor, requestExtender } from '@net-vert/core'
import type { SecretSearch, SecretUpdate } from './type'

// 导出类型
export type { Secret, SecretSearch, SecretUpdate } from './type'

const request = useRequestor()
const { requestor:idempotencyRequestor } = requestExtender.idempotencyRequestor()

// 更新密钥
export const updateSecret = (data: SecretUpdate) => {
    return request.put('/secrets', data)
}

// 搜索密钥
export const searchSecret = (data: SecretSearch) => {
    return idempotencyRequestor.post('/secrets/query', data)
}
