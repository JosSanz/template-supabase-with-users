import Tooltip from "@/app/_components/tooltip";
import { MenuInterface } from "./menus";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const sidebarOpenVariants = {
    initial: {
        opacity: 0,
        height: 0
    },
    animate: {
        opacity: 1,
        height: 'auto'
    },
    exit: {
        opacity: 0,
        height: 0
    }
}

const sidebarCloseVariants = {
    initial: {
        opacity: 0,
        x: -16
    },
    animate: {
        opacity: 1,
        x: 0
    },
    exit: {
        opacity: 0,
        x: -16
    }
}

const MenuDropDown = ({
    item,
    sidebarOpen
}:{
    item: MenuInterface
    sidebarOpen: boolean
}) => {
    const { icon: MenuIcon, label, submenus } = item;

    const [ isOpen, setIsOpen ] = useState(false);

    const menuRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
    
        if (sidebarOpen) {
            document.removeEventListener("mousedown", handleClickOutside)
        }
        else {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [ sidebarOpen ]);

    if (!submenus) return null;

    return (
        <li className="relative">
            <button
                ref={menuRef}
                className="group w-full relative cursor-pointer flex items-center gap-2 text-white p-2 rounded transition hover:bg-primary-hover"
                onClick={() => setIsOpen(!isOpen)}
            >
                <MenuIcon className="size-5"/>
                {sidebarOpen && <span>{label}</span>}
                {!sidebarOpen && <Tooltip text={label} position="right"/>}
            </button>
            <AnimatePresence mode="wait">
            {isOpen &&
                <motion.div
                    variants={sidebarOpen ? sidebarOpenVariants : sidebarCloseVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className={`${sidebarOpen ? '' : 'overflow-y-hidden absolute left-[54px] top-0 shadow rounded-r-sm z-10'} bg-primary text-white`}
                >
                    <ul className={sidebarOpen ? 'pl-8' : ''}>
                        {submenus.map((item, index) => (
                            <li key={index}>
                                <Link href={item.href} className="block p-2 rounded hover:bg-primary-hover">
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </motion.div>
            }
            </AnimatePresence>
        </li>
    );
}
 
export default MenuDropDown;