'use client';

import FormGroup from "@/app/_components/form-group";
import { CreateRoleDto, PermissionGroup, UpdateRoleDto } from "@/utils/db/dtos";
import useFormState from "@/utils/hooks/use-form";
import { FC, FormEventHandler, createContext, useContext, useState } from "react";
import MenuAccordion from "./menu-accordion";
import { RolePermission } from "@/utils/db/entities";
import axios from "axios";
import Alert from "@/app/_components/alert";
import Button from "@/app/_components/button";
import { Routes } from "@/utils/libs/routes";
import { useSystemContext } from "@/app/system/_components/system-state";
import { useRouter } from "next/navigation";

export type PermissionCRUD = Omit<RolePermission, "role_id">;

type HandlePermissionCheck = (data: { menu: string, permission_id?: string, action: 'CREATE' | 'READ' | 'UPDATE' | 'DELETE' }) => void

interface UserProfilesContextType {
    permissions: PermissionCRUD[]
    handlePermissionChange: HandlePermissionCheck
}

const UserProfilesContext = createContext<UserProfilesContextType | undefined>(undefined);

export const useUserProfilesContext = ()=>{
    const context = useContext(UserProfilesContext);

    if(context === undefined){
        throw new Error('useUserProfilesContext must be used within a SystemProvider');
    }

    return context;
}

export interface FormUserProfile {
    name: string,
    permissions: PermissionCRUD[]
}

export interface FormProps {
    id?: string
    action: 'create' | 'update'
    permits: PermissionGroup[]
    initialData: FormUserProfile
}

const Form:FC<FormProps> = (props) => {
    const { id, action, permits, initialData } = props;

    const { triggerToast } = useSystemContext();

    const [ saving, setSaving ] = useState(false);
    const [ errorMessage, setErrorMessage ] = useState('');
    const { formData, setFormData, handleChange, validateForm } = useFormState<FormUserProfile>(initialData);
    
    const {
        name,
        permissions
    } = formData;

    const router = useRouter();

    const handlePermissionChange:HandlePermissionCheck = ({ menu, permission_id, action }) => {
        let newPermissions:PermissionCRUD[] = [];

        if (permission_id) {
            newPermissions = updateOnePermit(permissions, permission_id, action);
        }
        else {
            const menuGroup = permits.find(p => p.key === menu);

            if (!menuGroup) return;

            newPermissions = [...permissions];

            for (const item of menuGroup.actions) {
                newPermissions = updateOnePermit(newPermissions, item.id, action);
            }
        }

        setFormData({
            ...formData,
            permissions: newPermissions
        })
    }

    const updateOnePermit = (_permission: PermissionCRUD[], permission_id: string, action: string) => {
        const index = _permission.findIndex(p => p.permission_id === permission_id);

        if (index < 0) {
            return [
                ..._permission, 
                {
                    permission_id: permission_id,
                    create: action === 'CREATE',
                    read: action === 'READ',
                    update: action === 'UPDATE',
                    delete: action === 'DELETE'
                }
            ]
        }
        else {
            return _permission.map((p) => {
                if (p.permission_id === permission_id) {
                    p.create = action === 'CREATE' ? !p.create : p.create;
                    p.read = action === 'READ' ? !p.read : p.read;
                    p.update = action === 'UPDATE' ? !p.update : p.update;
                    p.delete = action === 'DELETE' ? !p.delete : p.delete;
                }

                return p;
            });
        }
    }

    const handleSubmit:FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        e.stopPropagation();

        onSave();
    }

    const onSave = () => {
        if (!validateForm("user_profiles_form")) {
            setErrorMessage("Campos incompletos");
            return;
        }

        if (permissions.length === 0) {
            setErrorMessage("Debe existir al menos un permiso asignado");
            return;
        }

        const permissionAsigned = [...permissions].filter(c => c.create || c.read || c.update || c.delete);

        if (permissionAsigned.length === 0) {
            setErrorMessage("Debe existir al menos un permiso asignado");
            return;
        }

        setErrorMessage('');
        setSaving(true);

        if (action === 'create') {
            sendPost(permissionAsigned);
        }
        else {
            sendPut(permissionAsigned);
        }
    }

    const onBack = () => {
        router.push(Routes.user_profiles.list);
    }

    const sendPost = (permissionAsigned: PermissionCRUD[]) => {
        const data:CreateRoleDto = {
            name: name,
            permits: permissionAsigned
        };

        axios.post(
			Routes.user_profiles.api, 
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

    const sendPut = (permissionAsigned: PermissionCRUD[]) => {
        const data:UpdateRoleDto = {
            name: name,
            permits: permissionAsigned
        };

        axios.put(
			`${Routes.user_profiles.api}/${id}`, 
			data
		).then(function() {
			triggerToast("Registro actualizado con éxito", "success");
            onBack();
		}).catch(error => {
			triggerToast(error.response.data?.error ?? "Error al actualizar, inténtelo de nuevo", "error");
		}).finally(function(){
			setSaving(false);
		});
    }

    return (
        <UserProfilesContext.Provider
            value={{
                permissions,
                handlePermissionChange
            }}
        >
            <Alert
                isVisible={errorMessage !== ''}
                text={errorMessage}
                variant="danger"
            />
            <form
                id="user_profiles_form"
                className="w-80"
                autoComplete="off"
                onSubmit={handleSubmit}
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
                <MenuAccordion
                    data={menu}
                    key={menu.key}
                />
            ))}
            </div>
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
        </UserProfilesContext.Provider>
    );
}
 
export default Form;