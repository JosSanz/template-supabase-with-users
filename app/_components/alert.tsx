'use client';

import { AnimatePresence, motion } from "motion/react";
import { FC } from "react";

interface AlertProps {
    isVisible: boolean
    text: string
    variant: 'success' | 'danger' | 'warning' | 'info'
    key?: string
}

const Alert:FC<AlertProps> = (props) => {
    const { isVisible, text, variant, key} = props;

    const classVariant = 
        variant === 'success' ? 'bg-green-100 text-green-800' :
        variant === 'danger' ? 'bg-red-200 text-red-700' :
        variant === 'warning' ? 'bg-yellow-100 text-yellow-800' :
        variant === 'info' ? 'bg-blue-100 text-blue-800' : '';

    return (
        <AnimatePresence initial={false}>
        {isVisible ? 
            <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1, transition: { duration: 0.3 } }}
                exit={{ opacity: 0, scale: 0, transition: { duration: 0.3 } }}
                className={`overflow-hidden text-sm py-2 px-4 rounded ${classVariant}`}
                key={key}
            >
                <p>{text}</p>
            </motion.div>
        : null}
        </AnimatePresence>
    );
}
 
export default Alert;