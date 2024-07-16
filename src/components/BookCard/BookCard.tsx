import { Link } from 'atomic-router-react';
import { routes } from '@shared/routing.ts';
import { IBook } from '@entity/book/types.ts';

const BookCard = ({id, title, author, publication_year, cover_image}: IBook) => {
    return (
        <section className="book-card">
            <picture>
                <img src={cover_image} alt={title}/>
            </picture>
            <h3>{title}</h3>
            <h4>{author}</h4>
            <time>{publication_year}</time>
            <div style={{width: '100%', display: 'flex'}}>
                <Link
                    params={{bookId: id}}
                    to={routes.shared.book}
                    style={{marginLeft: 'auto'}}
                    aria-label="open"
                >
                    Open
                </Link>
            </div>
        </section>
    );
};

export default BookCard;