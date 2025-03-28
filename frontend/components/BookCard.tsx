import { useState } from 'react';
import Link from 'next/link';
import { Book } from '../types/Book';

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href={`/books/${book.id}`} passHref legacyBehavior>
      <a
        className="book-card-link"
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
        <div
          className="book-card"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="book-cover">
            <div
              className="cover-placeholder"
              style={{
                backgroundColor: `hsl(${(book.id * 20) % 360}, 70%, 80%)`,
                transform: isHovered ? 'scale(1.05)' : 'scale(1)',
              }}
            >
              <span className="book-title-short">
                {book.title.substring(0, 1)}
              </span>
            </div>
          </div>
          <div className="book-info">
            <h3 className="book-title">{book.title}</h3>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default BookCard;
