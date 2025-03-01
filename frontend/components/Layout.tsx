import Head from 'next/head';
import Link from 'next/link';
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title = '재이서점' }) => {
  return (
    <div className="layout">
      <Head>
        <title>{title}</title>
        <meta name="description" content="재이서점 애플리케이션" />
        {/* favicon 404 방지용 (임시 데이터 URI) */}
        <link rel="icon" href="data:;base64,=" />
      </Head>

      {/* 헤더 영역 */}
      <header
        className="header"
        style={{ padding: '16px', background: '#eee' }}
      >
        <div className="header-content">
          <h1 className="site-title">
            {/* 로고/타이틀 클릭 시 홈('/')으로 이동 */}
            <Link
              href="/"
              style={{ textDecoration: 'none', color: 'inherit' }}
              className="site-title-link"
            >
              📚 {title}
            </Link>
          </h1>
          <nav className="main-nav">
            <ul>
              <li>
                <Link href="/" className="nav-link">
                  홈
                </Link>
              </li>
              <li>
                <Link href="/stats" className="nav-link">
                  판매 통계
                </Link>
              </li>
              <li>
                <Link href="/books/new" className="nav-link">
                  책 등록
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* 메인 콘텐츠 영역 */}
      <main className="main-content" style={{ margin: '16px' }}>
        {children}
      </main>

      {/* 푸터 영역 */}
      <footer
        className="footer"
        style={{ textAlign: 'center', padding: '16px', background: '#eee' }}
      >
        <div className="footer-content">
          <p>
            &copy; {new Date().getFullYear()} 재이서점. All rights reserved.
          </p>
          <p>Email : rgt@rgt.kr</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
