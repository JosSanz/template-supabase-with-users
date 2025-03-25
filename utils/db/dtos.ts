import { User } from "@supabase/auth-js"
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

export interface UserListDto {
    users: UserInfoDto[]
    totalPages: number
}

export type UserInfoDto = Pick<User, "id" | "email" | "email_confirmed_at" | "app_metadata" | "user_metadata" | "last_sign_in_at">;

export interface UserMetadata {
    name: string
    lastnames: string
    phone: string
}

export interface CreateUserDto  {
    email: string
    metadata: UserMetadata
    roleIds: string[]
}

export interface UpdateUserDto  {
    email: string
    metadata: UserMetadata
    roleIds: string[]
}