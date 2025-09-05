import { useRequestor } from '@net-vert/core'
import type {
  LoginData,
  LoginRes,
  ChangePasswordData
} from './type'

const request = useRequestor()
export function login(data: LoginData): Promise<LoginRes> {
  return request.post('/users/login', data)
}

export function changePassword(data: ChangePasswordData) {
  return request.post('/user/save-info')
}

export * from './type'
