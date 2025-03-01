import Head from 'next/head';
import Link from 'next/link';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title = '재이서점' }) => {
  return (
    <div className="layout">
      <Head>
        <title>{title}</title>
        <meta name="description" content="온라인 서점 애플리케이션" />
        <link rel="icon" href="data:;base64,=" /> {/* favicon 404 방지 */}
      </Head>

      <header className="header">
        <div className="header-content">
          <h1 className="site-title">
            <Link href="/" className="site-title-link">
              📚 재이서점점
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

      <main className="main-content">{children}</main>

      <footer className="footer">
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
