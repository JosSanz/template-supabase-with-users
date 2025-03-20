'use client';

import React, { FC, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRightIcon, ArrowBottomIcon } from './icons';

interface AccordionProps {
    header: React.ReactNode
    initialOpen?: boolean
    className?: string
    childrenClassName?: string
    children: React.ReactNode
}

const Accordion:FC<AccordionProps> = ({
    header,
    initialOpen = false,
    className,
    childrenClassName = '',
    children 
}) => {
    const [ open, setOpen ] = useState(initialOpen);

    return (
        <div className={`border border-neutral-300 rounded overflow-hidden ${className}`}>
            <div 
                className='cursor-pointer bg-neutral-100 flex items-center justify-between px-4 py-2 hover:bg-neutral-200'
                onClick={() => setOpen(!open)}
            >
                {header}
                {open ?
                    <ArrowBottomIcon className='size-5'/>
                    :
                    <ArrowRightIcon className='size-5'/>
                }
            </div>
            <AnimatePresence initial={false}>
                {open && 
                    <motion.div
                        className='overflow-hidden'
                        key="content"
                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
                        variants={{
                            open: { opacity: 1, height: "auto" },
                            collapsed: { opacity: 0, height: 0 }
                        }}
                        transition={{ duration: 0.3, ease: "linear" }}
                    >
                        <motion.div
                            transition={{ duration: 0.3 }}
                            className={childrenClassName}
                        >
                            { children }
                        </motion.div>
                    </motion.div>
                }
            </AnimatePresence>
        </div>
    );
}
 
export default Accordion;