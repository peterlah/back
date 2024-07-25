const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// MySQL 연결 설정
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// 연결 확인 용도 API
app.get('/api/message', (req, res) => {
  res.json({ message: 'Backend Connected' });
});

// 전체 항목 조회 엔드포인트
app.get('/api/items', (req, res) => {
  db.query('SELECT * FROM items', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({items: results});
  });
});

// 항목 생성 엔드포인트
app.post('/api/items', (req, res) => {
  const { name, description, price } = req.body;
  if (!name || !description || price === undefined) {
    return res.status(400).json({ error: 'Name, description, and price are required' });
  }

  db.query('INSERT INTO items (name, description, price) VALUES (?, ?, ?)', [name, description, price], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Database error', details: err.message });
    }
    res.status(201).json({ id: results.insertId, name, description, price });
  });
});

// 항목 삭제 엔드포인트
app.delete('/api/items/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM items WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Database error', details: err.message });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.status(200).json({ message: 'Item deleted successfully' });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
