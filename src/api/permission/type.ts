import type { AccessLevel, PermissionType, Method, AllowedAccessLevels } from './enum'

export type Permission = {
    id: number;
    code: string;
    name: string;
    type: PermissionType;
    access_level: AccessLevel;
    allowed_access_levels: AllowedAccessLevels;
    method?: Method | null;
    route?: string | null;
    parent_id?: number | null;
    created_at: number;
}

export type PermissionTree = {
    children: PermissionTree[];
} & Permission


export type PermissionNode = {
    hasChildren: boolean;
} & Permission

// 权限查询参数
export type PermissionSearch = {
    parent_id?: number;
}

// 权限创建输入类型
export type CreatePermissionInput = {
    code: string;
    name: string;
    type: PermissionType;
    access_level: AccessLevel;
    method?: Method | null;
    route?: string | null;
    parent_id?: number | null;
};

// 权限更新输入类型
export type UpdatePermissionInput = {
    id: number;
    code: string;
    name: string;
    type: PermissionType;
    access_level: AccessLevel;
    method?: Method | null;
    route?: string | null;
    parent_id?: number | null;
};

// 权限保存泛型类型 - 根据是否有id来区分创建和更新
export type PermissionSave<T extends { id?: number } = { id?: number }> = 
    T extends { id: number } 
        ? UpdatePermissionInput 
        : CreatePermissionInput;