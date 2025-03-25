'use client';

import { ResetPasswordState, resetPasswordAction } from "@/utils/actions/auth";
import Button from "@/app/_components/button";
import { useState, useActionState, ChangeEventHandler } from "react";
import { Session } from "@supabase/auth-js";
import Alert from "@/app/_components/alert";
import FormGroup from "@/app/_components/form-group";

const ResetForm = ({
    session
}:{
    session: Session
}) => {
    const [ formData, setFormData ] = useState({
        password: '',
        confirm_password: ''
    });

    const {
        password,
        confirm_password
    } = formData;

    const initialState: ResetPasswordState = { message: null, errors: {} };
    const [ state, action, pending ] = useActionState(resetPasswordAction, initialState);

    const handleChange:ChangeEventHandler<HTMLInputElement> = (e) => {
        setFormData({
            ...formData,
            [e.currentTarget.name]: e.currentTarget.value
        })
    }

    return (
        <form
            className="space-y-4"
            autoComplete="off"
            action={action}
        >
            <Alert
                isVisible={(state.message ?? "") !== ""}
                text={state.message ?? ""}
                variant="danger"
            />
            <input name="access_token" defaultValue={session.access_token} hidden/>
            <input name="refresh_token" defaultValue={session.refresh_token} hidden/>
            <FormGroup
                label="Contraseña"
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={handleChange}
                required
                errors={state.errors?.password}
            />
            <FormGroup
                label="Confirmar contraseña"
                type="password"
                id="confirm_password"
                name="confirm_password"
                value={confirm_password}
                onChange={handleChange}
                required
                errors={state.errors?.confirm_password}
            />
            <Button
                type="submit"
                className="w-full"
                onLoading={pending}
                variant="primary"
            >Guardar</Button>
        </form>
    );
}
 
export default ResetForm;