'use server';

import { z } from "zod";
import { createClient } from "../supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import Routes from "../libs/routes";

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

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });
  
    if (error) {
        return { message: error.message }
    }

    revalidatePath(Routes.home);
    redirect(Routes.home);
};