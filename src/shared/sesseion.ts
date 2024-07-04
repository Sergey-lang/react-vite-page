import { attach, createEffect, createStore } from 'effector';
import { bookAPI } from '@entity/book/api.ts';
import { IBook } from '@entity/book/types.ts';

const getUserFx = createEffect(bookAPI.authRequest);
export const sessionRequestFx = attach({effect: getUserFx});
export const $user = createStore<IBook | null>(null);
$user.on(sessionRequestFx.doneData, (_, user) => user);
// $user.on(sessionRequestFx.fail, () => null);