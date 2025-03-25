'use server';

import { z } from "zod";
import { createClient } from "../supabase/server";
import { UserMetadata } from "@supabase/auth-js";
import { redirect } from "next/navigation";
import Routes from "../libs/routes";

export type UserInfoState = {
    errors?: {
        email?: string[];
        name?: string[];
        lastnames?: string[];
        phone?: string[];
    };
    message?: string | null;
    sucess?: string | null;
}
const UserInfoSchema = z.object({
    email: z.string({
        required_error: 'Email obligatorio'
    }).email({
        message: 'Email inválido'
    }),
    name: z.string({
        required_error: 'Nombre obligatorio'
    }).min(1, { 
        message: "Nombre obligatorio" 
    }).max(100, { 
        message: 'El nombre no debe ser mayor a 100 caracteres' 
    }),
    lastnames: z.string({
        required_error: 'Apellido obligatorio'
    }).min(1, { 
        message: "Apellido obligatorio" 
    }).max(100, { 
        message: 'Los apellidos no debe ser mayor a 100 caracteres' 
    }),
    phone: z.string().optional()
});

export const changeUserInfoAction = async (prevState: UserInfoState, formData: FormData):Promise<UserInfoState> => {
    const validatedFields = UserInfoSchema.safeParse({
        email: formData.get('email'),
        name: formData.get('name'),
        lastnames: formData.get('lastnames'),
        phone: formData.get('phone')
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Campos incompletos'
        };
    }

    const { email, name, lastnames, phone } = validatedFields.data;

    const supabase = await createClient();

    const userMetadata:UserMetadata = { name, lastnames, phone };

    const { error } = await supabase.auth.updateUser({
        email: email,
        data: userMetadata
    });

    if (error) {
        return { message: error.message }
    }

    return { sucess: "Los datos se han actualizado correctamente." }
};

export type ChangePasswordState = {
    errors?: {
        current_password?: string[];
        new_password?: string[];
        confirm_password?: string[];
    };
    message?: string | null;
    sucess?: string | null;
}

const ChangePasswordSchema = z.object({
    current_password: z.string({
        required_error: 'Contraseña obligatoria'
    }).min(8, {
        message: 'La contraseña debe tener al menos 8 caracteres'
    }),
    new_password: z.string({
        required_error: 'Contraseña obligatoria'
    }).min(8, {
        message: 'La contraseña debe tener al menos 8 caracteres'
    }),
    confirm_password: z.string({
        required_error: 'Contraseña obligatoria'
    }).min(8, {
        message: 'La contraseña debe tener al menos 8 caracteres'
    })
});

export const changeUserPasswordAction = async (prevState: ChangePasswordState, formData: FormData):Promise<ChangePasswordState> => {
    const validatedFields = ChangePasswordSchema.safeParse({
        current_password: formData.get('current_password'),
        new_password: formData.get('new_password'),
        confirm_password: formData.get('confirm_password')
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Campos incompletos'
        };
    }

    const { current_password, new_password, confirm_password } = validatedFields.data;

    if (new_password !== confirm_password) {
        return { message: "Contaseñas inválidas", errors: { confirm_password: [ "Las contraseñas no coinciden" ]} };
    }

    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect(Routes.root);
    }

    const { error: validateError } = await supabase.auth.signInWithPassword({
        email: user.email ?? "",
        password: current_password
    });

    if (validateError) {
        return { message: "Formulario inválido", errors: { current_password: [ "Contraseña actual incorrecta." ]}  }
    }

    const { error } = await supabase.auth.updateUser({
        password: new_password
    });

    if (error) {
        return { message: error.message }
    }

    return { sucess: "La contraseña se actualizó correctamente." }
};