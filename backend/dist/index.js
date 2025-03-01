"use strict";
// src/index.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const books_1 = __importDefault(require("./routes/books"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api/books', books_1.default);
app.get('/', (req, res) => {
    res.send('Hello from backend!');
});
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Backend running on port ${PORT}`);
});
