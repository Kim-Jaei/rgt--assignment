import express from 'express';
import cors from 'cors';
import booksRouter from './routes/books';

const app = express();
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log(`요청: ${req.method} ${req.url}`);
  next();
});
app.use('/api/books', booksRouter);

app.get('/', (req, res) => {
  res.send('Hello from backend!');
});

const PORT = process.env.PORT || 4000;

app.listen(4000, '0.0.0.0', () => {
  console.log(`Backend running on http://localhost:4000`);
});
