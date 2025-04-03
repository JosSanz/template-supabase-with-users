import React, { ButtonHTMLAttributes, FC } from 'react';
import { SpinnerIcon } from './icons';

const ButtonVariants = {
    primary: 'bg-primary text-white border-primary hover:bg-primary-hover',
    secondary: 'bg-secondary text-white border-secondary hover:bg-secondary-hover',
    success: 'bg-green-700 text-white border-green-700 hover:bg-green-800',
    danger: 'bg-red-600 text-white border-red-600 hover:bg-red-700',
    warning: 'bg-yellow-500 text-neutral-900 border-yellow-500 hover:bg-yellow-400',
    info: 'bg-cyan-600 text-white border-cyan-600 hover:bg-cyan-700',
    light: 'bg-neutral-50 text-neutral-900 border-neutral-300 hover:bg-neutral-200',
    dark: 'bg-neutral-900 text-white border-neutral-900 hover:bg-neutral-800',
    outline_primary: 'bg-transparent text-primary border-primary hover:bg-primary hover:text-white',
    outline_secondary: 'bg-transparent text-secondary border-secondary hover:bg-secondary-hover hover:text-white',
    outline_success: 'bg-transparent text-green-700 border-green-700 hover:bg-green-700 hover:text-white',
    outline_danger: 'bg-transparent text-red-600 border-red-600 hover:bg-red-600 hover:text-white',
    outline_warning: 'bg-transparent text-yellow-500 border-yellow-500 hover:bg-yellow-500 hover:text-neutral-900',
    outline_info: 'bg-transparent text-cyan-600 border-cyan-600 hover:bg-cyan-600 hover:text-white',
    outline_light: 'bg-transparent text-neutral-600 border-white hover:bg-neutral-100 hover:border-neutral-100',
    outline_dark: 'bg-transparent text-neutral-900 border-neutral-900 hover:bg-neutral-900 hover:text-white'
}

type ButtonVariantKeys = keyof typeof ButtonVariants;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant: ButtonVariantKeys
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

    const classVariant = ButtonVariants[variant];

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