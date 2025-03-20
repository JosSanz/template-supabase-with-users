import React, { ButtonHTMLAttributes, FC } from 'react';
import { SpinnerIcon } from './icons';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' | 'link' | 'outline-primary' | 'outline-secondary' | 'outline-success' | 'outline-danger' | 'outline-warning' | 'outline-info' | 'outline-light' | 'outline-dark' | 'outline-link' | undefined
    onLoading?: boolean | undefined
    iconSize?: string | undefined
    children: React.ReactNode;
}

const Button: FC<ButtonProps> = ({ children, onLoading, iconSize, ...props }) => {
    const {
        variant,
        className,
        disabled
    } = props;

    const classVariant = variant ?
        variant === 'primary' ? 'bg-primary text-white border-primary hover:bg-primary-hover'
        : variant === 'light' ? 'bg-neutral-50 text-neutral-900 border-neutral-300 hover:bg-neutral-200'
        : variant === 'outline-light' ? 'bg-transparent text-white border-white hover:bg-white hover:text-inherit'
        : ''
        : '';

    return (
        <button 
            {...props}
            className={`px-4 py-2 cursor-pointer rounded flex items-center justify-center gap-2 border transition-colors disabled:bg-neutral-300 disabled:border-neutral-300 ${classVariant} ${(className ?? "")}`}
            disabled={disabled || onLoading}
        >
        {onLoading === true ?
            <SpinnerIcon className={`animate-spin ${iconSize ?? "size-6"}`}/>
        :
            children
        }
        </button>
    );
};

export default Button;