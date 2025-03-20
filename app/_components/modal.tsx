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
                    className='backdrop'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        onClick={(e) => e.stopPropagation()}  // Prevent click from closing modal
                        className={`modal ${className}`}
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
        <div className='modal__body'>
            {children}
        </div>
    );
}

export const ModalFooter = ({ children }:{ children: React.ReactNode }) => {
    return (
        <div className='modal__footer'>
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
        <div className='modal__header'>
            <h4>{title}</h4>
            {closeButton && 
                <button onClick={handleClose}>
                    <CloseIcon />
                </button>
            }
        </div>
    );
}