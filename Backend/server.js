const express = require('express');
const cors = require('cors');
const db = require('./db');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

app.get('/api/portfolio', (req, res) => {
  db.all("SELECT * FROM portfolio", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.get('/api/portfolio/:id', (req, res) => {
  db.get("SELECT * FROM portfolio WHERE id = ?", [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Not found' });
    res.json(row);
  });
});

app.post('/api/portfolio', (req, res) => {
  const { owner_name, title, description, image_url, link, category } = req.body;
  db.run("INSERT INTO portfolio (owner_name, title, description, image_url, link, category) VALUES (?, ?, ?, ?, ?, ?) ",
    [owner_name, title, description, image_url, link, category],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID });
    });
});

app.put('/api/portfolio/:id', (req, res) => {
  const { owner_name, title, description, image_url, link, category } = req.body;
  db.run("UPDATE portfolio SET owner_name=?, title=?, description=?, image_url=?, link=?, category=?, updated_at=CURRENT_TIMESTAMP WHERE id=?",
    [owner_name, title, description, image_url, link, category, req.params.id],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ updated: true });
    });
});

app.delete('/api/portfolio/:id', (req, res) => {
  db.run("DELETE FROM portfolio WHERE id = ?", [req.params.id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: true });
  });
});

app.listen(PORT, () => console.log(`Portfolio API running on ${PORT}`));