import { createRoutesView } from 'atomic-router-react';
import { BooksRoute } from '@pages/books';
import { BookRoute } from '@pages/book';

export const Pages = createRoutesView({
    routes: [BooksRoute, BookRoute],
});