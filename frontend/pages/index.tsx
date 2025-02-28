import { useEffect, useState } from 'react';
import Link from 'next/link';
import api from '../services/api';

interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  sales: number;
}

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    api
      .get('/books')
      .then((res) => setBooks(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <header>
        <h1>재이서점</h1>
      </header>
      <nav>
        <ul>
          <li>
            <Link href="/">홈</Link>
          </li>
          <li>
            <Link href="/stats">판매 통계</Link>
          </li>
        </ul>
      </nav>
      <main className="container">
        <h2>책 목록</h2>
        <ul>
          {books.map((book) => (
            <li key={book.id}>
              <Link href={`/books/${book.id}`}>
                {book.title} (저자: {book.author}) - {book.price}원
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
