'use client';

import ModalChangeStatus, { ModalChangeStatusInterface, ModalChangeStatusOpen } from "@/app/system/_components/modal-change-status";
import { useSystemContext } from "@/app/system/_components/system-state";
import Routes from "@/utils/libs/routes";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { createContext, ReactNode, useContext, useRef } from "react";

interface UsersContextType {
    onOpenModalChangeStatus: ModalChangeStatusOpen
}

const UsersContext = createContext<UsersContextType | undefined>(undefined);

export const useUsersContext = ()=>{
    const context = useContext(UsersContext);

    if(context === undefined){
        throw new Error('useUsersContext must be used within a SystemProvider');
    }

    return context;
}

const UsersState = ({ children }:{ children: ReactNode }) => {
    const { triggerToast } = useSystemContext();

    const pathName = usePathname();
    const { replace } = useRouter();

    const modalChangeStatusRef = useRef<ModalChangeStatusInterface | null>(null);

    const onOpenModalChangeStatus:ModalChangeStatusOpen = (id, isActive) => {
        modalChangeStatusRef.current?.handleOpen(id, isActive);
    }

    const handleConfirm = async (id: string):Promise<boolean> => {
        return await axios.patch(`${Routes.users.api}/${id}`)
            .then(() => {
                replace(pathName);
                return true;
            }).catch(error => {
                triggerToast(error.response.data?.message ?? 'Error al guardar', 'error');
                return false;
            });
    }

    return (
        <UsersContext.Provider
            value={{
                onOpenModalChangeStatus
            }}
        >
            {children}
            <ModalChangeStatus
                ref={modalChangeStatusRef}
                onConfirm={handleConfirm}
            ></ModalChangeStatus>
        </UsersContext.Provider>
    );
}
 
export default UsersState;