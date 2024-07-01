import { createHistoryRouter, createRoute } from 'atomic-router';
import { createBrowserHistory } from 'history';

export const routes = {
    auth: {
        home: createRoute(),
    },
}

export const mappedRoutes = [
    { path: "/", route: routes.auth.home },
];

export const router = createHistoryRouter({
    routes: mappedRoutes,
});

const history = createBrowserHistory();

router.setHistory(history);