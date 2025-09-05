export type LoginData = {
  account: string
  password: string
}

export type LoginRes = {
  token: string
}

export type UserInfo = {
  token: string
}

export type ChangePasswordData = {
  oldPassword: string;
  newPassword: string;
}