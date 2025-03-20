export interface Permit {
    id: string
    name: string
    key: string
    menu: string
    crud: boolean
}

export interface Role {
    id: string
    name: string
    created_at: string
    updated_at: string
}

export interface RolePermission {
    role_id: string
    permission_id: string
    create: boolean
    read: boolean
    update: boolean
    delete: boolean
}