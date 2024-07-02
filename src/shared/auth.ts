import { createEvent, createStore } from 'effector';

export const tokenReceived = createEvent<string>();
export const tokenErased = createEvent();

export const $token = createStore('');

export const $isAuthorized = $token.map(Boolean);

$token.on(tokenReceived, (prev, token) => token).reset(tokenErased);