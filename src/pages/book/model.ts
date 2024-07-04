import { createEffect, createStore } from 'effector';
import { IBook } from '@entity/book/types.ts';
import { bookAPI } from '@entity/book/api.ts';
import { chainRoute } from 'atomic-router';
import { routes } from '@shared/routing.ts';

export const currentRoute = routes.shared.book;
export const $bookStore = createStore<IBook>({});
export const getBookFx = createEffect(bookAPI.fetchBook);

$bookStore.on(getBookFx.doneData, (_, book) => book);

chainRoute({
    route: routes.shared.book,
    beforeOpen: {
        effect: getBookFx,
        mapParams: ({ params }) => params.bookId,
    },
});