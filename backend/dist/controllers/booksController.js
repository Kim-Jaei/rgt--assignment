"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSalesStats = exports.deleteBook = exports.updateBook = exports.createBook = exports.getBookById = exports.getBooks = void 0;
// 임시로 사용할 책 데이터 (DB 없이 메모리에 저장)
let books = [
    {
        id: 1,
        title: '아버지의 해방일지',
        author: '정지아',
        price: 15000,
        sales: 120,
    },
    { id: 2, title: '흔한남매 14', author: '흔한남매', price: 12600, sales: 95 },
    { id: 3, title: '불편한 편의점', author: '김호연', price: 14000, sales: 210 },
    {
        id: 4,
        title: '달러구트 꿈 백화점',
        author: '이미예',
        price: 13800,
        sales: 180,
    },
    { id: 5, title: '파친코', author: '이민진', price: 16800, sales: 142 },
    {
        id: 6,
        title: '메리골드 마음 세탁소',
        author: '윤정은',
        price: 13500,
        sales: 73,
    },
    {
        id: 7,
        title: '물고기는 존재하지 않는다',
        author: '룰루 밀러',
        price: 17000,
        sales: 154,
    },
    { id: 8, title: '역행자', author: '자청', price: 17500, sales: 89 },
    { id: 9, title: '작별인사', author: '김영하', price: 14000, sales: 112 },
    {
        id: 10,
        title: '아픔이 길이 되려면',
        author: '김승섭',
        price: 15800,
        sales: 58,
    },
    {
        id: 11,
        title: '트렌드 코리아 2025',
        author: '김난도',
        price: 18800,
        sales: 201,
    },
    { id: 12, title: '기후변화 특강', author: '최기주', price: 16000, sales: 45 },
    {
        id: 13,
        title: '사피엔스',
        author: '유발 하라리',
        price: 22000,
        sales: 173,
    },
    { id: 14, title: '러브 마인드', author: '하지현', price: 15000, sales: 67 },
    {
        id: 15,
        title: '오늘 밤, 세계에서 이 눈물이 사라진다 해도',
        author: '이치조 미사키',
        price: 14000,
        sales: 88,
    },
    {
        id: 16,
        title: '인간 실격',
        author: '다자이 오사무',
        price: 12500,
        sales: 131,
    },
    {
        id: 17,
        title: '이상한 과자 가게 전천당 11',
        author: '히로시마 레이코',
        price: 11200,
        sales: 76,
    },
    { id: 18, title: '돈의 속성', author: '김승호', price: 17800, sales: 115 },
    {
        id: 19,
        title: '소크라테스 익스프레스',
        author: '에릭 와이너',
        price: 18000,
        sales: 94,
    },
    {
        id: 20,
        title: '어떻게 말해줘야 할까',
        author: '오은영',
        price: 17500,
        sales: 147,
    },
    { id: 21, title: '백년 허리', author: '정석순', price: 16800, sales: 63 },
    { id: 22, title: '긴긴밤', author: '루리', price: 13500, sales: 82 },
    {
        id: 23,
        title: '인생은 실전이다',
        author: '신영준',
        price: 15800,
        sales: 107,
    },
    {
        id: 24,
        title: '미라클 모닝',
        author: '할 엘로드',
        price: 13800,
        sales: 129,
    },
    {
        id: 25,
        title: '부의 추월차선',
        author: 'M.J. 드마코',
        price: 17500,
        sales: 136,
    },
    { id: 26, title: '모순', author: '양귀자', price: 12000, sales: 51 },
    {
        id: 27,
        title: '공정하다는 착각',
        author: '마이클 샌델',
        price: 20000,
        sales: 94,
    },
    { id: 28, title: '피프티 피플', author: '정세랑', price: 14800, sales: 77 },
    { id: 29, title: '1984', author: '조지 오웰', price: 13500, sales: 118 },
    {
        id: 30,
        title: '소유냐, 존재냐',
        author: '에리히 프롬',
        price: 15000,
        sales: 86,
    },
    {
        id: 31,
        title: '해리 포터와 마법사의 돌',
        author: 'J.K. 롤링',
        price: 14500,
        sales: 195,
    },
    {
        id: 32,
        title: '나미야 잡화점의 기적',
        author: '히가시노 게이고',
        price: 14500,
        sales: 167,
    },
    { id: 33, title: '완전한 행복', author: '정유정', price: 16000, sales: 104 },
    {
        id: 34,
        title: '스즈메의 문단속',
        author: '신카이 마코토',
        price: 14800,
        sales: 122,
    },
    {
        id: 35,
        title: '총, 균, 쇠',
        author: '재레드 다이아몬드',
        price: 28000,
        sales: 79,
    },
    {
        id: 36,
        title: '정의란 무엇인가',
        author: '마이클 샌델',
        price: 16000,
        sales: 156,
    },
    {
        id: 37,
        title: '시간을 파는 상점',
        author: '김선영',
        price: 12800,
        sales: 68,
    },
    { id: 38, title: '마음의 법칙', author: '폴 블룸', price: 16800, sales: 55 },
    {
        id: 39,
        title: '당신은 결국 무엇이든 해내는 사람',
        author: '김상현',
        price: 16000,
        sales: 91,
    },
    {
        id: 40,
        title: '운명을 바꾸는 부자의 습관',
        author: '이영표',
        price: 16800,
        sales: 72,
    },
    {
        id: 41,
        title: '기분이 태도가 되지 말자',
        author: '레몬심리',
        price: 15800,
        sales: 84,
    },
    {
        id: 42,
        title: '생각에 관한 생각',
        author: '대니얼 카너먼',
        price: 22000,
        sales: 103,
    },
    {
        id: 43,
        title: '하루공부 365',
        author: '하루공부',
        price: 17800,
        sales: 59,
    },
    { id: 44, title: '세븐 테크', author: '김미경', price: 18000, sales: 111 },
    {
        id: 45,
        title: '내가 틀릴 수도 있습니다',
        author: '비욘 나티코 린데블라드',
        price: 16000,
        sales: 47,
    },
    { id: 46, title: '저만치 혼자서', author: '장기하', price: 15500, sales: 83 },
    {
        id: 47,
        title: '잘했고 잘하고 있고 잘 될 것이다',
        author: '정배',
        price: 14800,
        sales: 96,
    },
    {
        id: 48,
        title: '푸른 사자 와니니',
        author: '이현',
        price: 13500,
        sales: 61,
    },
    { id: 49, title: '망그러진 만화', author: '유랑', price: 13800, sales: 74 },
    { id: 50, title: '데미안', author: '헤르만 헤세', price: 12000, sales: 138 },
    {
        id: 51,
        title: '말 한마디의 힘',
        author: '한세민',
        price: 15800,
        sales: 65,
    },
    {
        id: 52,
        title: '바다가 들려준 이야기',
        author: '재스민 카우',
        price: 16500,
        sales: 52,
    },
    { id: 53, title: '방구석 미술관', author: '조원재', price: 19800, sales: 87 },
];
/**
 * 책 목록 조회 API
 * (검색, 필터, 정렬, 페이지네이션 적용)
 */
const getBooks = (req, res) => {
    // 1) 쿼리 파라미터 받기
    let { search, // 제목/저자 검색어
    minPrice, // 최소 가격
    maxPrice, // 최대 가격
    sortBy = 'title', // 정렬 기준(title, author, price, sales)
    order = 'asc', // 오름차순 asc / 내림차순 desc
    page = '1', // 현재 페이지
    limit = '10', // 페이지당 표시할 책 개수
     } = req.query;
    // 2) 숫자 변환 (문자열 -> number)
    const currentPage = parseInt(page, 10) || 1;
    const pageLimit = parseInt(limit, 10) || 10;
    const min = parseInt(minPrice, 10) || 0;
    const max = parseInt(maxPrice, 10) || Number.MAX_SAFE_INTEGER;
    // 3) 원본 배열 복사 후 가공
    let result = [...books];
    // 3-1) 검색어 필터 (제목 혹은 저자에 search가 포함되어 있으면 통과)
    if (search) {
        const lowerSearch = search.toLowerCase();
        result = result.filter((book) => book.title.toLowerCase().includes(lowerSearch) ||
            book.author.toLowerCase().includes(lowerSearch));
    }
    // 3-2) 가격대 필터
    result = result.filter((book) => book.price >= min && book.price <= max);
    // 3-3) 정렬
    result.sort((a, b) => {
        let valA;
        let valB;
        switch (sortBy) {
            case 'author':
                valA = a.author;
                valB = b.author;
                break;
            case 'price':
                valA = a.price;
                valB = b.price;
                break;
            case 'sales':
                valA = a.sales;
                valB = b.sales;
                break;
            case 'title':
            default:
                valA = a.title;
                valB = b.title;
                break;
        }
        // 오름차순/내림차순 비교
        if (valA < valB)
            return order === 'asc' ? -1 : 1;
        if (valA > valB)
            return order === 'asc' ? 1 : -1;
        return 0;
    });
    // 3-4) 페이지네이션
    const total = result.length; // 필터/정렬된 전체 결과 수
    const startIndex = (currentPage - 1) * pageLimit;
    const endIndex = startIndex + pageLimit;
    const pageBooks = result.slice(startIndex, endIndex);
    // 4) 최종 응답
    res.json({
        total,
        books: pageBooks, // 현재 페이지에 해당하는 책 목록
    });
};
exports.getBooks = getBooks;
/**
 * 책 상세 조회 API
 */
const getBookById = (req, res) => {
    const id = parseInt(req.params.id, 10);
    const book = books.find((b) => b.id === id);
    if (!book) {
        return res.status(404).json({ error: 'Book not found' });
    }
    res.json(book);
};
exports.getBookById = getBookById;
/**
 * 책 추가 API
 */
const createBook = (req, res) => {
    const { title, author, price, sales } = req.body;
    // 유효성 검사
    if (!title || !author || !price) {
        return res.status(400).json({ message: '필수 정보가 누락되었습니다.' });
    }
    // 새 책 추가 (실제 운영환경에서는 DB에 INSERT)
    const newBook = {
        id: books.length + 1,
        title,
        author,
        price: Number(price),
        sales: Number(sales) || 0,
    };
    books.push(newBook);
    res.status(201).json({
        message: '책이 성공적으로 등록되었습니다.',
        book: newBook,
    });
};
exports.createBook = createBook;
/**
 * 책 수정 API
 */
const updateBook = (req, res) => {
    const bookId = parseInt(req.params.id, 10);
    const { title, author, price } = req.body;
    const bookIndex = books.findIndex((book) => book.id === bookId);
    if (bookIndex === -1) {
        return res.status(404).json({ message: '책을 찾을 수 없습니다.' });
    }
    // 기존 정보에 덮어쓰기
    books[bookIndex] = Object.assign(Object.assign({}, books[bookIndex]), { title: title || books[bookIndex].title, author: author || books[bookIndex].author, price: price || books[bookIndex].price });
    res.json(books[bookIndex]);
};
exports.updateBook = updateBook;
/**
 * 책 삭제 API
 */
const deleteBook = (req, res) => {
    const bookId = parseInt(req.params.id, 10);
    const bookIndex = books.findIndex((book) => book.id === bookId);
    if (bookIndex === -1) {
        return res.status(404).json({ message: '책을 찾을 수 없습니다.' });
    }
    books.splice(bookIndex, 1);
    res.json({ message: '책이 성공적으로 삭제되었습니다.' });
};
exports.deleteBook = deleteBook;
/**
 * 판매 통계 API
 */
const getSalesStats = (req, res) => {
    // 전체 판매량
    const totalSales = books.reduce((sum, b) => sum + b.sales, 0);
    // 전체 책 개수
    const totalBooks = books.length;
    // 총 매출(가격 * 판매량 합)
    const totalRevenue = books.reduce((sum, b) => sum + b.price * b.sales, 0);
    // 베스트셀러 Top 5 (판매량 기준 내림차순 정렬 후 상위 5개)
    const bestSellers = [...books].sort((a, b) => b.sales - a.sales).slice(0, 5);
    // 가격대별 판매 분포
    const priceRanges = {
        under10000: 0,
        _10000to15000: 0,
        _15000to20000: 0,
        over20000: 0,
    };
    books.forEach((book) => {
        if (book.price < 10000)
            priceRanges.under10000 += book.sales;
        else if (book.price < 15000)
            priceRanges._10000to15000 += book.sales;
        else if (book.price < 20000)
            priceRanges._15000to20000 += book.sales;
        else
            priceRanges.over20000 += book.sales;
    });
    res.json({
        totalSales,
        totalBooks,
        totalRevenue,
        averageSalePerBook: (totalSales / totalBooks).toFixed(2),
        bestSellers,
        priceRanges,
    });
};
exports.getSalesStats = getSalesStats;
