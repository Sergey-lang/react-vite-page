import { combine, createEffect, createEvent, createStore, sample } from 'effector';
import { showErrorMessageFx } from '@shared/notifation.ts';

export interface IBook {
    id: number;
    author: string;
    publication_year: number;
}

export const $booksStore = createStore<IBook[]>([]);

const $booksCount = $booksStore.map((books) => books.length)
export const setBooks = createEvent<IBook[]>();
export const addBook = createEvent<IBook>();
$booksStore.on(setBooks, (_, book) => book)
$booksStore.on(addBook, (store, book) => [...store, book])
export const $booksFullDataStore = combine({ books: $booksStore, count: $booksCount });

const bookAPI = {
    fetchBooks: async (): Promise<IBook[] | undefined> => {
        try {
            const resp = await fetch('https://freetestapi.com/api/v1/books', {
                method: 'GET'
            })

            return await resp.json();
        } catch (e) {
            console.log(e)
        }

    }
}

export const getBooksFx = createEffect(bookAPI.fetchBooks);

sample({
    clock: getBooksFx.doneData,
    fn: (clx) => clx,
    target: setBooks
})

sample({
    clock: getBooksFx.failData,
    target: showErrorMessageFx,
})
