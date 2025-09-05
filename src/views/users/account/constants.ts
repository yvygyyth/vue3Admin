import type { UserSearch } from '@/api/account'

export const REFRESH_LIST_EVENT = 'USER_REFRESH_LIST'

export const defaultSearchForm: UserSearch = {
    account: undefined,
    nickname: undefined,
    roles: undefined,
    timeRange: undefined,
    page: 1,
    limit: 10
}
