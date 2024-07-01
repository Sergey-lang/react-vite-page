import { useUnit } from 'effector-react';
import { $booksFullDataStore, addBook, getBooksFx, IBook } from '@pages/home/model.ts';
import { routes } from '@shared/routes.ts';

export const currentHomeRoute = routes.auth.home;


const HomePage = () => {
    const {count, books} = useUnit($booksFullDataStore);

    const [getBook, loading] = useUnit([getBooksFx, getBooksFx.pending])
    const onClickAddBook = () => {
        const newBook: IBook = {
            author: `I'm`,
            id: 989351531,
            publication_year: 2024,
        }

        addBook(newBook);
    }

    return (
        <main>
            <div style={{display: 'flex', gap: '15px'}}>
                <h2>кол-во книг: {count}</h2>
                {books?.length > 0 && (
                    <button
                        aria-label="add book"
                        aria-disabled={loading}
                        type="button"
                        onClick={onClickAddBook}
                    >
                        Add book
                    </button>
                )}
                <button
                    aria-label="fetch books"
                    aria-disabled={loading}
                    type="button"
                    disabled={loading}
                    onClick={getBook}
                >
                    fetch books list
                </button>
            </div>

            <br/>
            <div style={{display: 'flex', flexWrap: 'wrap', gap: '12px'}}>
                {books?.map((b) => {
                    return (
                        <section key={b.id} style={{flexGrow: 1, border: '1px solid silver', width: '15%'}}>
                            <h4>{b.author}</h4>
                        </section>
                    )
                })}
            </div>
        </main>
    );
};

export default HomePage;