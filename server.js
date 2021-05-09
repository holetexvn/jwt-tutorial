import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

const books = [
  {
    id: 1,
    name: 'Chi Pheo',
    author: 'ABC',
  },
  {
    id: 2,
    name: 'Chien tranh va Hoa Binh',
    author: 'DEF',
  },
];

app.get('/books', authenToken, (req, res) => {
  res.json({ status: 'Success', data: books });
});

function authenToken(req, res, next) {
  const authorizationHeader = req.headers['authorization'];
  // 'Beaer [token]'
  const token = authorizationHeader.split(' ')[1];
  if (!token) res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
    console.log(err, data);
    if (err) res.sendStatus(403);
    next();
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
