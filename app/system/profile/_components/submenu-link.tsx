'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";

interface SubmenuLinkProps {
    params: {
        path: string
        label: string
    }
}

const SubmenuLink:FC<SubmenuLinkProps> = (props) => {
    const { params } = props;

    const pathName = usePathname();

    return (
        <li>
            <Link
                href={params.path}
                className={`block p-2 font-medium ${pathName === params.path ? "text-inherit" : "text-neutral-500 hover:text-inherit"}`}
            >{params.label}</Link>
        </li>
    );
}
 
export default SubmenuLink;