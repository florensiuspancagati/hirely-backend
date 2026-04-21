import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(multer().none());

app.get('/', (req, res) => {
  res.send('Hello, Hirely Backend!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} : http://localhost:${PORT}`);
});