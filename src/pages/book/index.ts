import { routes } from '@shared/routes.ts';
import BookPage from '@pages/book/BookPage.tsx';

export const BookRoute = {
    view: BookPage,
    route: routes.shared.book,
};