import { Ref, useImperativeHandle, useState } from "react";
import Button from '@/app/_components/button';
import { WarningIcon } from "@/app/_components/icons";
import Modal, { ModalBody, ModalFooter } from "@/app/_components/modal";

export type ModalChangeStatusOpen = (_id: string, _isActive: boolean) => void;

export interface ModalChangeStatusInterface {
    handleOpen: ModalChangeStatusOpen
}

const ModalChangeStatus = ({
    onConfirm,
    ref
}:{
    onConfirm: (id: string) => Promise<boolean>
    ref: Ref<ModalChangeStatusInterface | undefined>
}) => {
    const [ isSaving, setSaving ] = useState(false);
    const [ isOpen, setIsOpen ] = useState(false);
    const [ id, setId ] = useState('');
    const [ isActive, setIsActive ] = useState(false);

    useImperativeHandle(ref, ()=>({
        handleOpen
    }));

    const handleOpen:ModalChangeStatusOpen = (_id, _isActive) => {
        setId(_id);
        setIsActive(_isActive);
        setIsOpen(true);
    }

    const handleConfirm = async () => {
        setSaving(true);

        const success = await onConfirm(id);

        if (success) {
            handleClose();
        }

        setSaving(false);
    }

    const handleClose = () => {
        setIsOpen(false);
        setIsActive(false);
        setId('');
    }

    return (
        <Modal
            open={isOpen}
            className="md:max-w-sm"
        >
            <ModalBody>
                <div className="flex items-center gap-4">
                    <WarningIcon className="size-[5em] text-yellow-500"  />
                    <div className="flex-1">
                        <h2 className="text-center text-lg font-semibold text-gray-900">Cambio de estatus</h2>
                        <p className="text-gray-600 text-center">
                            ¿Está seguro que desea <b>{isActive ? "DESACTIVAR" : "ACTIVAR"}</b> el registro?
                        </p>
                    </div>
                </div>
            </ModalBody>
            <ModalFooter>
                <Button 
                    variant='light' 
                    onClick={handleClose}
                    disabled={isSaving}
                >Cancelar</Button>
                <Button 
                    onClick={handleConfirm}
                    onLoading={isSaving}
                    variant="warning"
                >Continuar</Button>
            </ModalFooter>
        </Modal>
    );
}
 
export default ModalChangeStatus;