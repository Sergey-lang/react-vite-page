import { routes } from '@shared/routing.ts';
import { chainAuthorized } from '@shared/authRoute.ts';

export const currentRoute = routes.auth.profile;

const authRoute = chainAuthorized(currentRoute, {otherwise: routes.shared.books.open});
authRoute.opened.watch(() => {
    console.log('Auth Profile opened')
})
