import { FC } from "react";
import FormControl, { FormControlProps } from "./form-control";

interface FormGroupProps extends FormControlProps {
    label: string
    errors?: string[]
}

const FormGroup:FC<FormGroupProps> = (props) => {
    const {
        label,
        errors
    } = props;

    return (
        <div className='space-y-2 group'>
            <label className="block text-sm font-medium after:ml-0.5 after:text-red-500 group-[:has(input[required])]:after:content-['*']">{label}</label>
            <FormControl {...props}/>
            <div aria-live="polite" aria-atomic="true" className="space-y-1">
            {errors && errors.map((error: string) => (
                <p className="text-sm text-red-700" key={error}>
                    *{error}
                    </p>
                ))}
            </div>
        </div>
    );
}
 
export default FormGroup;