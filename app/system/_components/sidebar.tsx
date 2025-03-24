'use client';

import { useState } from "react";
import Image from "next/image";
import Button from "@/app/_components/button";
import { MenuIcon, UserIcon } from "@/app/_components/icons";
import Menus from "./menus";
import { User } from "@supabase/auth-js";

const Sidebar = ({
    user
}:{
    user: User
}) => {
    const [ isOpen, setIsOpen ] = useState(true);

    return (
        <nav className={`grid grid-rows-[auto_1fr_auto] bg-primary p-4 space-y-4 transition-all duration-300 ${isOpen ? "w-60" : "w-[70px]"}`}>
            <div className="flex justify-between gap-4 pb-4 border-b border-white">
                {isOpen &&
                    <Image
                        src="/next.svg"
                        alt="Next.js logo"
                        height={38}
                        width={100}
                        className="invert"
                        priority
                    />
                }
                <Button variant="outline-light" className="!p-2" onClick={() => setIsOpen(!isOpen)}>
                    <MenuIcon className="size-5"/>
                </Button>
            </div>
            <Menus isOpen={isOpen}/>
            <div className="text-white">
            {isOpen &&
                <div className="flex gap-2 items-center">
                    <UserIcon className="size-8"/>
                    <div>
                        <p className="text-sm line-clamp-1">{user.user_metadata.name ?? ""}</p>
                        <p className="text-xs line-clamp-1">{user.email}</p>
                    </div>
                </div>
            }
            </div>
        </nav>
    );
}
 
export default Sidebar;