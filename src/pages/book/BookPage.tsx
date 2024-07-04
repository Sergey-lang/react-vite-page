import { useUnit } from 'effector-react';
import { $bookStore, getBookFx } from '@pages/book/model.ts';
import { routes } from '@shared/routing.ts';
import { createApi, createEvent, createStore, sample } from 'effector';
import { redirect } from 'atomic-router';
import { Link } from 'atomic-router-react';

const $counter = createStore<number>(0);
const resetCounter = createEvent();

const {plusCounter, minusCounter} = createApi($counter, {
    plusCounter: (count) => count + 1,
    minusCounter: (count) => count - 1,
})

const redirectEvent = createEvent<void>();

redirect({
    clock: redirectEvent,
    route: routes.shared.books,
});

$counter.reset(resetCounter)

sample({
    source: $counter,
    filter: count => count === 2 || count === -2,
    clock: [plusCounter, minusCounter],
    target: [redirectEvent, resetCounter]
})

const BookPage = () => {
    const [{title, author, publication_year}, loading, counter] = useUnit([$bookStore, getBookFx.pending, $counter]);
    const [plusCount, minusCount] = useUnit([plusCounter, minusCounter]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <main>
            Count: {counter}
            <div style={{width: '100%', display: 'flex'}}>
                <Link to={routes.shared.books} aria-label="back">Back</Link>
            </div>
            <section style={{flexGrow: 1, border: '1px solid silver', width: '15%'}}>
                564
                <h3>Title: {title}</h3>
                <h4>Author: {author}</h4>
                <time>Published: {publication_year}</time>
            </section>
            <button onClick={plusCount}>If 2 = redirect to books</button>
            <button onClick={minusCount}>Decr</button>
        </main>
    )
};

export default BookPage;