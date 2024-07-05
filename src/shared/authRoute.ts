import { chainRoute, RouteInstance, RouteParams, RouteParamsAndQuery } from 'atomic-router';
import { createEvent, Effect, Event, sample } from 'effector';
import { $authStatus, AuthorizationStatus, sessionRequestFx } from '@shared/auth.ts';
import { debug } from 'patronum';

interface ChainParams<Params extends RouteParams> {
    otherwise?: Event<void> | Effect<void, any, any>
}

export function chainAuthorized<Params extends RouteParams>(route: RouteInstance<Params>, {otherwise}: ChainParams = {}): RouteInstance<Params> {
    const sessionCheckStarted = createEvent<RouteParamsAndQuery<Params>>();
    const getAnonUser = createEvent<RouteParamsAndQuery<Params>>();

    // сделать запрос за сессией, если начальный статус Init
    sample({
        clock: sessionCheckStarted,
        source: $authStatus,
        filter: (status) => status === AuthorizationStatus.Init,
        target: sessionRequestFx, // запрос за токеном, например
    })
    // проверка статусов авторизован
    const alreadyAuthorized = sample({
        clock: sessionCheckStarted,
        source: $authStatus,
        filter: (status) => status === AuthorizationStatus.Auth,
    });
    // проверка статусов НЕ авторизован
    const alreadyAnon = sample({
        clock: sessionCheckStarted,
        source: $authStatus,
        filter: (status) => status === AuthorizationStatus.Anon,
    });
    // если аноним или запрос упал и роут открыт то сделать запрос ещё раз
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
        beforeOpen: sessionCheckStarted, // выполни перед открытием роута
        openOn: [alreadyAuthorized, sessionRequestFx.done], // открой если
        cancelOn: [alreadyAnon] // отмени если
    });
}
