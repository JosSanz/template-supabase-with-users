import { Role } from "@/utils/db/entities";
import { FC } from "react";

interface RolesContainer {
    roles: Role[]
    assignedRoleIds: string[]
    onRoleClick: (id: string) => void
}

const RolesContainer:FC<RolesContainer> = (props) => {
    const { roles, assignedRoleIds, onRoleClick } = props;

    return (
        <div className="grid grid-cols-2 gap-x-3">
            <div className="space-y-2">
                <h4 className="text-sm font-medium">Roles disponibles</h4>
                <ul className="border border-neutral-300 rounded overflow-y-auto h-80">
                {roles.filter(r => !assignedRoleIds.includes(r.id)).map((r) => (
                    <RoleItem
                        key={r.id}
                        role={r}
                        onClick={onRoleClick}
                    />
                ))}
                </ul>
            </div>
            <div className="space-y-2">
                <h4 className="text-sm font-medium">Roles asignados</h4>
                <ul className="border border-neutral-300 rounded overflow-y-auto h-80">
                {roles.filter(r => assignedRoleIds.includes(r.id)).map((r) => (
                    <RoleItem
                        key={r.id}
                        role={r}
                        onClick={onRoleClick}
                    />
                ))}
                </ul>
            </div>
        </div>
    );
}

const RoleItem = ({ 
    role,
    onClick
}:{ 
    role: Role
    onClick: (id: string) => void
}) => {
    return (
        <li
            className="hover:bg-neutral-100 cursor-pointer px-4 py-1"
            onClick={() => onClick(role.id)}
        >{role.name}</li>
    )
}

export default RolesContainer;