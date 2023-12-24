export enum LocaleOptions {
  cn = 'zh-CN',
  en = 'en-US'
}
export enum LocalStorageKey {
  localeKey = 'VUE_TSX_ADMIN_LOCALE',
  applicationTheme = 'VUE_TSX_ADMIN_THEME',
  loginFormInfo = 'VUE_TSX_ADMIN_LOGIN_FORM_INFO'
}
export enum ApplicationTheme {
  light = 'light',
  dark = 'dark'
}

export enum StoreName {
  user = 'userStore',
  tab = 'tabStore',
  application = 'applicationStore'
}

export enum ApplicationInfo {
  APP_TITLE = 'Vue TSX Admin'
}

export enum AppRouteNames {
  login = 'LOGIN',
  redirect = 'REDIRECT',
  notFound = 'NOT_FOUND',

  // =============== DIVIDER ==================
  dashboard = 'DASHBOARD',
  workplace = 'WORKPLACE',
  monitor = 'MONITOR',

  // =============== DIVIDER ==================

  exception = 'exception',
  _403 = '403',
  _404 = '404',
  _500 = '500',

  // =============== DIVIDER ==================
  form = 'FORM',
  step = 'STEP',
  group = 'GROUP',
  // =============== DIVIDER ==================
  profile = 'PROFILE',

  // =============== DIVIDER ==================

  list = 'LIST',
  searchTable = 'SEARCH_TABLE',
  card = 'CARD',
  // =============== DIVIDER ==================
  result = 'RESULT',
  success = 'SUCCESS',
  error = 'ERROR',

  // =============== DIVIDER ==================

  user = 'USER',
  info = 'INFO',
  setting = 'SETTING'

  // =============== DIVIDER ==================
}

export const NOT_FOUND_ROUTE = {
  name: AppRouteNames.notFound
}

export const layoutStyleConfig = {
  NAVBAR_HEIGHT: 64,
  BREAD_HEIGHT: 52,
  // TAB_HEIGHT
  FOOTER_HEIGHT: 35
} as const