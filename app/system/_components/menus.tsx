'use client';

import { HomeIcon, SettingsIcon, UserIcon } from "@/app/_components/icons";
import { Routes } from "@/utils/libs/routes";
import MenuItem from "./menu-item";
import MenuDropDown from "./menu-dropdown";

export interface SubmenuInterface {
    label: string
    href: string
}

export interface MenuInterface {
    icon: React.FC<React.SVGProps<SVGSVGElement>>
    label: string
    href?: string
    submenus?: SubmenuInterface[]
}

const menus:MenuInterface[] = [
    {
        icon: HomeIcon,
        label: "Inicio",
        href: Routes.home
    },
    {
        icon: UserIcon,
        label: "Menu ejemplo",
        submenus: [
            {
                label: "Submenú 1",
                href: ''
            },
            {
                label: "Submenú 2",
                href: ''
            }
        ]
    },
    {
        icon: SettingsIcon,
        label: "Configuración",
        submenus: [
            {
                label: "Roles",
                href: Routes.user_profiles.list
            },
            {
                label: "Usuarios",
                href: Routes.users.list
            }
        ]
    }
]

const Menus = ({
    isOpen
}:{
    isOpen: boolean
}) => {
    return (
        <ul className="space-y-2">
        {menus.map((menu, index) => (
            menu.submenus ?
            <MenuDropDown key={index} item={menu} sidebarOpen={isOpen}/> 
            : <MenuItem key={index} item={menu} sidebarOpen={isOpen}/>
        ))}
        </ul>
    );
}
 
export default Menus;