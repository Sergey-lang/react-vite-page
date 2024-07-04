import BooksPage from '@pages/books/BooksPage.tsx';
import { currentRoute } from '@pages/books/model.ts';

export const BooksRoute = {
    view: BooksPage,
    route: currentRoute,
};
