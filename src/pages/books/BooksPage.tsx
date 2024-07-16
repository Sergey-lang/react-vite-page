import { useUnit } from 'effector-react';
import { $booksFullDataStore, addBook, getBooksListFx } from '@pages/books/model.ts';
import { IBook } from '@entity/book/types.ts';
import { Link } from 'atomic-router-react';
import { useEffect } from 'react';
import { routes } from '@shared/routing.ts';
import BookCard from '@components/BookCard/BookCard.tsx';

const newTestBook: IBook = {
    title: 'You and I',
    author: `I'm`,
    id: 989351531,
    publication_year: 2024,
    cover_image: '',
    description: 'This is custom description',
    genre: []
}

const BooksPage = () => {
    const [getBooks, loading] = useUnit([getBooksListFx, getBooksListFx.pending])
    const {count, books} = useUnit($booksFullDataStore);
    const onClickAddBook = (): void => {
        addBook(newTestBook);
    }

    useEffect(() => {
        getBooks();
    }, []);


    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <main>
            <Link
                params={{profileId: 2}}
                to={routes.auth.profile}
                aria-label="open profile"
            >
                Open AUTH PROFILE
            </Link>
            <br/>
            {/*<button onClick={()=> tokenReceived('hello!')}>Make me Auth</button>*/}
            {/*<button onClick={() => tokenExpired()}>Reset Token</button>*/}
            <br/>
            <div style={{display: 'flex', gap: '15px'}}>
                <h2>Books count: {count}</h2>
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
                    onClick={getBooks}
                >
                    Fetch books LIST
                </button>
            </div>

            <br/>
            <div className="books-board">
                {books?.map((b) => {
                    return (
                        <BookCard key={b.id} {...b}/>
                    )
                })}
            </div>
        </main>
    );
};

export default BooksPage;