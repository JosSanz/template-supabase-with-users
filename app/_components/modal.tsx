"use client";

import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { CloseIcon } from "./icons";

const dropIn = {
    hidden: {
        y: '-100vh',
        opacity: 0,
    },
    visible: {
        y: '0',
        opacity: 1,
        transition: {
            duration: 0.1,
            type: 'spring',
            damping: 25,
            stiffness: 500,
        },
    },
    exit: {
        y: '100vh',
        opacity: 0,
    },
};

export default function Modal({
    className = 'md:max-w-lg',
    open,
	children,
}: Readonly<{
    className?: string
    open: boolean
	children: React.ReactNode
}>) {
    if (typeof window === "object") {
        return createPortal(
            <AnimatePresence
                initial={false}
                mode='wait'
                onExitComplete={() => null}
            >
            {open &&
                <motion.div 
                    className='fixed z-[--z-index-modal] top-0 left-0 flex items-center justify-center w-screen h-dvh bg-neutral-900/50'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        onClick={(e) => e.stopPropagation()}  // Prevent click from closing modal
                        className={`w-[95%] bg-white rounded-md shadow-lg ${className}`}
                        variants={dropIn}
                        initial='hidden'
                        animate='visible'
                        exit='exit'
                    >
                        {children}
                    </motion.div>
                </motion.div>
            }
            </AnimatePresence>,
            document.body
        );
    }

    return null
}

export const ModalBody = ({ children }:{ children: React.ReactNode }) => {
    return (
        <div className='py-3 px-4 grid gap-4'>
            {children}
        </div>
    );
}

export const ModalFooter = ({ children }:{ children: React.ReactNode }) => {
    return (
        <div className='py-3 px-4 flex items-center justify-end gap-2 border-t border-neutral-300'>
            {children}
        </div>
    );
}

export const ModalHeader = ({ 
    closeButton, // Añade un botón para cerrar el modal 
    title, // Texto del encabezado
    handleClose, // Función para cerrar el modal, requerida si el botón se añade
}:{
    closeButton?: boolean | undefined
    title: string,
    handleClose?: () => void
}) => {
    return (
        <div className='py-3 px-4 flex items-center justify-between border-b border-neutral-300'>
            <h4 className="text-sm font-bold">{title}</h4>
            {closeButton && 
                <button onClick={handleClose} className="text-neutral-400 hover:text-primary">
                    <CloseIcon className="size-4"/>
                </button>
            }
        </div>
    );
}