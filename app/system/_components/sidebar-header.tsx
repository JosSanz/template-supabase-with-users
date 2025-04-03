'use client';

import Image from "next/image";
import Button from "@/app/_components/button";
import { MenuIcon } from "@/app/_components/icons";
import { useSidebarContext } from "./sidebar-state";

const SidebarHeader = () => {
    const { isOpen, setIsOpen } = useSidebarContext();
    
    return (
        <div className="flex justify-between gap-4 pb-4 border-b border-white">
            {isOpen && (
                <Image
                    src="/next.svg"
                    alt="Next.js logo"
                    height={38}
                    width={100}
                    className="invert"
                    priority
                />
            )}
            <Button
                variant="outline_light"
                className="!p-2"
                onClick={() => setIsOpen(!isOpen)}
            >
                <MenuIcon className="size-5" />
            </Button>
        </div>
    );
}
 
export default SidebarHeader;