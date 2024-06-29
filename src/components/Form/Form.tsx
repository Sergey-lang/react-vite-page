import cn from 'clsx';
import style from './Form.module.css';
import { FormEvent, ReactNode } from 'react';

type FormDataType = { [k: string]: FormDataEntryValue }

interface IFormProps {
    onSubmit: (data: FormDataType) => void;
    onSuccess?: (data: FormDataType) => void;
    onError?: (error: unknown) => void;
    children?: ReactNode;
    className?: string;
}

const Form = ({onSubmit, onSuccess, onError, children, className}: IFormProps) => {
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const data = Object.fromEntries(formData);

        try {
            await onSubmit(data);
            onSuccess && onSuccess(data);
        } catch (error) {
            onError && onError(error);
        }
    };

    return (
        <form
            className={cn(style.form, className)}
            onSubmit={handleSubmit}
            autoComplete="off"
        >
            {children}
        </form>
    );
};

export { Form };
