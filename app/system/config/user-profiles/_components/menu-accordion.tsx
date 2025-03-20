import { PermissionGroup } from "@/utils/db/dtos";
import { FC } from "react";
import Checkbox from "@/app/_components/checkbox";

interface MenuAccordionProps {
    data: PermissionGroup
}

const MenuAccordion:FC<MenuAccordionProps> = (props) => {
    const { data } = props;

    return (
        <>
            <div className="p-2">
                <h5>{data.key}</h5>
            </div>
            <div className="flex items-center justify-center p-2">
                <Checkbox />
            </div>
            <div className="flex items-center justify-center p-2">
                <Checkbox />
            </div>
            <div className="flex items-center justify-center p-2">
                <Checkbox />
            </div>
            <div className="flex items-center justify-center p-2">
                <Checkbox />
            </div>
            {/* {data.crud_actions.map((action) => (
                <div key={action.id}>{action.name}</div>
            ))} */}
        </>
    );
}
 
export default MenuAccordion;