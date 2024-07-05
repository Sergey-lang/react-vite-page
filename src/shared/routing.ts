import { createHistoryRouter, createRoute, createRouterControls } from 'atomic-router';
import { createBrowserHistory } from 'history';
import { sample } from 'effector';
import { appStarted } from '@shared/config.ts';

export const routes = {
    shared: {
        books: createRoute(),
        book: createRoute<{ bookId: number }>(),
    },
    auth: {
        profile: createRoute(),
        register: createRoute(),
        login: createRoute(),
    }
}

export const controls = createRouterControls();
export const router = createHistoryRouter({
    routes: [
        {
            path: '/',
            route: routes.shared.books,
        },
        {
            path: '/books/:bookId',
            route: routes.shared.book,
        },
        {
            path: '/profile',
            route: routes.auth.profile,
        },
    ],
    controls,
})

sample({
    clock: appStarted,
    fn: () => createBrowserHistory(),
    target: router.setHistory,
})
