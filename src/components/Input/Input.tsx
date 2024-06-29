import { InputHTMLAttributes, useId } from 'react';
import cn from 'clsx';

import style from './Input.module.css';

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
    inputClassName?: string;
    label?: string;
    containerClassName?: string;
}

const Input = ({
                   type = 'text',
                   name,
                   value,
                   onChange,
                   placeholder,
                   label,
                   containerClassName,
                   inputClassName,
               }: IInputProps) => {
    const id = useId();

    return (
        <div className={cn(style.formControl, containerClassName)}>
            {label && (
                <label className={style.label} htmlFor={id} data-testid="input-label">
                    {label}
                </label>
            )}
            <input
                id={id}
                className={cn(style.input, inputClassName)}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />
        </div>
    );
};

export { Input };
