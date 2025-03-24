'use client';

import Alert from "@/app/_components/alert";
import Button from "@/app/_components/button";
import FormGroup from "@/app/_components/form-group";
import PhoneInputGroup, { PhoneInputEventHandler } from "@/app/_components/phone-input";
import { useSystemContext } from "@/app/system/_components/system-state";
import { Role } from "@/utils/db/entities";
import useFormState from "@/utils/hooks/use-form";
import Routes from "@/utils/libs/routes";
import { useRouter } from "next/navigation";
import { FC, FormEventHandler, useState } from "react";
import RolesContainer from "./roles-container";
import { CreateUserDto } from "@/utils/db/dtos";
import axios from "axios";

export interface FormUsers {
    name: string
    lastnames: string
    email: string
    phone: string
    roleIds: string[]
}

interface FormProps {
    id?: string
    action: 'create' | 'update'
    initialData: FormUsers
    roles: Role[]
}

const Form:FC<FormProps> = (props) => {
    const { id, action, initialData, roles } = props;

    const { triggerToast } = useSystemContext();

    const [ saving, setSaving ] = useState(false);
    const [ errorMessage, setErrorMessage ] = useState('');
    const { formData, setFormData, handleChange, validateForm } = useFormState<FormUsers>(initialData);

    const {
        email,
        name,
        lastnames,
        phone,
        roleIds
    } = formData;

    const router = useRouter();

    const handlePhoneChange:PhoneInputEventHandler = (e) => {
        setFormData({
            ...formData,
            [e.name]: e.value
        })
    }

    const handleRoleChange = (roleId: string) => {
        if (roleIds.includes(roleId)) {
            setFormData({
                ...formData,
                roleIds: [...roleIds].filter(r => r !== roleId)
            });
        }
        else {
            setFormData({
                ...formData,
                roleIds: [...roleIds, roleId]
            });
        }
    }

    const onBack = () => {
        router.push(Routes.users.list);
    }

    const handleSubmit:FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        e.stopPropagation();

        onSave();
    }

    const onSave = () => {
        if (!validateForm("users_form")) {
            setErrorMessage("Campos incompletos");
            return;
        }

        if (roleIds.length === 0) {
            setErrorMessage("El usuario debe tener al menos un rol asignado");
            return;
        }

        setErrorMessage('');
        setSaving(true);

        if (action === 'create') {
            sendPost();
        }
        // else {
        //     sendPut();
        // }
    }

    const sendPost = () => {
        const data:CreateUserDto = {
            email: email,
            metadata: {
                name: name,
                lastnames: lastnames,
                phone: phone
            },
            roleIds: roleIds
        };

        axios.post(
			Routes.users.api, 
			data
		).then(function() {
			triggerToast("Registro guardado con éxito", "success");
            onBack();
		}).catch(error => {
			triggerToast(error.response.data?.error ?? "Error al guardar, inténtelo de nuevo", "error");
		}).finally(function(){
			setSaving(false);
		});
    }

    return (
        <div className="md:max-w-[728px] mx-auto space-y-4">
            <Alert
                isVisible={errorMessage !== ''}
                text={errorMessage}
                variant="danger"
            />
            <form
                id="users_form"
                className="grid grid-cols-2 gap-x-3 gap-y-4"
                autoComplete="off"
                onSubmit={handleSubmit}
            >
                <FormGroup
                    label="Nombre (s)"
                    name="name"
                    value={name}
                    onChange={handleChange}
                    required
                />
                <FormGroup
                    label="Apellidos"
                    name="lastnames"
                    value={lastnames}
                    onChange={handleChange}
                    required
                />
                <FormGroup
                    label="Correo electrónico"
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    required
                />
                <PhoneInputGroup
                    id="phone"
                    label="Teléfono"
                    name="phone"
                    value={phone}
                    onChange={handlePhoneChange}
                />
            </form>
            <RolesContainer
                roles={roles}
                assignedRoleIds={roleIds}
                onRoleClick={handleRoleChange}
            />
            <div className="flex justify-center gap-2">
                <Button
                    variant="light"
                    className="w-24"
                    disabled={saving}
                    onClick={onBack}
                >
                    Cancelar
                </Button>
                <Button
                    variant="primary"
                    className="w-24"
                    onLoading={saving}
                    onClick={onSave}
                >
                    Guardar
                </Button>
            </div>
        </div>
    );
}
 
export default Form;