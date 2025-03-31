'use server';

import { z } from "zod";
import { createAdminClient, createClient } from "../supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import Routes from "../libs/routes";
import { headers } from "next/headers";
import { getUserHasPermits } from "../db/queries";

export type RequestResetPasswordState = {
    errors?: {
        email?: string[];
    };
    message?: string | null;
}

const RequestResetPasswordSchema = z.object({
    email: z.string({
        required_error: 'Email obligatorio'
    }).email({
        message: 'Email inválido'
    })
});

export const requestResetPasswordAction = async (prevState: RequestResetPasswordState, formData: FormData):Promise<RequestResetPasswordState> => {
    const validatedFields = RequestResetPasswordSchema.safeParse({
        email: formData.get('email')
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Campos incompletos'
        };
    }

    const { email } = validatedFields.data;

    const supabase = await createAdminClient();

    const origin = (await headers()).get("origin");

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${origin}${Routes.reset_password}`,
    })

    if (error) {
        return { message: error.message }
    }

    redirect(`${Routes.forgot_password}?message=${encodeURIComponent("Revisa tu correo para reestablecer tu contraseña.")}`);
};

export type ResetPasswordState = {
    errors?: {
        password?: string[];
        confirm_password?: string[];
    };
    message?: string | null;
}

const ResetPasswordSchema = z.object({
    password: z.string({
        required_error: 'Contraseña obligatoria'
    }).min(8, {
        message: 'La contraseña debe tener al menos 8 caracteres'
    }),
    confirm_password: z.string({
        required_error: 'Contraseña obligatoria'
    }).min(8, {
        message: 'La contraseña debe tener al menos 8 caracteres'
    }),
    access_token: z.string(),
    refresh_token: z.string()
});

export const resetPasswordAction = async (prevState: ResetPasswordState, formData: FormData):Promise<ResetPasswordState> => {
    const validatedFields = ResetPasswordSchema.safeParse({
        password: formData.get('password'),
        confirm_password: formData.get('confirm_password'),
        access_token: formData.get('access_token'),
        refresh_token: formData.get('refresh_token')
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Campos incompletos. Error al cambiar contraseña.'
        };
    }

    const { password, confirm_password, access_token, refresh_token } = validatedFields.data;

    if (password !== confirm_password) {
        return {
            errors: {
                confirm_password: [ 'Las contraseñas no coinciden' ]
            },
            message: 'Error al cambiar contraseña.'
        };
    }

    const supabase = await createClient();

    const { error } = await supabase.auth.setSession({ access_token, refresh_token });
    
    if (error) {
        return {
            message: 'Error al cambiar crear la sesión.'
        };
    }

    const { error: updateError } = await supabase.auth.updateUser({
        password: password
    })

    if (updateError) {
        return { message: updateError.message }
    }

    await supabase.auth.signOut();

    redirect(`${Routes.reset_password}?message=${encodeURIComponent("Su contraseña ha sido cambiada con éxito, inicie sesión de nuevo para continuar.")}`);
};

export type SignInState = {
    errors?: {
        email?: string[];
        password?: string[];
    };
    message?: string | null;
}

const SignInSchema = z.object({
    email: z.string({
        required_error: 'Email obligatorio'
    }).email({
        message: 'Email inválido'
    }),
    password: z.string({
        required_error: 'Contraseña obligatoria'
    }).min(8, {
        message: 'La contraseña debe tener al menos 8 caracteres'
    })
});

export const signInAction = async (prevState: SignInState, formData: FormData):Promise<SignInState> => {
    const validatedFields = SignInSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password')
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Campos incompletos. Error al iniciar sesión.'
        };
    }

    const { email, password } = validatedFields.data;
  
    const supabase = await createClient();

    const { data,  error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });
  
    if (error) {
        return { message: error.message }
    }

    if (!(data.user.app_metadata.active ?? false) || !(await getUserHasPermits(data.user.id))) {
        await supabase.auth.signOut();

        return { message: "Acceso denegado al sistema. Error al iniciar sesión." }
    }

    revalidatePath(Routes.home);
    redirect(Routes.home);
};

export const signOutAction = async () => {
    const supabase = await createClient();

    await supabase.auth.signOut();
    
    revalidatePath(Routes.root);
    return redirect(Routes.root);
};