import { useEffect, useState } from 'react';
import Link from 'next/link';
import api from '../services/api';

export default function Stats() {
  const [totalSales, setTotalSales] = useState<number | null>(null);

  useEffect(() => {
    api
      .get('/books/sales')
      .then((res) => setTotalSales(res.data.totalSales))
      .catch((err) => console.error(err));
  }, []);

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
        <h2>판매 수량 통계</h2>
        {totalSales !== null ? (
          <p>전체 책 판매 수량 합계: {totalSales}</p>
        ) : (
          <p>통계 정보를 불러오는 중입니다...</p>
        )}
        <br />
        <Link href="/">메인으로 돌아가기</Link>
      </main>
    </div>
  );
}
