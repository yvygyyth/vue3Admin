import { useRequestor } from '@net-vert/core'
import type {
  LoginData,
  LoginRes,
} from './type'

const request = useRequestor()
export function login(data: LoginData): Promise<LoginRes> {
  return request.post('/users/login', data)
}

export function logout() {
  return request.post('/users/logout')
}

export function userUploadApi(data: FormData) {
  return request.post('/users/upload', data)
}


export function saveUserInfo() {
  return request.post('/user/save-info')
}

export * from './type'
