import { combine, createEffect, createEvent, createStore, sample } from 'effector';
import { showErrorMessageFx } from '@shared/notifation.ts';
import { IBook } from '@entity/book/types.ts';
import { bookAPI } from '@entity/book/api.ts';
import { chainRoute } from 'atomic-router';
import { routes } from '@shared/routes.ts';

export const setBooks = createEvent<IBook[]>();
export const addBook = createEvent<IBook>();

export const $booksStore = createStore<IBook[]>([]);

const $booksCount = $booksStore.map((books) => books.length)
$booksStore.on(setBooks, (_, book) => book)
$booksStore.on(addBook, (store, book) => [...store, book])
export const $booksFullDataStore = combine({ books: $booksStore, count: $booksCount });

export const getBooksListFx = createEffect(bookAPI.fetchBooks);

sample({
    clock: getBooksListFx.doneData,
    fn: (clx) => clx,
    target: setBooks
})

sample({
    clock: getBooksListFx.failData,
    target: showErrorMessageFx,
})

const booksLoadedRoute = chainRoute({
    route: routes.shared.books,
    beforeOpen: {
        effect: getBooksListFx,
        mapParams: () => ({}),
    },
});

booksLoadedRoute.$isOpened;


