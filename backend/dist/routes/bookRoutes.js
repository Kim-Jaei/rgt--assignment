"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const booksController_1 = require("../controllers/booksController");
const router = (0, express_1.Router)();
// 책 목록 조회 (검색, 필터, 정렬, 페이지네이션)
router.get('/', booksController_1.getBooks);
router.get('/sales', booksController_1.getSalesStats);
router.get('/:id', booksController_1.getBookById);
router.post('/', booksController_1.createBook);
router.put('/:id', booksController_1.updateBook);
router.delete('/:id', booksController_1.deleteBook);
exports.default = router;
