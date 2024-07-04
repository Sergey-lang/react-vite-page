import { routes } from '@shared/routing.ts';

export const currentRoute = routes.auth.profile;

// const authRoute = currentRoute;
currentRoute.opened.watch(() => {
    console.log('Profile opened')
})