import { Request, Response } from 'express';
import { Book } from '../models/Book';

let books: Book[] = [
  { id: 1, title: '소년이 온다', author: '한강', price: 30000, sales: 10 },
  { id: 2, title: '소스 코드', author: '빌 게이츠', price: 25000, sales: 5 },
];

// 책 목록 조회
export const getBooks = (req: Request, res: Response) => {
  res.json(books);
};

// 책 상세 조회
export const getBookById = (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const book = books.find((b) => b.id === id);
  if (!book) {
    return res.status(404).json({ error: 'Book not found' });
  }
  res.json(book);
};

// 책 추가
export const createBook = (req: Request, res: Response) => {
  const { title, author, price, sales } = req.body;
  const newBook: Book = {
    id: books.length ? books[books.length - 1].id + 1 : 1,
    title,
    author,
    price,
    sales: sales || 0,
  };
  books.push(newBook);
  res.status(201).json(newBook);
};

// 책 수정
export const updateBook = (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const { title, author, price, sales } = req.body;
  const index = books.findIndex((b) => b.id === id);
  if (index < 0) {
    return res.status(404).json({ error: 'Book not found' });
  }
  books[index] = {
    ...books[index],
    title: title ?? books[index].title,
    author: author ?? books[index].author,
    price: price ?? books[index].price,
    sales: sales ?? books[index].sales,
  };
  res.json(books[index]);
};

// 책 삭제
export const deleteBook = (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const index = books.findIndex((b) => b.id === id);
  if (index < 0) {
    return res.status(404).json({ error: 'Book not found' });
  }
  books.splice(index, 1);
  res.status(204).send();
};

// 모든 책의 판매 수량 합계
export const getSalesStats = (req: Request, res: Response) => {
  const totalSales = books.reduce((sum, b) => sum + b.sales, 0);
  res.json({ totalSales });
};
