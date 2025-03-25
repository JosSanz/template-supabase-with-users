"use client";

import React, { FC } from "react";
import * as RPNInput from "react-phone-number-input";
import flags from "react-phone-number-input/flags";
import FormControl from "./form-control";
import { ArrowBottomIcon, PhoneIcon } from "./icons";

interface PhoneInputEvent {
    name: string
    value: string
}

export type PhoneInputEventHandler = (event: PhoneInputEvent) => void

interface PhoneInputGroupProps {
    id: string
    label: string
    value: string
    name: string
    placeholder?: string
    required?: boolean
    onChange: PhoneInputEventHandler
    errors?: string[]
}

const PhoneInputGroup:FC<PhoneInputGroupProps> = (props) => {
    const { id, label, value, name, placeholder, required, onChange, errors } = props;

    const handleChange = (_value: string) => {
        onChange({
            name: name,
            value: _value
        })
    }

    return (
        <div className="space-y-2 group" dir="ltr">
            <label className="block text-sm font-medium after:ml-0.5 after:text-red-500 group-[:has(input[required])]:after:content-['*']" htmlFor={id}>{label}</label>
            <RPNInput.default
                className="flex"
                international
                flagComponent={FlagComponent}
                countrySelectComponent={CountrySelect}
                inputComponent={PhoneInput}
                id={id}
                placeholder={placeholder ?? ""}
                value={value}
                onChange={(newValue) => handleChange(newValue ?? "")}
                required={required}
                name={name}
            />
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

const PhoneInput = ({ className, ...props }: React.ComponentProps<"input">) => {
    return (
        <FormControl
            data-slot="phone-input"
            className={`${className} !rounded-s-none`}
            {...props}
        />
    );
};

PhoneInput.displayName = "PhoneInput";

type CountrySelectProps = {
    disabled?: boolean;
    value: RPNInput.Country;
    onChange: (value: RPNInput.Country) => void;
    options: { label: string; value: RPNInput.Country | undefined }[];
};

const CountrySelect = ({
    disabled,
    value,
    onChange,
    options,
}: CountrySelectProps) => {
    const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        onChange(event.target.value as RPNInput.Country);
    };

    return (
        <div className="relative rounded-s border border-r-0 border-neutral-300 !outline-none focus-within:border-sky-300 focus-within:ring-sky-200 disabled:bg-neutral-200 flex items-center justify-center px-2">
            <div className="inline-flex items-center gap-1" aria-hidden="true">
                <FlagComponent
                    country={value}
                    countryName={value}
                    aria-hidden="true"
                />
                <span>
                    <ArrowBottomIcon className="size-5" aria-hidden="true" />
                </span>
            </div>
            <select
                disabled={disabled}
                value={value}
                onChange={handleSelect}
                className="absolute inset-0 text-sm opacity-0"
                aria-label="Select country"
            >
                <option key="default" value="">
                    Seleccione un país
                </option>
                {options
                    .filter((x) => x.value)
                    .map((option, i) => (
                        <option
                            key={option.value ?? `empty-${i}`}
                            value={option.value}
                        >
                            {option.label}{" "}
                            {option.value &&
                                `+${RPNInput.getCountryCallingCode(
                                    option.value
                                )}`}
                        </option>
                    ))}
            </select>
        </div>
    );
};

const FlagComponent = ({ country, countryName }: RPNInput.FlagProps) => {
    const Flag = flags[country];

    return (
        <span className="w-5 overflow-hidden rounded-sm">
            {Flag ? (
                <Flag title={countryName} />
            ) : (
                <PhoneIcon className="size-5" aria-hidden="true" />
            )}
        </span>
    );
};

export default PhoneInputGroup;