import { Ref, useImperativeHandle, useState } from "react";
import { useRouter } from "next/navigation";
import Button from '@/app/_components/button';
import { WarningIcon } from "@/app/_components/icons";
import Modal, { ModalBody, ModalFooter } from "@/app/_components/modal";

export type ModalDiscardChangesOpen = (_path: string) => void;

export interface ModalDiscardChangesInterface {
    handleOpen: ModalDiscardChangesOpen
}

const ModalDiscardChanges = ({
    ref
}:{
    ref: Ref<ModalDiscardChangesInterface | undefined>
}) => {
    const router = useRouter();

    const [ isOpen, setIsOpen ] = useState(false);
    const [ path, setPath ] = useState('');

    useImperativeHandle(ref, ()=>({
        handleOpen
    }));

    const handleOpen:ModalDiscardChangesOpen = (_path) => {
        setPath(_path);
        setIsOpen(true);
    }

    const handleClose = () => {
        setIsOpen(false);
        setPath('');
    }

    const handleDiscard = () => {
        router.push(path);
        handleClose();
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
                        <h2 className="text-center text-lg font-semibold text-gray-900">¡Alerta!</h2>
                        <p className="text-gray-600 text-center">
                            Tiene cambios sin guardar, ¿seguro que desea salir de la página?
                        </p>
                    </div>
                </div>
            </ModalBody>
            <ModalFooter>
                <Button 
                    variant='light' 
                    onClick={handleClose}
                >Cancelar</Button>
                <Button 
                    onClick={handleDiscard}
                >Continuar</Button>
            </ModalFooter>
        </Modal>
    );
}
 
export default ModalDiscardChanges;