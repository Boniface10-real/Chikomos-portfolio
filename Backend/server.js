require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 10000;
const DATA_FILE = path.join(__dirname, 'portfolio.json');

app.use(cors());
app.use(express.json());

function readData() {
  if (!fs.existsSync(DATA_FILE)) return [];
  return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
}
function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

app.get('/api/portfolio', (req, res) => {
  res.json(readData().reverse());
});

app.post('/api/portfolio', (req, res) => {
  const data = readData();
  const newItem = { id: Date.now(), ...req.body };
  data.push(newItem);
  writeData(data);
  res.json(newItem);
});

app.put('/api/portfolio/:id', (req, res) => {
  let data = readData();
  data = data.map(p => p.id == req.params.id ? { ...p, ...req.body, id: p.id } : p);
  writeData(data);
  res.json({ updated: true });
});

app.delete('/api/portfolio/:id', (req, res) => {
  let data = readData();
  data = data.filter(p => p.id != req.params.id);
  writeData(data);
  res.json({ deleted: true });
});

app.listen(PORT, () => console.log(`Portfolio API running on ${PORT}`));