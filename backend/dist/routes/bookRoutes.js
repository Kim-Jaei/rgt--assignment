"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const booksController_1 = require("../controllers/booksController");
const router = (0, express_1.Router)();
router.get('/', booksController_1.getBooks);
router.get('/sales', booksController_1.getSalesStats);
router.get('/:id', booksController_1.getBookById); // 개별 책 조회 라우트
router.post('/', booksController_1.createBook); // 책 생성 엔드포인트
router.put('/:id', booksController_1.updateBook); // 책 수정 엔드포인트
router.delete('/:id', booksController_1.deleteBook); // 책 삭제 엔드포인트
exports.default = router;
