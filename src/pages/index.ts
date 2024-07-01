import { createRoutesView } from 'atomic-router-react';
import { HomeRoute } from '@pages/home';

export const Pages = createRoutesView({
    routes: [HomeRoute],
});