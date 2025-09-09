export enum PermissionType {
    MENU = 1,
    MODULE = 2,
    API = 3,
    ELEMENT = 4
}

export const PermissionTypeMap = new Map<PermissionType, string>([
    [PermissionType.MENU, '菜单'],
    [PermissionType.MODULE, '模块'],
    [PermissionType.API, '接口'],
    [PermissionType.ELEMENT, '元素']
])

// 访问级别权限位
export enum AccessLevel {
    PUBLIC = 0b001,   // 1 - 公开访问权限
    PROTECTED = 0b010, // 2 - 保护访问权限  
    PRIVATE = 0b100,    // 4 - 私有访问权限
}


export const AccessLevelMap = new Map<AccessLevel, string>([
    [AccessLevel.PUBLIC, '公开'],
    [AccessLevel.PROTECTED, '保护'],
    [AccessLevel.PRIVATE, '鉴权']
])


// 组合访问级别常量
export enum AllowedAccessLevels {
    PUBLIC_ONLY = AccessLevel.PUBLIC,   
    PROTECTED_ONLY = AccessLevel.PROTECTED,  
    PROTECTED_PUBLIC = AccessLevel.PROTECTED | AccessLevel.PUBLIC,   
    PRIVATE_ONLY = AccessLevel.PRIVATE,                                   
    PRIVATE_PUBLIC = AccessLevel.PRIVATE | AccessLevel.PUBLIC,                                                            
    PRIVATE_PROTECTED = AccessLevel.PRIVATE | AccessLevel.PROTECTED, 
    ALL = AccessLevel.PRIVATE | AccessLevel.PROTECTED | AccessLevel.PUBLIC, 
}

export enum Method {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
}