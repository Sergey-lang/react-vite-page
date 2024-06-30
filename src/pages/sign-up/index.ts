import { currentRoute } from './model';
import SignUp from './ui.tsx';

export const SignUpRoute = {
    view: SignUp,
    route: currentRoute,
};