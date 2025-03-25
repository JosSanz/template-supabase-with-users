'use client';

import { useEffect, useState, useActionState, ChangeEventHandler } from "react";
import Link from "next/link";
import { useSearchParams, usePathname } from "next/navigation";
import Button from "@/app/_components/button";
import { RequestResetPasswordState, requestResetPasswordAction } from "@/utils/actions/auth";
import Routes from "@/utils/libs/routes";
import FormGroup from "@/app/_components/form-group";
import Alert from "@/app/_components/alert";

const FormForgotPassword = () => {
    const searchParams = useSearchParams();
    const pathName = usePathname();

    const [ successMessage, setSuccessMessage ] = useState<string | null>(null);
    const [ formData, setFormData ] = useState({
        email: ''
    });

    const {
        email
    } = formData;

    const initialState: RequestResetPasswordState = { message: null, errors: {} };
    const [ state, action, pending ] = useActionState(requestResetPasswordAction, initialState);

    useEffect(() => {
        const params = new URLSearchParams(searchParams);
        const message = params.get('message');

        setSuccessMessage(message);
    }, [ pathName ]); //eslint-disable-line

    const handleChange:ChangeEventHandler<HTMLInputElement> = (e) => {
        setFormData({
            ...formData,
            [e.currentTarget.name]: e.currentTarget.value
        })
    }

    return successMessage ?
        <>
            <Alert
                isVisible={successMessage !== ""}
                text={successMessage ?? ""}
                variant="info"
            />
            <Link
                className="block text-center px-4 py-2 cursor-pointer rounded border transition-colors bg-primary text-white border-primary hover:bg-primary-hover w-full"
                href={Routes.home}
            >Regresar al inicio</Link>
        </>
        :
        <form 
            className="space-y-4"
            autoComplete="off"
            action={action}
        >
            <p>Escribe el correo de tu cuenta para continuar</p>
            <Alert
                isVisible={(state.message ?? "") !== ""}
                text={state.message ?? ""}
                variant="danger"
            />
            <FormGroup
                label="Email"
                type="email" 
                id="email" 
                name="email" 
                value={email}
                onChange={handleChange}
                required
                errors={state.errors?.email}
            />
            <Button
                type="submit"
                className="w-full"
                variant="primary"
                onLoading={pending}
            >Enviar</Button>
        </form>
}
 
export default FormForgotPassword;