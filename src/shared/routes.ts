import { createHistoryRouter, createRoute, createRouterControls } from 'atomic-router';
import { createBrowserHistory } from 'history';

export const routes = {
    shared: {
        books: createRoute(),
        book: createRoute<{ bookId: number }>(),
    },
}

export const mappedRoutes = [
    { path: "/", route: routes.shared.books },
    { path: "/books/:bookId", route: routes.shared.book },
];

export const controls = createRouterControls();

export const router = createHistoryRouter({
    routes: mappedRoutes,
    controls,
});

const history = createBrowserHistory();

router.setHistory(history);
