// src/index.ts

import express from 'express';
import cors from 'cors';
import booksRouter from './routes/books';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/books', booksRouter);

app.get('/', (req, res) => {
  res.send('Hello from backend!');
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
