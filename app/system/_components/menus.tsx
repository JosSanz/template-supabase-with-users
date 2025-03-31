'use client';

import MenuItem from "./menu-item";
import MenuDropDown from "./menu-dropdown";
import { MenuInterface } from "./sidebar";

export default function Menus({
    menus
}:{
    menus: MenuInterface[]
}) {
    return (
        <ul className="space-y-2">
        {menus.map((menu, index) => (
            menu.submenus ?
            <MenuDropDown key={index} item={menu} /> 
            : <MenuItem key={index} item={menu}/>
        ))}
        </ul>
    );
}