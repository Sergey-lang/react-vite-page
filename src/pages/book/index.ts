import BookPage from '@pages/book/BookPage.tsx';
import { currentRoute } from '@pages/book/model.ts';

export const BookRoute = {
    view: BookPage,
    route: currentRoute,
};