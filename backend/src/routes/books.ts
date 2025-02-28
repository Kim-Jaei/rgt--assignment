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
router.get('/:id', getBookById);
router.post('/', createBook);
router.put('/:id', updateBook);
router.delete('/:id', deleteBook);

export default router;
