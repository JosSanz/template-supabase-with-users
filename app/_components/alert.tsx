'use client';

import { FC } from "react";
import { AnimatePresence, motion } from "motion/react";

const AlertVariants = {
    success: 'bg-green-100 text-green-800',
    danger: 'bg-red-200 text-red-700',
    warning: 'bg-yellow-100 text-yellow-800',
    info: 'bg-blue-100 text-blue-800'
}

type AlertVariantKeys = keyof typeof AlertVariants;

interface AlertProps {
    isVisible: boolean
    text: string
    variant: AlertVariantKeys
    key?: string
}

const Alert:FC<AlertProps> = (props) => {
    const { isVisible, text, variant, key} = props;

    const classVariant = AlertVariants[variant];

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