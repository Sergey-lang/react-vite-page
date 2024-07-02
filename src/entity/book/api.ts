import { IBook } from '@entity/book/types.ts';

const API_VERSION = import.meta.env.MY_API_VERSION;
const BASE_URL = import.meta.env.MY_BASE_API_URL;
const ENTITY = 'books';

export const bookAPI = {
    fetchBooks: async (): Promise<IBook[] | undefined> => {
        try {
            const resp = await fetch(`${BASE_URL}/${API_VERSION}/${ENTITY}`)
            return await resp.json();
        } catch (e) {
            console.log(e)
        }

    },

    fetchBook: async (id: number): Promise<IBook | undefined> => {
        try {
            const resp = await fetch(`${BASE_URL}/${API_VERSION}/${ENTITY}/${id}`)
            return await resp.json();
        } catch (e) {
            console.log(e)
        }

    }
}