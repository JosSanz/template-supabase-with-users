'use client';

import { Ref, useImperativeHandle, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";

const dropIn = {
    hidden: {
        x: '-100%',
        opacity: 0,
    },
    visible: {
        x: '0',
        opacity: 1,
        transition: {
            duration: 0.3,
            type: 'spring',
            damping: 25,
            stiffness: 500,
        },
    },
    exit: {
        x: '-100%',
        opacity: 0,
    },
};

export type ToastParams = (text: string, type?: 'success' | 'error' | 'warning' | 'info') => void

export interface ToastInterface {
    handleShowToast: ToastParams
}

export default function Toast({ 
    ref 
}:{
    ref: Ref<ToastInterface | undefined>
}) {
    const [ open, setOpen ] = useState(false);
    const [message, setMessage] = useState('');
    const [type, setType] = useState('');

    const handleShowToast:ToastParams = (text, type)=>{
        setType(
            type === 'success' ? 'bg-teal-100 border-teal-200 text-teal-800'
            : type === 'error' ? 'bg-red-100 border-red-200 text-red-800'
            : type === 'warning' ? 'bg-yellow-100 border-yellow-200 text-yellow-800'
            : 'bg-sky-100 border-sky-200 text-sky-800'
        );
        setMessage(text);
        setOpen(true);

        setTimeout(()=>{
            handleCloseToast();
        }, 5000);
    }

    const handleCloseToast = ()=>{
        setOpen(false);
        setMessage('');
        setType('');
    }

    useImperativeHandle(ref, ()=>({
        handleShowToast
    }));

    if (typeof window === "object") {
        return createPortal(
            <AnimatePresence
                initial={false}
                mode='wait'
                onExitComplete={() => null}
            >
            {open &&
                <motion.div
                    className='fixed bottom-8 end-8 z-[1000]'
                    variants={dropIn}
                    initial='hidden'
                    animate='visible'
                    exit='exit'
                >
                    <div 
                        className={`max-w-xs py-3 px-4 text-sm border rounded text-center text-balance ${type}`} 
                        role="alert" 
                    >
                        {message}
                    </div>
                
                </motion.div>
            }
            </AnimatePresence>,
            document.body
        ); 
    }

    return null;
}