'use client';

import { FC, InputHTMLAttributes, useRef } from 'react';
import { CheckEmptyIcon, CheckFullIcon } from './icons';

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
    showLabel?: boolean
    label?: string
}
const Checkbox:FC<CheckboxProps> = (props) => {
    const {
        showLabel,
        label,
        checked,
        name
    } = props;

    const checkRef = useRef<HTMLInputElement>(null);

    const handleClick = () => {
        checkRef.current?.click();
        console.log(checkRef.current?.checked);
    }

    return (
        <>
            <div className='cursor-pointer flex items-center' onClick={handleClick}>
                {checked === true ? <CheckFullIcon className='size-5'/> : <CheckEmptyIcon className='size-5'/>}
                {showLabel && <label htmlFor={name}>{label}</label>}
            </div>
            <input type="checkbox" hidden ref={checkRef} {...props} />
        </>
    );
}
 
export default Checkbox;