import { useEffect, useState } from 'react';
import api from '../services/api';
import { Book } from '../types/Book';

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 검색, 필터, 정렬
  const [searchTerm, setSearchTerm] = useState('');
  const [minPrice, setMinPrice] = useState<number | ''>('');
  const [maxPrice, setMaxPrice] = useState<number | ''>('');
  const [sortBy, setSortBy] = useState('title');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // 페이지네이션
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      // 쿼리 파라미터 구성
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (minPrice !== '') params.append('minPrice', minPrice.toString());
      if (maxPrice !== '') params.append('maxPrice', maxPrice.toString());
      params.append('sortBy', sortBy);
      params.append('order', sortOrder);
      params.append('page', currentPage.toString());
      params.append('limit', '10'); // 1페이지에 10개씩

      // API 호출
      const res = await api.get(`/books?${params.toString()}`);

      // 백엔드 응답이 { total: number, books: Book[] } 형태라고 가정
      if (
        res.data &&
        Array.isArray(res.data.books) &&
        typeof res.data.total === 'number'
      ) {
        setBooks(res.data.books);
        const totalCount = res.data.total; // 필터 후 전체 개수
        setTotalPages(Math.ceil(totalCount / 10));
      } else {
        // 혹시 예외적인 응답이 온 경우
        setBooks([]);
        setTotalPages(1);
        console.warn('Unexpected API response format:', res.data);
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

  // currentPage, sortBy, sortOrder, 검색 등등 바뀔 때마다 새로 API 호출
  useEffect(() => {
    fetchBooks();
  }, [currentPage, sortBy, sortOrder]);

  // 검색 버튼 클릭 시 1페이지부터 다시 검색
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchBooks();
  };

  return (
    <div>
      {/* 검색/필터 폼 */}
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="제목/저자 검색"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <input
          type="number"
          placeholder="최소 가격"
          value={minPrice}
          onChange={(e) =>
            setMinPrice(e.target.value ? Number(e.target.value) : '')
          }
        />
        <input
          type="number"
          placeholder="최대 가격"
          value={maxPrice}
          onChange={(e) =>
            setMaxPrice(e.target.value ? Number(e.target.value) : '')
          }
        />
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="title">제목</option>
          <option value="author">저자</option>
          <option value="price">가격</option>
          <option value="sales">판매량</option>
        </select>
        <button
          type="button"
          onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
        >
          {sortOrder === 'asc' ? '오름차순' : '내림차순'}
        </button>
        <button type="submit">검색</button>
      </form>

      {/* 로딩/에러/결과 */}
      {loading && <div>로딩 중...</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}

      {!loading && !error && (
        <>
          {/* 책 목록 */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }}>
            {books.map((book) => (
              <div key={book.id}>
                <h3>{book.title}</h3>
                <p>{book.author}</p>
                <p>{book.price}원</p>
                <p>판매량: {book.sales}</p>
              </div>
            ))}
          </div>

          {/* 페이지네이션 */}
          <div style={{ marginTop: '16px' }}>
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              이전
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  style={{
                    fontWeight: currentPage === pageNum ? 'bold' : 'normal',
                  }}
                >
                  {pageNum}
                </button>
              )
            )}

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              다음
            </button>
          </div>
        </>
      )}
    </div>
  );
}
