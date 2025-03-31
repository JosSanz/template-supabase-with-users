import Menus from "./menus";
import { User } from "@supabase/auth-js";
import MenuUser from "./menu-user";
import SidebarState from "./sidebar-state";
import SidebarHeader from "./sidebar-header";
import { HomeIcon, SettingsIcon, UserIcon } from "@/app/_components/icons";
import Routes from "@/utils/libs/routes";
import { getUserPermits } from "@/utils/db/queries";
import { JSX } from "react";

export interface SubmenuInterface {
    key: string
    label: string
    href: string
}

export interface MenuInterface {
    key: string
    icon: JSX.Element
    label: string
    href?: string
    submenus?: SubmenuInterface[]
}

const menus:MenuInterface[] = [
    {
        key: "home",
        icon: <HomeIcon className="size-5" />,
        label: "Inicio",
        href: Routes.home
    },
    {
        key: "example",
        icon: <UserIcon className="size-5" />,
        label: "Menu ejemplo",
        submenus: [
            {
                key: "sub1",
                label: "Submenú 1",
                href: ''
            },
            {
                key: "sub2",
                label: "Submenú 2",
                href: ''
            }
        ]
    },
    {
        key: "config",
        icon: <SettingsIcon className="size-5" />,
        label: "Configuración",
        submenus: [
            {
                key: "roles",
                label: "Roles",
                href: Routes.user_profiles.list
            },
            {
                key: "users",
                label: "Usuarios",
                href: Routes.users.list
            }
        ]
    }
]

export default async function Sidebar ({
    user
}:{
    user: User
}) {
    const userPermits = await getUserPermits(user.id);

    const menusToShow:MenuInterface[] = [ menus[0] ]; // Include home by default

    for (const menu of menus) {
        if (menu.submenus) {
            const auxMenu: MenuInterface = {
                ...menu,
                submenus: []
            };

            for (const sub of menu.submenus) {
                if (userPermits.findIndex(p => p.menu === menu.key && p.key === sub.key && p.read) >= 0) {
                    auxMenu.submenus?.push(sub);
                }
            }

            if ((auxMenu.submenus?.length ?? 0) > 0) {
                menusToShow.push(auxMenu);
            }
        }
    }

    return (
        <SidebarState>
            <SidebarHeader />
            <Menus menus={menusToShow} />
            <MenuUser user={user} />
        </SidebarState>
    );
}