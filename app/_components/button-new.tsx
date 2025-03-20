'use client';

import { FC } from "react";
import Button from "./button";
import { PlusIcon } from "./icons";
import { redirect } from "next/navigation";

interface ButtonNewProps {
    linkTo?: string
    onClick?: () => void
}

const ButtonNew:FC<ButtonNewProps> = (props) => {
    const { linkTo, onClick } = props;

    const handleClick = () => {
        if (linkTo) {
            redirect(linkTo);
        } else if (onClick) {
            onClick();
        }
    }

    return (
        <Button
            variant="primary"
            type="button"
            onClick={handleClick}
        >
            <PlusIcon className="size-5" />
            <span>Nuevo</span>
        </Button>
    );
}
 
export default ButtonNew;