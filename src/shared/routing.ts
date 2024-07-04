import { createHistoryRouter, createRoute, createRouterControls } from 'atomic-router';
import { chainAuthorized } from '@shared/authRoute.ts';
import {createBrowserHistory} from 'history';
import { sample } from 'effector';
import { appStarted } from '@shared/config.ts';

export const routes = {
    shared: {
        books: createRoute(),
        book: createRoute<{ bookId: number }>(),
    },
    auth: {
        profile: chainAuthorized(createRoute<{ profileId: number }>()), // protected
        register: createRoute(),
        login: createRoute(),
    }
}

export const routesMap = [
    {
        path: '/',
        route: routes.shared.books
    },
    {
        path: '/books/:bookId',
        route: routes.shared.book
    },
    {
        path: '/profile/:profileId',
        route: routes.auth.profile
    },
    {
        path: '/register',
        route: routes.auth.register
    },
    {
        path: '/login',
        route: routes.auth.login
    },
]

export const controls = createRouterControls();

export const router = createHistoryRouter({
    routes: routesMap,
    controls,
})

// export const history = createBrowserHistory();
// router.setHistory(history)

sample({
    clock: appStarted,
    fn: () => createBrowserHistory(),
    target: router.setHistory
})
