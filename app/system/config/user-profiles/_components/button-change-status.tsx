'use client';

import { DeleteIcon, RestoreIcon } from "@/app/_components/icons";
import { FC } from "react";
import { useUserProfilesContext } from "./user-profiles-state";
import { Role } from "@/utils/db/entities";

interface ButtonChangeStatusProps {
    data: Role
}

const ButtonChangeStatus:FC<ButtonChangeStatusProps> = (props) => {
    const { onOpenModalChangeStatus } = useUserProfilesContext();

    const { data } = props;

    const handleClick = () => {
        onOpenModalChangeStatus(data.id, data.active);
    }

    return (
        <button
            onClick={handleClick}
            className="table-button"
        >
            {data.active ?
                <DeleteIcon />
            :
                <RestoreIcon />
            }
        </button>
    );
}
 
export default ButtonChangeStatus;