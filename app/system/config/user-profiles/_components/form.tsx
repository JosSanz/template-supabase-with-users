'use client';

import FormGroup from "@/app/_components/form-group";
import { PermissionGroup } from "@/utils/db/dtos";
import useFormState from "@/utils/hooks/use-form";
import { FC } from "react";
import MenuAccordion from "./menu-accordion";

interface FormUserProfile {
    name: string,
    permissions: []
}

interface FormProps {
    action: 'create' | 'update'
    permits: PermissionGroup[]
}

const Form:FC<FormProps> = (props) => {
    const { permits } = props;

    const { formData, handleChange } = useFormState<FormUserProfile>({
        name: '',
        permissions: []
    });
    
    const {
        name,
        permissions
    } = formData;

    return (
        <>
            <form 
                className="w-80"
                autoComplete="off"
            >
                <FormGroup
                    label="Nombre"
                    type="text"
                    name="name"
                    value={name}
                    onChange={handleChange}
                    required
                />
            </form>
            <div className="grid grid-cols-[1fr_100px_100px_100px_100px]">
                <div className="border-b-2 border-primary"></div>
                <div className="border-b-2 border-primary p-2 font-medium text-sm text-center">CREAR</div>
                <div className="border-b-2 border-primary p-2 font-medium text-sm text-center">LEER</div>
                <div className="border-b-2 border-primary p-2 font-medium text-sm text-center">ACTUALIZAR</div>
                <div className="border-b-2 border-primary p-2 font-medium text-sm text-center">ELIMINAR</div>
            {permits.map((menu) => (
                <MenuAccordion data={menu} key={menu.key}/>
            ))}
            </div>
        </>
    );
}
 
export default Form;