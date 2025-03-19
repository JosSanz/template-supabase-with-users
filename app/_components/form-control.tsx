import React, { FC, InputHTMLAttributes } from 'react';

export interface FormControlProps extends InputHTMLAttributes<HTMLInputElement> {

}

const FormControl: FC<FormControlProps> = (props) => {
    const {
        className
    } = props;

    return <input className={`${className ?? ""} block w-full px-4 py-2 rounded border border-neutral-300 !outline-none focus:border-sky-300 focus:ring-sky-200 disabled:bg-neutral-200`} {...props} />
}

export default FormControl;