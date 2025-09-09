import type { SecretSearch } from '@/api/secret'

export const REFRESH_LIST_EVENT = 'SECRET_REFRESH_LIST'

export const defaultSearchForm: SecretSearch = {
    keyword: '',
    timeRange: [undefined, undefined],
    page: 1,
    limit: 10
}
