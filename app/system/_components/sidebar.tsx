'use client';

import { useState } from "react";
import Image from "next/image";
import Button from "@/app/_components/button";
import { MenuIcon } from "@/app/_components/icons";
import Menus from "./menus";

const Sidebar = () => {
    const [ isOpen, setIsOpen ] = useState(false);

    return (
        <nav className={`bg-primary p-4 space-y-4 transition-all duration-300 ${isOpen ? "w-80" : "w-[70px]"}`}>
            <div className="flex justify-between gap-4">
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
            <hr className="border-white"/>
            <Menus isOpen={isOpen}/>
        </nav>
    );
}
 
export default Sidebar;