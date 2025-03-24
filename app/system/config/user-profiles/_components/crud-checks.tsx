import Checkbox from "@/app/_components/checkbox";
import { FC } from "react";
import { PermissionCRUD, useUserProfilesContext } from "./form";

interface CrudCheckProps {
    className?: string
    menu: string
    permission_id?: string
    permits?: PermissionCRUD
}

const CrudChecks:FC<CrudCheckProps> = (props) => {
    const { className, menu, permission_id, permits } = props;

    const { handlePermissionChange } = useUserProfilesContext();

    const handleCheckClick = (action: 'CREATE' | 'READ' | 'UPDATE' | 'DELETE') => {
        handlePermissionChange({
            menu,
            permission_id,
            action
        });
    }

    return (
        <>
            <div className={`flex items-center justify-center p-2 ${className}`}>
                <Checkbox 
                    onChange={() => handleCheckClick('CREATE')}
                    checked={permits?.create ?? false}
                />
            </div>
            <div className={`flex items-center justify-center p-2 ${className}`}>
                <Checkbox 
                    onChange={() => handleCheckClick('READ')}
                    checked={permits?.read ?? false}
                />
            </div>
            <div className={`flex items-center justify-center p-2 ${className}`}>
                <Checkbox 
                    onChange={() => handleCheckClick('UPDATE')}
                    checked={permits?.update ?? false}
                />
            </div>
            <div className={`flex items-center justify-center p-2 ${className}`}>
                <Checkbox 
                    onChange={() => handleCheckClick('DELETE')}
                    checked={permits?.delete ?? false}
                />
            </div>
        </>
    );
}
 
export default CrudChecks;