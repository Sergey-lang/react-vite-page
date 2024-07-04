import ProfilePage from '@pages/profile/ProfilePage.tsx';
import { currentRoute } from '@pages/profile/model.ts';

export const ProfileRoute = {
    view: ProfilePage,
    route: currentRoute,
};
