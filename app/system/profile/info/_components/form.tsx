'use client';

import Alert from "@/app/_components/alert";
import Button from "@/app/_components/button";
import FormGroup from "@/app/_components/form-group";
import PhoneInputGroup, { PhoneInputEventHandler } from "@/app/_components/phone-input";
import { changeUserInfoAction, UserInfoState } from "@/utils/actions/users";
import useFormState from "@/utils/hooks/use-form";
import { FC, useActionState } from "react";

export interface FormUsers {
    name: string
    lastnames: string
    email: string
    phone: string
}

interface FormProps {
    initialData: FormUsers
}

const Form:FC<FormProps> = (props) => {
    const { initialData } = props;

    const { formData, setFormData, handleChange } = useFormState<FormUsers>(initialData);

    const {
        email,
        name,
        lastnames,
        phone
    } = formData;

    const initialState: UserInfoState = { message: null, errors: {}, sucess: null };
    const [ state, action, pending ] = useActionState(changeUserInfoAction, initialState);

    const handlePhoneChange:PhoneInputEventHandler = (e) => {
        setFormData({
            ...formData,
            [e.name]: e.value
        });
    }

    return (
        <>
            <Alert
                isVisible={state.message !== null || state.sucess !== null}
                text={state.message || state.sucess || ''}
                variant={state.sucess ? "success" : "danger"}
            />
            <form
                className="grid grid-cols-2 gap-x-3 gap-y-4"
                autoComplete="off"
                action={action}
            >
                <FormGroup
                    label="Nombre (s)"
                    name="name"
                    value={name}
                    onChange={handleChange}
                    required
                    errors={state.errors?.name}
                />
                <FormGroup
                    label="Apellidos"
                    name="lastnames"
                    value={lastnames}
                    onChange={handleChange}
                    required
                    errors={state.errors?.lastnames}
                />
                <div className="col-span-2">
                    <FormGroup
                        label="Correo electrónico"
                        type="email"
                        name="email"
                        value={email}
                        onChange={handleChange}
                        required
                        errors={state.errors?.email}
                    />
                </div>
                <div className="col-span-2">
                    <PhoneInputGroup
                        id="phone"
                        label="Teléfono"
                        name="phone"
                        value={phone}
                        onChange={handlePhoneChange}
                        errors={state.errors?.phone}
                    />
                </div>
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