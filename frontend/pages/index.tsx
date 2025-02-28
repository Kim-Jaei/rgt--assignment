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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // 한 페이지에 보여줄 아이템 수

  useEffect(() => {
    api
      .get('/books')
      .then((res) => {
        setBooks(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('데이터를 불러오는데 실패했습니다.');
        setLoading(false);
      });
  }, []);

  // 필터링
  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 페이지네이션
  const totalItems = filteredBooks.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <header>
        <h1>온라인 서점</h1>
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
        {/* 검색 입력창 */}
        <input
          type="text"
          placeholder="제목 또는 저자 검색"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // 검색 시 첫 페이지로 초기화
          }}
          style={{
            marginBottom: '20px',
            padding: '8px',
            width: '100%',
            maxWidth: '400px',
          }}
        />
        {loading && <p>로딩중...</p>}
        {error && <p>{error}</p>}
        {!loading &&
          !error &&
          (filteredBooks.length === 0 ? (
            <p>검색 결과가 없습니다.</p>
          ) : (
            <ul>
              {currentBooks.map((book) => (
                <li key={book.id}>
                  <Link href={`/books/${book.id}`}>
                    {book.title} (저자: {book.author}) - {book.price}원
                  </Link>
                </li>
              ))}
            </ul>
          ))}
        {/* 페이지네이션 컨트롤 */}
        <div style={{ marginTop: '20px' }}>
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                style={{
                  marginRight: '5px',
                  padding: '8px 12px',
                  backgroundColor: currentPage === page ? '#555' : '#333',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                {page}
              </button>
            )
          )}
        </div>
      </main>
    </div>
  );
}
