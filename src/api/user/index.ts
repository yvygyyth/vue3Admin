import { useRequestor } from '@net-vert/core'
import type {
  LoginData,
  LoginRes,
} from './type'

const request = useRequestor()
export function login(data: LoginData) {
  return request.post<LoginRes>('/user/login', data)
}

export function logout() {
  return request.post<LoginRes>('/user/logout')
}

export function userUploadApi(data: FormData) {
  return request.post('/user/upload', data)
}


export function saveUserInfo() {
  return request.post('/user/save-info')
}

export * from './type'
