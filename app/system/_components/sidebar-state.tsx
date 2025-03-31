'use client';

import { createContext, ReactNode, useContext, useState } from "react";

interface SidebarContextType {
    isOpen: boolean
    setIsOpen: (value: boolean) => void
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const useSidebarContext = ()=>{
    const context = useContext(SidebarContext);

    if(context === undefined){
        throw new Error('useSidebarContext must be used within a SystemProvider');
    }

    return context;
}

const SidebarState = ({ children }:{ children: ReactNode }) => {
    const [ isOpen, setIsOpen ] = useState(true);

    return (
        <SidebarContext
            value={{
                isOpen,
                setIsOpen
            }}
        >
            <nav className={`grid grid-cols-1 grid-rows-[auto_1fr_auto] bg-primary p-4 space-y-4 transition-all duration-300 ${isOpen ? "w-60" : "w-[70px]"}`}>
                {children}
            </nav>
        </SidebarContext>
    );
}
 
export default SidebarState;