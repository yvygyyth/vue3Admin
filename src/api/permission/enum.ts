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


export enum PermissionIsPublic {
    PUBLIC = 1,
    PRIVATE = 0
}

export const PermissionIsPublicMap = new Map<PermissionIsPublic, string>([
    [PermissionIsPublic.PUBLIC, '公开'],
    [PermissionIsPublic.PRIVATE, '鉴权']
])