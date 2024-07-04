import { createEvent, createStore } from 'effector';
import { persist } from 'effector-storage/local';

export const tokenReceived = createEvent<string>();
export const tokenExpired = createEvent();
export const $token = createStore('');
export const $isAuthorized = $token.map(Boolean);

$isAuthorized.watch((x) => {
    console.log(x);
})

$token
    .on(tokenReceived, (_, token) => token)
    .reset(tokenExpired);

persist({
    key: 'effector-token',
    store: $token,
    serialize: (v) => v,
    deserialize: (v) => v
})