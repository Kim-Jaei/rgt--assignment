import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import api from '../services/api';
import { Book } from '../types/Book';
import BookCard from '../components/BookCard';

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [minPrice, setMinPrice] = useState<number | ''>('');
  const [maxPrice, setMaxPrice] = useState<number | ''>('');
  const [sortBy, setSortBy] = useState('title');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (minPrice !== '') params.append('minPrice', minPrice.toString());
      if (maxPrice !== '') params.append('maxPrice', maxPrice.toString());
      params.append('sortBy', sortBy);
      params.append('order', sortOrder);
      params.append('page', currentPage.toString());
      params.append('limit', '10');
      const res = await api.get(`/books?${params.toString()}`);
      if (
        res.data &&
        Array.isArray(res.data.books) &&
        typeof res.data.total === 'number'
      ) {
        setBooks(res.data.books);
        setTotalPages(Math.ceil(res.data.total / 10));
      } else {
        setBooks([]);
        setTotalPages(1);
      }
      setError(null);
    } catch (err) {
      setError('책 목록을 불러오는 데 실패했습니다.');
      setBooks([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [currentPage, sortBy, sortOrder]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchBooks();
  };

  return (
    <Layout title="재이서점">
      <h2 className="page-title">책 목록</h2>
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="제목/저자 검색"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <input
          type="number"
          placeholder="최소 가격"
          value={minPrice}
          onChange={(e) =>
            setMinPrice(e.target.value ? Number(e.target.value) : '')
          }
          className="price-input"
        />
        <input
          type="number"
          placeholder="최대 가격"
          value={maxPrice}
          onChange={(e) =>
            setMaxPrice(e.target.value ? Number(e.target.value) : '')
          }
          className="price-input"
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="sort-select"
        >
          <option value="title">제목</option>
          <option value="author">저자</option>
          <option value="price">가격</option>
          <option value="sales">판매량</option>
        </select>
        <button
          type="button"
          onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
          className="sort-direction"
        >
          {sortOrder === 'asc' ? '오름차순' : '내림차순'}
        </button>
        <button type="submit" className="search-button">
          검색
        </button>
      </form>
      {loading && <div className="loading-spinner">로딩 중...</div>}
      {error && (
        <div className="error-message" style={{ color: 'red' }}>
          {error}
        </div>
      )}
      {!loading && !error && (
        <>
          <div className="book-grid">
            {books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
          <div className="pagination">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="pagination-button"
            >
              이전
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`pagination-button ${
                    currentPage === pageNum ? 'active' : ''
                  }`}
                >
                  {pageNum}
                </button>
              )
            )}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="pagination-button"
            >
              다음
            </button>
          </div>
        </>
      )}
    </Layout>
  );
}
