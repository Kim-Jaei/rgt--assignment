import { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import Layout from '../components/Layout';
import api from '../services/api';

interface StatsData {
  totalSales: number;
  totalBooks: number;
  totalRevenue: number;
  averageSalePerBook: string;
  bestSellers: Array<{
    id: number;
    title: string;
    author: string;
    sales: number;
    price: number;
  }>;
  priceRanges: {
    under10000: number;
    _10000to15000: number;
    _15000to20000: number;
    over20000: number;
  };
}

export default function Stats() {
  const [statsData, setStatsData] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/books/sales');
        const data = response.data || {};
        setStatsData({
          totalSales: data.totalSales || 0,
          totalBooks: data.totalBooks || 0,
          totalRevenue: data.totalRevenue || 0,
          averageSalePerBook: data.averageSalePerBook || '0',
          bestSellers: data.bestSellers || [],
          priceRanges: data.priceRanges || {
            under10000: 0,
            _10000to15000: 0,
            _15000to20000: 0,
            over20000: 0,
          },
        });
        setLoading(false);
      } catch (err) {
        setError('통계 데이터를 불러오는 데 실패했습니다.');
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const priceRangeData = statsData
    ? [
        { name: '1만원 미만', value: statsData.priceRanges.under10000 },
        { name: '1만원-1.5만원', value: statsData.priceRanges._10000to15000 },
        { name: '1.5만원-2만원', value: statsData.priceRanges._15000to20000 },
        { name: '2만원 이상', value: statsData.priceRanges.over20000 },
      ]
    : [];

  const bestSellerData = statsData?.bestSellers || [];
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <Layout title="판매 통계">
      <h2 className="page-title">판매 통계 대시보드</h2>
      {loading && <div className="loading-spinner">로딩 중...</div>}
      {error && <div className="error-message">{error}</div>}
      {statsData && (
        <div className="stats-container">
          <div className="stats-cards">
            <div className="stats-card">
              <h3>총 판매 수량</h3>
              <p className="stats-number">
                {statsData.totalSales.toLocaleString()}권
              </p>
            </div>
            <div className="stats-card">
              <h3>총 매출액</h3>
              <p className="stats-number">
                {statsData.totalRevenue.toLocaleString()}원
              </p>
            </div>
            <div className="stats-card">
              <h3>등록된 책</h3>
              <p className="stats-number">{statsData.totalBooks}종</p>
            </div>
            <div className="stats-card">
              <h3>책당 평균 판매량</h3>
              <p className="stats-number">{statsData.averageSalePerBook}권</p>
            </div>
          </div>
          <div className="charts-container">
            <div className="chart-section">
              <h3>베스트셀러 Top 5</h3>
              <BarChart
                width={600}
                height={300}
                data={bestSellerData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="title" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="sales" fill="#8884d8" name="판매량" />
              </BarChart>
            </div>
            <div className="chart-section">
              <h3>가격대별 판매 분포</h3>
              <PieChart width={400} height={300}>
                <Pie
                  data={priceRangeData}
                  cx={200}
                  cy={150}
                  labelLine={true}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {priceRangeData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
