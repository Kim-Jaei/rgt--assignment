import { useEffect, useState } from 'react';
import api from '../services/api';
import Layout from '../components/Layout';
import BookCard from '../components/BookCard';
import { Book } from '../types/Book';

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [minPrice, setMinPrice] = useState<number | ''>('');
  const [maxPrice, setMaxPrice] = useState<number | ''>('');
  const [sortBy, setSortBy] = useState<string>('title');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (minPrice !== '') params.append('minPrice', minPrice.toString());
      if (maxPrice !== '') params.append('maxPrice', maxPrice.toString());
      params.append('sortBy', sortBy);
      params.append('order', sortOrder);

      // 프론트에서 직접 슬라이싱
      params.append('page', currentPage.toString());
      params.append('limit', '10'); // 1페이지당 10개

      const res = await api.get(`/books?${params.toString()}`);

      if (res.data && Array.isArray(res.data.books)) {
        const allBooks = res.data.books;
        // 백엔드가 내려주는 전체 개수 (res.data.total) 사용
        const totalCount = res.data.total || allBooks.length;

        // 페이지 개수 계산
        const pageCount = Math.ceil(totalCount / 10);
        setTotalPages(pageCount);

        // 실제로 현재 페이지에 보여줄 책들만 slice
        const startIndex = (currentPage - 1) * 10;
        const endIndex = currentPage * 10;
        const pageBooks = allBooks.slice(startIndex, endIndex);
        setBooks(pageBooks);
      } else if (Array.isArray(res.data)) {
        const allBooks = res.data;
        const totalCount = allBooks.length;
        const pageCount = Math.ceil(totalCount / 10);
        setTotalPages(pageCount);

        const startIndex = (currentPage - 1) * 10;
        const endIndex = currentPage * 10;
        const pageBooks = allBooks.slice(startIndex, endIndex);
        setBooks(pageBooks);
      } else {
        console.warn('Unexpected API response format:', res.data);
        setBooks([]);
        setTotalPages(1);
      }

      setError(null);
    } catch (err) {
      console.error(err);
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
    <Layout title="재이 서점">
      <div className="filters-container">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="제목 또는 저자 검색"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <div className="price-filters">
            <input
              type="number"
              placeholder="최소 가격"
              value={minPrice}
              onChange={(e) =>
                setMinPrice(e.target.value ? Number(e.target.value) : '')
              }
              className="price-input"
            />
            <span>~</span>
            <input
              type="number"
              placeholder="최대 가격"
              value={maxPrice}
              onChange={(e) =>
                setMaxPrice(e.target.value ? Number(e.target.value) : '')
              }
              className="price-input"
            />
          </div>
          <button type="submit" className="search-button">
            검색
          </button>
        </form>

        <div className="sort-controls">
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
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="sort-direction"
          >
            {sortOrder === 'asc' ? '오름차순 ↑' : '내림차순 ↓'}
          </button>
        </div>
      </div>

      {loading && <div className="loading-spinner">로딩 중...</div>}
      {error && <div className="error-message">{error}</div>}

      {!loading && !error && books.length > 0 ? (
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

            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pageNum = Math.min(
                Math.max(currentPage - 2 + i, 1),
                totalPages
              );
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`pagination-button ${
                    currentPage === pageNum ? 'active' : ''
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="pagination-button"
            >
              다음
            </button>
          </div>
        </>
      ) : (
        <p className="no-results">책이 없습니다.</p>
      )}
    </Layout>
  );
}
