import React, { useState } from 'react';
import Layout from '../../components/Layout';
import api from '../../services/api';
import { useRouter } from 'next/router';

export default function NewBookPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [price, setPrice] = useState('');
  const [sales, setSales] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await api.post('/books', {
        title,
        author,
        price: Number(price),
        sales: Number(sales) || 0,
      });
      setSuccess('책이 성공적으로 등록되었습니다!');
      // 등록 후 폼 초기화
      setTitle('');
      setAuthor('');
      setPrice('');
      setSales('');
    } catch (err) {
      setError('책 등록에 실패했습니다.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="새 책 등록">
      <div className="book-form-container">
        <h2>새 책 등록</h2>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <form onSubmit={handleSubmit} className="book-form">
          <div className="form-group">
            <label htmlFor="title">제목</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="author">저자</label>
            <input
              type="text"
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="price">가격</label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="sales">판매량 (선택)</label>
            <input
              type="number"
              id="sales"
              value={sales}
              onChange={(e) => setSales(e.target.value)}
            />
          </div>

          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? '등록 중...' : '등록하기'}
          </button>
        </form>
      </div>
    </Layout>
  );
}
