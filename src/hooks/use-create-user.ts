import { useState } from 'react';
import { validatePassword } from '../helpers/validatePassword';
import { wait } from '../helpers/wait';

const useCreateUser = () => {
    const [successMessage, setSuccessMessage] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');

    const onSubmit = async ({password}: { password: string }) => {
        const {success, error} = validatePassword(password);

        if (!success && error) {
            throw new Error(error);
        }

        await wait(1000);
    };

    const onSuccess = ({name, password}: { name: string, password: string }): void => {
        setErrorMessage('');
        setSuccessMessage(`User ${name} created with password ${password}`);
    };

    const onError = (error: { message: string }): void => {
        setErrorMessage(error.message);
    };

    return {successMessage, errorMessage, onSubmit, onSuccess, onError};
};

export { useCreateUser };
