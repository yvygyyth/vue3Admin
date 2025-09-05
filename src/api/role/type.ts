import type { Pagination } from '@/types/global';
import type { TimeRange } from '@/types/global';

export type Role = {
    id: number;
    name: string;
    description: string;
    created_at: number;
}

export type RoleWithPermissions = {
    id: number;
    name: string;
    description: string;
    created_at: number;
    permissionIds: number[];
}

//角色创建输入类型
export type CreateRoleInput = {
    name: string;
    description: string;
    permissionIds: number[];
};

// 权限更新输入类型
export type UpdateRoleInput = {
    id: number;
    name?: string;
    description?: string;
    permissionIds?: number[];
};


// 权限保存泛型类型 - 根据是否有id来区分创建和更新
export type RoleSave<T extends { id?: number } = { id?: number }> = 
    T extends { id: number } 
        ? UpdateRoleInput 
        : CreateRoleInput;


export type RoleSearch = {
    keyword?: string;
    time_range?: TimeRange;
} & Pagination;