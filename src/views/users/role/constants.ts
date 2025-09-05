import type { RoleSearch } from '@/api/role'

export const REFRESH_LIST_EVENT = 'ROLE_REFRESH_LIST'

export const defaultSearchForm: RoleSearch = {
    keyword: undefined,
    time_range: undefined,
    page: 1,
    limit: 10
}
