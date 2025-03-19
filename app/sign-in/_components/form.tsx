'use client';

import { useActionState } from "react";
import Alert from "@/app/_components/alert";
import Button from "@/app/_components/button";
import FormGroup from "@/app/_components/form-group";
import { signInAction, SignInState } from "@/utils/actions/auth";
import useFormState from "@/utils/hooks/use-form";

interface SignInForm {
    email: string
    password: string
}

const Form = () => {
    const { formData, handleChange } = useFormState<SignInForm>({
        email: '',
        password: ''
    });

    const {
        email,
        password
    } = formData;

    const initialState: SignInState = { message: null, errors: {} };
    const [ state, action, pending ] = useActionState(signInAction, initialState);

    return (
        <>
            <Alert
                isVisible={state.message !== null}
                text={state.message ?? ''}
                variant="danger"
            />
            <form
                autoComplete="off"
                className="space-y-4"
                action={action}
            >
                <FormGroup
                    label="Correo electrónico"
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    errors={state.errors?.email}
                    required
                />
                <FormGroup
                    label="Contraseña"
                    type="password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                    errors={state.errors?.password}
                    required
                />
                <Button
                    type="submit"
                    variant="primary"
                    className="w-full"
                    onLoading={pending}
                >Enviar</Button>
            </form>
        </>
    );
}
 
export default Form;