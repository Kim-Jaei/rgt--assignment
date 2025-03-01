import express from 'express';
import cors from 'cors';
import bookRoutes from './routes/bookRoutes';

const app = express();
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log(`요청: ${req.method} ${req.url}`);
  next();
});

app.use('/api/books', bookRoutes);

app.get('/', (req, res) => {
  res.send('Hello from backend!');
});

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 4000;

app.listen(PORT, '0.0.0.0', function () {
  console.log(`Backend running on http://localhost:${PORT}`);
});
