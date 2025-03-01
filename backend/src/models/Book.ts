export interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  sales: number; // 판매 수량
}

import {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  getSalesStats,
} from '../controllers/booksController';
