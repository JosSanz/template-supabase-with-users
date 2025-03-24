'use server';

import { redirect } from "next/navigation";
import { User } from '@supabase/auth-js';
import { createClient } from "../supabase/server";
import Routes from "./routes";

export async function useSession():Promise<User> {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect(Routes.root);
    }

    return user;
}