import { routes } from '@shared/routing.ts';

export const currentRoute = routes.auth.profile;
currentRoute.opened.watch(() => {
    console.log('Profile opened')
})