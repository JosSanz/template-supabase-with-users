'use client';

import { createContext, ReactNode, useContext, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import ModalDiscardChanges, { ModalDiscardChangesInterface } from "./modal-discard-changes";
import Toast, { ToastInterface, ToastParams } from "@/app/_components/toast";

interface SystemContextType {
    isDirty: () => boolean
    setIsDirty: (value: boolean) => void
    openModalDiscardChanges: (_path: string) => void
    triggerToast: ToastParams
}

const SystemContext = createContext<SystemContextType | undefined>(undefined);

export const useSystemContext = ()=>{
    const context = useContext(SystemContext);

    if(context === undefined){
        throw new Error('useSystemContext must be used within a SystemProvider');
    }

    return context;
}

const SystemState = ({ children }:{ children: ReactNode }) => {
    const currentPath = usePathname();

    const [ isDirty, setIsDirty ] = useState(false);

    const modalDiscardChangesRef = useRef<ModalDiscardChangesInterface>(null);
    const toastRef = useRef<ToastInterface>(null);

    useEffect(() => {
        setIsDirty(false);
    }, [ currentPath ]);

    const openModalDiscardChanges = (path: string) => {
        modalDiscardChangesRef.current?.handleOpen(path);
    }

    const triggerToast:ToastParams = (text, type) => {
        toastRef.current?.handleShowToast(text, type);
    }

    return (
        <SystemContext.Provider
            value={{
                isDirty: () => isDirty,
                setIsDirty: setIsDirty,
                openModalDiscardChanges: openModalDiscardChanges,
                triggerToast: triggerToast
            }}
        >
            {children}
            <ModalDiscardChanges ref={modalDiscardChangesRef} />
            <Toast ref={toastRef} />
        </SystemContext.Provider>
    );
}
 
export default SystemState;