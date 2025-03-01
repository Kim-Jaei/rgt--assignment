import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import api from '../../services/api';
import { Book } from '../../types/Book';

export default function BookDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    fetchBook();
  }, [id]);

  const fetchBook = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/books/${id}`);
      setBook(res.data);
      setError(null);
    } catch (err) {
      setError('책 정보를 불러오는 데 실패했습니다.');
      setBook(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout title="책 상세 정보">
        <div className="book-detail-container">로딩 중...</div>
      </Layout>
    );
  }

  if (error || !book) {
    return (
      <Layout title="책 상세 정보">
        <div className="book-detail-container error-message">
          {error || '책 정보를 찾을 수 없습니다.'}
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={book.title}>
      <div className="book-detail-container">
        <h2>{book.title}</h2>
        <p>
          <strong>저자:</strong> {book.author}
        </p>
        <p>
          <strong>가격:</strong> {book.price.toLocaleString()}원
        </p>
        <p>
          <strong>판매량:</strong> {book.sales}
        </p>
      </div>
    </Layout>
  );
}
