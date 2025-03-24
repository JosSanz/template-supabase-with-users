'use client';

import ModalChangeStatus, { ModalChangeStatusInterface, ModalChangeStatusOpen } from "@/app/system/_components/modal-change-status";
import { useSystemContext } from "@/app/system/_components/system-state";
import Routes from "@/utils/libs/routes";
import axios from "axios";
import { createContext, ReactNode, useContext, useRef } from "react";

interface UserProfilesContextType {
    onOpenModalChangeStatus: ModalChangeStatusOpen
}

const UserProfilesContext = createContext<UserProfilesContextType | undefined>(undefined);

export const useUserProfilesContext = ()=>{
    const context = useContext(UserProfilesContext);

    if(context === undefined){
        throw new Error('useUserProfilesContext must be used within a SystemProvider');
    }

    return context;
}

const UserProfilesState = ({ children }:{ children: ReactNode }) => {
    const { triggerToast } = useSystemContext();

    const modalChangeStatusRef = useRef<ModalChangeStatusInterface | null>(null);

    const onOpenModalChangeStatus:ModalChangeStatusOpen = (id, isActive) => {
        modalChangeStatusRef.current?.handleOpen(id, isActive);
    }

    const handleConfirm = async (id: string):Promise<boolean> => {
        return await axios.patch(`${Routes.user_profiles.api}/${id}`)
            .then(() => {
                return true;
            }).catch(error => {
                triggerToast(error.response.data?.message ?? 'Error al procesar archivo', 'error');
                return false;
            });
    }

    return (
        <UserProfilesContext.Provider
            value={{
                onOpenModalChangeStatus
            }}
        >
            {children}
            <ModalChangeStatus
                ref={modalChangeStatusRef}
                onConfirm={handleConfirm}
            ></ModalChangeStatus>
        </UserProfilesContext.Provider>
    );
}
 
export default UserProfilesState;