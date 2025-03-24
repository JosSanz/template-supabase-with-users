'use client';

import { FC, InputHTMLAttributes, useRef } from 'react';
import { CheckEmptyIcon, CheckFullIcon } from './icons';

export interface CheckboxEvent {
    currentTarget: {
        name: string
        value: boolean
    }
}

export type CheckboxEventHandler = (event: CheckboxEvent) => void

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
    showLabel?: boolean
    label?: string
}

const Checkbox:FC<CheckboxProps> = (props) => {
    const {
        showLabel,
        label,
        checked,
        name,
        onChange
    } = props;

    const checkRef = useRef<HTMLInputElement>(null);

    const handleClick = () => {
        // onCheckChange({
        //     currentTarget: {
        //         name: name ?? '',
        //         value: !checked
        //     }
        // })

        checkRef.current?.click();
    }

    return (
        <>
            <div className='cursor-pointer flex items-center gap-1' onClick={handleClick}>
                {checked === true ? 
                    <CheckFullIcon className='size-5 text-primary'/> 
                    : <CheckEmptyIcon className='size-5'/>
                }
                {showLabel && <label htmlFor={name}>{label}</label>}
            </div>
            <input
                ref={checkRef}
                type="checkbox"
                name={name}
                checked={checked}
                onChange={onChange}
                hidden
            />
        </>
    );
}
 
export default Checkbox;