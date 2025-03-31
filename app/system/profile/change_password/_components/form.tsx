'use client';

import Alert from "@/app/_components/alert";
import Button from "@/app/_components/button";
import FormGroup from "@/app/_components/form-group";
import { ChangePasswordState, changeUserPasswordAction } from "@/utils/actions/users";
import useFormState from "@/utils/hooks/use-form";
import { useActionState, useEffect } from "react";

interface ChangePasswordForm {
    current_password: string
    new_password: string
    confirm_password: string
}

const Form = () => {
    const { formData, setFormData, handleChange } = useFormState<ChangePasswordForm>({
        current_password: '',
        new_password: '',
        confirm_password: ''
    });

    const {
        current_password,
        new_password,
        confirm_password
    } = formData;

    const initialState: ChangePasswordState = { message: null, errors: {}, sucess: null };
    const [ state, action, pending ] = useActionState(changeUserPasswordAction, initialState);

    useEffect(() => {
        if (state.sucess) {
            setFormData({
                current_password: '',
                new_password: '',
                confirm_password: ''
            });
        }
    }, [ state ]); //eslint-disable-line

    return (
        <>
            <Alert
                isVisible={state.message !== null || state.sucess !== null}
                text={state.message || state.sucess || ''}
                variant={state.sucess ? "success" : "danger"}
            />
            <form
                className="space-y-4"
                autoComplete="off"
                action={action}
            >
                <FormGroup
                    label="Contraseña actual"
                    type="password"
                    name="current_password"
                    value={current_password}
                    onChange={handleChange}
                    required
                    errors={state.errors?.current_password}
                />
                <FormGroup
                    label="Nueva contraseña"
                    type="password"
                    name="new_password"
                    value={new_password}
                    onChange={handleChange}
                    required
                    errors={state.errors?.new_password}
                />
                <FormGroup
                    label="Confirmar contraseña"
                    type="password"
                    name="confirm_password"
                    value={confirm_password}
                    onChange={handleChange}
                    required
                    errors={state.errors?.confirm_password}
                />
                <div className="col-span-2 flex justify-center">
                    <Button
                        type="submit"
                        variant="primary"
                        onLoading={pending}
                    >Guardar</Button>
                </div>
            </form>
        </>
    );
}
 
export default Form;