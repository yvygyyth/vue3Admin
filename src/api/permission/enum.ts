export enum PermissionType {
    MENU = 1,
    USE = 2,
    API = 3
}

export const PermissionTypeMap = new Map<PermissionType, string>([
    [PermissionType.MENU, '菜单'],
    [PermissionType.USE, '功能'],
    [PermissionType.API, '接口']
])