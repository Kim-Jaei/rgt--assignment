import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import api from '../../services/api';

interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  sales: number;
}

export default function BookDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [book, setBook] = useState<Book | null>(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [price, setPrice] = useState<number>(0);

  useEffect(() => {
    if (!id) return;
    api
      .get(`/books/${id}`)
      .then((res) => {
        setBook(res.data);
        setTitle(res.data.title);
        setAuthor(res.data.author);
        setPrice(res.data.price);
      })
      .catch((err) => console.error(err));
  }, [id]);

  const handleUpdate = async () => {
    if (!book) return;
    try {
      await api.put(`/books/${book.id}`, { title, author, price });
      alert('책 정보가 수정되었습니다.');
      router.push('/');
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    if (!book) return;
    try {
      await api.delete(`/books/${book.id}`);
      alert('책이 삭제되었습니다.');
      router.push('/');
    } catch (error) {
      console.error(error);
    }
  };

  if (!book) return <div className="container">로딩중...</div>;

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
        <h2>책 상세 정보</h2>
        <div>
          <label>제목: </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ marginBottom: '10px' }}
          />
        </div>
        <div>
          <label>저자: </label>
          <input
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            style={{ marginBottom: '10px' }}
          />
        </div>
        <div>
          <label>가격: </label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            style={{ marginBottom: '10px' }}
          />
        </div>
        <div>
          <label>판매 수량: </label>
          <span>{book.sales}</span>
        </div>
        <br />
        <button onClick={handleUpdate}>수정하기</button>
        <button onClick={handleDelete} style={{ marginLeft: '10px' }}>
          삭제하기
        </button>
        <br />
        <br />
        <button onClick={() => router.push('/')}>목록으로 돌아가기</button>
      </main>
    </div>
  );
}
