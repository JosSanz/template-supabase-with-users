export interface PermissionGroup {
    key: string
    crud_actions: {
        id: string
        name: string
        key: string
    }[],
    tasks: {
        id: string
        name: string
        key: string
    }[],
}