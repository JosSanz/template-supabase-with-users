'use client';

import { DeleteIcon, RestoreIcon } from "@/app/_components/icons";
import { FC } from "react";
import { useUsersContext } from "./users-state";
import { UserInfoDto } from "@/utils/db/dtos";

interface ButtonChangeStatusProps {
    data: UserInfoDto
}

const ButtonChangeStatus:FC<ButtonChangeStatusProps> = (props) => {
    const { onOpenModalChangeStatus } = useUsersContext();

    const { data } = props;

    const handleClick = () => {
        onOpenModalChangeStatus(data.id, data.app_metadata.active ?? false);
    }

    return (
        <button
            onClick={handleClick}
            className="table-button"
        >
            {(data.app_metadata.active ?? false) ?
                <DeleteIcon />
            :
                <RestoreIcon />
            }
        </button>
    );
}
 
export default ButtonChangeStatus;