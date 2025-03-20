'use client';

import { FC, InputHTMLAttributes, useRef } from 'react';
import { CheckEmptyIcon, CheckFullIcon } from './icons';

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
    showLabel?: boolean
    label?: string
    onClick: () => void
}

const Checkbox:FC<CheckboxProps> = (props) => {
    const {
        showLabel,
        label,
        checked,
        name,
        onClick
    } = props;

    const checkRef = useRef<HTMLInputElement>(null);

    return (
        <>
            <div className='cursor-pointer flex items-center' onClick={onClick}>
                {checked === true ? 
                    <CheckFullIcon className='size-5 text-primary'/> 
                    : <CheckEmptyIcon className='size-5'/>
                }
                {showLabel && <label htmlFor={name}>{label}</label>}
            </div>
            <input
                {...props}
                ref={checkRef}
                type="checkbox"
                onChange={() => null}
                hidden
            />
        </>
    );
}
 
export default Checkbox;