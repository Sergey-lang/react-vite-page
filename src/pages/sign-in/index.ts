import { currentRoute } from './model';
import SignIn from './ui.tsx';

export const SignInRoute = {
    view: SignIn,
    route: currentRoute,
};