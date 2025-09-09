export enum LocaleOptions {
  cn = 'zh-CN',
  en = 'en-US'
}
export enum LocalStorageKey {
  loginFormKey = 'VUE_TSX_ADMIN_LOGIN_FORM_INFO',
  localeKey = 'LOCAL_LOCALE_KEY'
}
export enum AppTheme {
  light = 'light',
  dark = 'dark'
}

export enum ApplicationInfo {
  appTitle = import.meta.env.VITE_APP_TITLE
}

// component name
// route name
// keepalive require component name to same
export enum ViewNames {
  login = 'login',
  redirect = 'redirect',
  notFound = 'notFound',

  // =============== DIVIDER ==================
  dashboard = 'dashboard',

  workplace = 'workplace',
  monitor = 'monitor',

  // =============== DIVIDER ==================

  exception = 'exception',

  _403 = '403',
  _404 = '404',
  _500 = '500',

  // =============== DIVIDER ==================
  form = 'form',

  step = 'step',
  group = 'group',
  // =============== DIVIDER ==================
  profile = 'profile',

  // =============== DIVIDER ==================

  list = 'list',

  searchTable = 'searchTable',
  cardList = 'cardList',
  // =============== DIVIDER ==================
  result = 'result',

  success = 'success',
  error = 'error',

  // =============== DIVIDER ==================

  user = 'user',

  info = 'info',

  // =============== DIVIDER ==================

  users = 'users',

  permission = 'permission',
  role = 'role',
  account = 'account',

  // =============== DIVIDER ==================

  software = 'software',

  // =============== DIVIDER ==================
  setting = 'setting'
}

export const layoutStyleConfig = {
  navbarHeight: 64,
  breadcrumbHeight: 52,
  tabHeight: 40,
  footerHeight: 35
} as const

export enum ResCode {
  success = 200,
  error = 500,
  illegalToken = 508,
  expiredToken = 514,
  // Other clients logged
  otherLogin = 512
}
