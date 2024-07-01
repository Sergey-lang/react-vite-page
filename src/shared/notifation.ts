import { createEffect } from 'effector';

export const showErrorMessageFx = createEffect((error: Error) => {
    alert(error.message);
})

export const showSuccessMessageFx = createEffect((msg: string) => {
    alert(msg);
})