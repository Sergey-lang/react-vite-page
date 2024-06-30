import { createHistoryRouter, createRoute } from 'atomic-router';
import { createBrowserHistory } from 'history';

export const routes = {
    auth: {
        signIn: createRoute(),
        signUp: createRoute(),
    },
    private: {
        posts: createRoute(),
        post: createRoute<{ postId: string }>(),
    },
}

export const mappedRoutes = [
    { path: "/sign-in", route: routes.auth.signIn },
    { path: "/sign-up", route: routes.auth.signUp },
    { path: "/posts", route: routes.private.posts },
    { path: "/post/:postId", route: routes.private.post },
];

export const router = createHistoryRouter({
    routes: mappedRoutes,
});

const history = createBrowserHistory();

router.setHistory(history);