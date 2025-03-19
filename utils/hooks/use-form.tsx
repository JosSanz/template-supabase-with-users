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
        })
    }

    return {
        formData,
        setFormData,
        handleChange,
        handleSelectChange
    };
}