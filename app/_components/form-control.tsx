import React, { FC, InputHTMLAttributes } from 'react';

export type FormControlProps = InputHTMLAttributes<HTMLInputElement>;

const FormControl: FC<FormControlProps> = (props) => {
    const {
        className
    } = props;

    return <input {...props} className={`${className ?? ""} block w-full px-4 py-2 rounded border border-neutral-300 !outline-none focus:border-sky-300 focus:ring-sky-200 disabled:bg-neutral-200`} />
}

export default FormControl;