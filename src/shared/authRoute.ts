import { chainRoute, RouteInstance, RouteParams, RouteParamsAndQuery } from 'atomic-router';
import { createEvent, Effect, Event, sample } from 'effector';
import { $authStatus, AuthorizationStatus, sessionRequestFx } from '@shared/auth.ts';

interface ChainParams<Params extends RouteParams> {
    otherwise?: Event<void> | Effect<void, any, any>
}

export function chainAuthorized<Params extends RouteParams>(route: RouteInstance<Params>, {otherwise}: ChainParams = {}): RouteInstance<Params> {
    const sessionCheckStarted = createEvent<RouteParamsAndQuery<Params>>();
    const getAnonUser = createEvent<RouteParamsAndQuery<Params>>();


    sample({
        clock: sessionCheckStarted,
        source: $authStatus,
        filter: (status) => status === AuthorizationStatus.Init,
        target: sessionRequestFx, // запрос за токеном, например
    })

    const alreadyAuthorized = sample({
        clock: sessionCheckStarted,
        source: $authStatus,
        filter: (status) => status === AuthorizationStatus.Auth,
    });

    const alreadyAnon = sample({
        clock: sessionCheckStarted,
        source: $authStatus,
        filter: (status) => status === AuthorizationStatus.Anon,
    });

    sample({
        clock: [getAnonUser, sessionRequestFx.fail],
        filter: route.$isOpened,
        target: sessionRequestFx,
    })

    if (otherwise) {
        sample({
            clock: getAnonUser,
            target: otherwise,
        })
    }

    return chainRoute({
        route,
        beforeOpen: sessionCheckStarted,
        openOn: [alreadyAuthorized, sessionRequestFx.done],
        cancelOn: [alreadyAnon]
    });
}
