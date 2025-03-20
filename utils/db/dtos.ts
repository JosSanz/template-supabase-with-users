import { Role, RolePermission } from "./entities"

export interface PermissionGroup {
    key: string
    actions: {
        id: string
        name: string
        key: string
        crud: boolean
    }[]
}

export type RoleDto = Role & {
    role_permissions: RolePermission[]
}

export type CreateRoleDto = Pick<Role, "name"> & {
    permits: Omit<RolePermission, "role_id">[]
};

export type UpdateRoleDto = Pick<Role, "name"> & {
    permits: Omit<RolePermission, "role_id">[]
};