import { Suspense } from "react";
import { redirect } from "next/navigation";
import FormForgotPassword from "./_components/form-forgot-password";
import Routes from "@/utils/libs/routes";
import { createClient } from "@/utils/supabase/server";
import PageTitle from "../../_components/page-title";

export default async function ForgotPassword() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (user) {
        redirect(Routes.home);
    }

    return (
        <>
            <PageTitle text="Verifica tu cuenta" />
            <Suspense>
                <FormForgotPassword />
            </Suspense>
        </>
    );
}