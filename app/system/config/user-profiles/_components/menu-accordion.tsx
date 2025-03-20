import { PermissionGroup } from "@/utils/db/dtos";
import { FC, Fragment } from "react";
import CrudChecks from "./crud-checks";
import { useUserProfilesContext } from "./form";

interface MenuAccordionProps {
    data: PermissionGroup
}

const menus = [
    {
        key: 'config',
        label: 'Configuración'
    }
]

const MenuAccordion:FC<MenuAccordionProps> = (props) => {
    const { data } = props;

    const { permissions } = useUserProfilesContext();

    return (
        <>
            <div className="p-2 bg-primary-light border-b border-primary">
                <h5 className="font-medium">{menus.find(m => m.key === data.key)?.label ?? data.key}</h5>
            </div>
            <CrudChecks
                className="bg-primary-light border-b border-primary"
                menu={data.key}
            />
            {data.actions.map((action) => (
                <Fragment key={action.id}>
                    <div className="pl-6 pr-2 py-2 border-b border-neutral-300">{action.name}</div>
                    <CrudChecks
                        className="border-b border-neutral-300"
                        menu={data.key}
                        permission_id={action.id}
                        permits={permissions.find(p => p.permission_id === action.id)}
                    />
                </Fragment>
            ))}
        </>
    );
}
 
export default MenuAccordion;