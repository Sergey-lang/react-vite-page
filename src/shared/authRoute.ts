import { chainRoute, RouteInstance, RouteParams, RouteParamsAndQuery } from 'atomic-router';
import { createEvent, sample } from 'effector';
import { $isAuthorized, tokenReceived } from '@shared/auth.ts';

export function chainAuthorized<T extends RouteParams>(route: RouteInstance<T>) {
    const checkAuthEvent = createEvent<RouteParamsAndQuery<T>>();

    const alreadyAuthorized  = sample({
        clock: checkAuthEvent,
        filter: $isAuthorized,
    });

    return chainRoute({
        route,
        beforeOpen: checkAuthEvent,
        openOn: [alreadyAuthorized , tokenReceived],
    });
}
