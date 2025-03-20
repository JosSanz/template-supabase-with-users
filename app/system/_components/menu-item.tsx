import Tooltip from "@/app/_components/tooltip";
import { MenuInterface } from "./menus";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";

const MenuItem = ({
    item,
    sidebarOpen
}:{
    item: MenuInterface
    sidebarOpen: boolean
}) => {
    const { icon: MenuIcon, label, href} = item;

    return (
        <li>
            <Link
                href={href ?? ''}
                className="group relative cursor-pointer min-h-[40px] flex items-center gap-2 text-white p-2 rounded transition hover:bg-primary-hover"
            >
                <MenuIcon className="size-5"/>
                {sidebarOpen && <span>{label}</span>}
                {!sidebarOpen && <Tooltip text={label} position="right"/>}
            </Link>
        </li>
    );
}
 
export default MenuItem;