const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

// Load .env if available (optional)
try {
  require('dotenv').config();
} catch (e) {
  // dotenv not installed; ignore
}

const app = express();
const db = new sqlite3.Database('./recipes.db');

app.use(cors());
app.use(express.json());

// Simple test route
app.get('/', (req, res) => {
  res.send('Hello from the root!');
});

// Create a simple recipes table if it doesn't exist
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS recipes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      origin TEXT,
      category TEXT,
      servings INTEGER NOT NULL,
      ingredients_json TEXT NOT NULL
      ,
      instructions TEXT
    )
  `);

  // Ensure newer columns exist when the table was created without them
  db.all("PRAGMA table_info(recipes)", [], (err, rows) => {
    if (err) return;
    const cols = rows.map(r => r.name);
    if (!cols.includes('origin')) {
      db.run('ALTER TABLE recipes ADD COLUMN origin TEXT');
    }
    if (!cols.includes('instructions')) {
      db.run('ALTER TABLE recipes ADD COLUMN instructions TEXT');
    }
  });
});

// Fetch all recipes
app.get('/recipes', (req, res) => {
  db.all('SELECT * FROM recipes', [], (err, rows) => {
    if (err) {
      res.status(500).json({error: err.message});
    } else {
      // Parse JSON string ingredients before sending
      const recipes = rows.map(row => ({
        ...row,
        ingredients: JSON.parse(row.ingredients_json)
      }));
      res.json(recipes);
    }
  });
});

// Add a new recipe
app.post('/recipes', (req, res) => {
  const { name, category, origin, servings, ingredients, instructions } = req.body;
  if (!name || !servings || !Array.isArray(ingredients)) {
    return res.status(400).json({ error: "Missing required fields." });
  }
  db.run(
    'INSERT INTO recipes (name, category, origin, servings, ingredients_json, instructions) VALUES (?, ?, ?, ?, ?, ?)',
    [name, category, origin || '', servings, JSON.stringify(ingredients), instructions || ''],
    function(err) {
      if (err) {
        res.status(500).json({error: err.message});
      } else {
        res.json({ id: this.lastID, name, category, origin, servings, ingredients, instructions });
      }
    }
  );
});

const PORT = process.env.PORT || 5001; // use 5001 to avoid macOS AirPlay/Bonjour conflicts on 5000
const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

server.on('error', (err) => {
  console.error('Server failed to start:', err.message);
  process.exit(1);
});