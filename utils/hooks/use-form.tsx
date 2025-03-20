'use client';

import { ChangeEventHandler, useState } from "react";

export default function useFormState<T>(initialData: T) {
    const [ formData, setFormData ] = useState<T>(initialData);

    const handleChange:ChangeEventHandler<HTMLInputElement> = (e) => {
        setFormData({
            ...formData,
            [e.currentTarget.name]: e.currentTarget.value
        });
    }

    const handleSelectChange:ChangeEventHandler<HTMLSelectElement> = (e) => {
        setFormData({
            ...formData,
            [e.currentTarget.name]: e.currentTarget.value
        });
    }

    const validateForm = (formId: string) => {
        const form = document.getElementById(formId);

        if (!form) return true;

        const elements = form.querySelectorAll<HTMLInputElement>('input:not([type="checkbox"])');

        let isValid = true;

        for (const control of elements) {
            if (control.required) {
                if (control.value.trim() === "") {
                    control.classList.add("error");
                    isValid = false;
                }
                else {
                    control.classList.remove("error");
                }
            }
        }

        return isValid;
    }

    return {
        formData,
        setFormData,
        handleChange,
        handleSelectChange,
        validateForm
    };
}