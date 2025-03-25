import { UserIcon } from "@/app/_components/icons";
import { User } from "@supabase/auth-js";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { SignOutButton } from "./sign-out-button";
import Routes from "@/utils/libs/routes";

const variants = {
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

const MenuUser = ({
    sidebarOpen,
    user
}:{
    sidebarOpen: boolean
    user: User
}) => {
    const [ isOpen, setIsOpen ] = useState(false);

    const menuRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
    
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [ ]);

    return (
        <div className="relative">
            <button
                ref={menuRef}
                className="group w-full relative cursor-pointer flex items-center gap-2 text-white p-2 rounded transition hover:bg-primary-hover"
                onClick={() => setIsOpen(!isOpen)}
            >
                <UserIcon className={`transition-all ${sidebarOpen ? "size-8" : "size-5"}`}/>
                {sidebarOpen && 
                    <div className="text-start">
                        <p className="text-sm line-clamp-1">{user.user_metadata.name ?? ""} {user.user_metadata.lastnames ?? ""}</p>
                        <p className="text-xs line-clamp-1">{user.email}</p>
                    </div>
                }
            </button>
            <AnimatePresence mode="wait">
            {isOpen &&
                <motion.div
                    variants={variants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className='overflow-y-hidden absolute left-[calc(100%+16px)] bottom-0 shadow rounded-r-sm z-10 bg-primary text-white'
                >
                    <ul>
                        <li>
                            <Link href={Routes.profile.info} className="block p-2 rounded hover:bg-primary-hover text-nowrap">
                                Perfil
                            </Link>
                        </li>
                        <li>
                            <SignOutButton className="block p-2 rounded hover:bg-primary-hover text-nowrap cursor-pointer" />
                        </li>
                    </ul>
                </motion.div>
            }
            </AnimatePresence>
        </div>
    );
}
 
export default MenuUser;