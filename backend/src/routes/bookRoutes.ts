import { Router } from 'express';
import {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  getSalesStats,
} from '../controllers/booksController';

const router = Router();

router.get('/', getBooks);
router.get('/sales', getSalesStats);
router.get('/:id', getBookById); // 개별 책 조회 라우트
router.post('/', createBook); // 책 생성 엔드포인트
router.put('/:id', updateBook); // 책 수정 엔드포인트
router.delete('/:id', deleteBook); // 책 삭제 엔드포인트

export default router;
