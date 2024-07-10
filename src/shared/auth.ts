import { attach, createEffect, createStore } from 'effector';
import { bookAPI } from '@entity/book/api.ts';
import { IBook } from '@entity/book/types.ts';
import { debug } from 'patronum';
export enum AuthorizationStatus {
    Init,
    Pending,
    Auth,
    Anon
}

export const $authStatus = createStore<AuthorizationStatus>(AuthorizationStatus.Init);
debug($authStatus)
export const $user = createStore<IBook | null>(null);

// instead user
const getBookFx = createEffect(bookAPI.authRequest);
export const sessionRequestFx = attach({effect: getBookFx});
$user.on(sessionRequestFx.doneData, (_, book) => book);

$authStatus.on(sessionRequestFx, (status) => {
    if (status === AuthorizationStatus.Init) {
        return AuthorizationStatus.Pending;
    }
    return status;
});
$authStatus.on(sessionRequestFx.done, () => AuthorizationStatus.Auth);
$authStatus.on(sessionRequestFx.fail, () => AuthorizationStatus.Anon);
