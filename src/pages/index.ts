import { createRoutesView } from 'atomic-router-react';
import { BooksRoute } from '@pages/books';
import { BookRoute } from '@pages/book';
import { ProfileRoute } from '@pages/profile';

export const RoutesView = createRoutesView({
    routes: [BooksRoute, BookRoute, ProfileRoute],
});