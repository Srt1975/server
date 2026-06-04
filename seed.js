const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./recipes.db');

const recipes = [
  {
    name: "Classic Pancakes",
    category: "Breakfast",
    origin: "American",
    servings: 4,
    ingredients: [
      { item: "All-purpose flour", qty: 2, unit: "cup", type: "weight" },
      { item: "Whole milk", qty: 1.5, unit: "cup", type: "liquid" },
      { item: "Large eggs", qty: 2, unit: "unit", type: "count" },
      { item: "Unsalted butter", qty: 2, unit: "tbsp", type: "weight" }
    ],
    instructions: "Whisk dry ingredients. Whisk milk and eggs, combine. Cook on hot griddle until golden."
  },
  {
    name: "Tomato Soup",
    category: "Soup",
    origin: "European",
    servings: 6,
    ingredients: [
      { item: "Tomatoes (chopped)", qty: 6, unit: "cup", type: "weight" },
      { item: "Vegetable stock", qty: 4, unit: "cup", type: "liquid" },
      { item: "Onion (chopped)", qty: 1, unit: "unit", type: "count" }
    ],
    instructions: "Sweat onions, add tomatoes and stock, simmer 20 minutes. Blend and season to taste."
  },
  {
    name: "Spaghetti Carbonara",
    category: "Pasta",
    origin: "Italian",
    servings: 4,
    ingredients: [
      { item: "Spaghetti", qty: 400, unit: "g", type: "weight" },
      { item: "Pancetta", qty: 150, unit: "g", type: "weight" },
      { item: "Eggs (large)", qty: 3, unit: "unit", type: "count" },
      { item: "Parmesan", qty: 50, unit: "g", type: "weight" }
    ],
    instructions: "Cook pasta. Fry pancetta. Mix eggs and cheese, combine off heat to make creamy sauce."
  },
  {
    name: "Chicken Tikka Masala",
    category: "Main",
    origin: "Indian",
    servings: 4,
    ingredients: [
      { item: "Chicken breast", qty: 600, unit: "g", type: "weight" },
      { item: "Yogurt", qty: 0.5, unit: "cup", type: "liquid" },
      { item: "Onion (sliced)", qty: 1, unit: "unit", type: "count" }
    ],
    instructions: "Marinate chicken, grill, cook in spiced tomato-cream sauce."
  },
  {
    name: "Guacamole",
    category: "Dip",
    origin: "Mexican",
    servings: 2,
    ingredients: [
      { item: "Avocado", qty: 2, unit: "unit", type: "count" },
      { item: "Lime juice", qty: 1, unit: "tbsp", type: "liquid" },
      { item: "Cilantro", qty: 2, unit: "tbsp", type: "weight" }
    ],
    instructions: "Mash avocados, mix in lime, cilantro, salt, and serve."
  },
  {
    name: "Beef Tacos",
    category: "Main",
    origin: "Mexican",
    servings: 4,
    ingredients: [
      { item: "Ground beef", qty: 500, unit: "g", type: "weight" },
      { item: "Taco shells", qty: 8, unit: "unit", type: "count" },
      { item: "Lettuce (shredded)", qty: 1, unit: "cup", type: "weight" }
    ],
    instructions: "Cook beef with spices, assemble tacos with toppings."
  },
  {
    name: "Greek Salad",
    category: "Salad",
    origin: "Greek",
    servings: 3,
    ingredients: [
      { item: "Cucumber", qty: 1, unit: "unit", type: "count" },
      { item: "Tomatoes", qty: 2, unit: "unit", type: "count" },
      { item: "Feta", qty: 100, unit: "g", type: "weight" }
    ],
    instructions: "Chop vegetables, toss with olive oil and vinegar, top with feta."
  },
  {
    name: "Shakshuka",
    category: "Breakfast",
    origin: "Middle Eastern",
    servings: 2,
    ingredients: [
      { item: "Tomatoes (canned)", qty: 400, unit: "g", type: "weight" },
      { item: "Eggs", qty: 4, unit: "unit", type: "count" },
      { item: "Bell pepper", qty: 1, unit: "unit", type: "count" }
    ],
    instructions: "Cook peppers, add tomatoes and spices, simmer. Crack eggs and cook until set."
  },
  {
    name: "Miso Soup",
    category: "Soup",
    origin: "Japanese",
    servings: 2,
    ingredients: [
      { item: "Dashi stock", qty: 3, unit: "cup", type: "liquid" },
      { item: "Miso paste", qty: 2, unit: "tbsp", type: "weight" },
      { item: "Tofu (cubed)", qty: 100, unit: "g", type: "weight" }
    ],
    instructions: "Heat dashi, dissolve miso, add tofu and wakame."
  },
  {
    name: "Ratatouille",
    category: "Main",
    origin: "French",
    servings: 4,
    ingredients: [
      { item: "Eggplant", qty: 1, unit: "unit", type: "count" },
      { item: "Zucchini", qty: 2, unit: "unit", type: "count" },
      { item: "Tomatoes", qty: 4, unit: "unit", type: "count" }
    ],
    instructions: "Layer vegetables and bake with herbs and olive oil until tender."
  },
  {
    name: "Banana Bread",
    category: "Baking",
    origin: "American",
    servings: 8,
    ingredients: [
      { item: "Ripe bananas", qty: 3, unit: "unit", type: "count" },
      { item: "Flour", qty: 2, unit: "cup", type: "weight" },
      { item: "Sugar", qty: 1, unit: "cup", type: "weight" }
    ],
    instructions: "Mix wet and dry ingredients, bake at 175°C (350°F) for 50-60 minutes."
  },
  {
    name: "Couscous Salad",
    category: "Salad",
    origin: "North African",
    servings: 4,
    ingredients: [
      { item: "Couscous", qty: 200, unit: "g", type: "weight" },
      { item: "Chickpeas", qty: 1, unit: "cup", type: "weight" },
      { item: "Parsley", qty: 0.5, unit: "cup", type: "weight" }
    ],
    instructions: "Cook couscous, toss with chickpeas, vegetables, lemon, and herbs."
  }
];

db.serialize(() => {
  // Recreate the table with the correct schema to avoid missing-column errors
  db.run('DROP TABLE IF EXISTS recipes');
  db.run(`
    CREATE TABLE recipes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      origin TEXT,
      category TEXT,
      servings INTEGER NOT NULL,
      ingredients_json TEXT NOT NULL,
      instructions TEXT
    )
  `);

  const insert = db.prepare('INSERT INTO recipes (name, category, origin, servings, ingredients_json, instructions) VALUES (?, ?, ?, ?, ?, ?)');
  recipes.forEach(({ name, category, origin, servings, ingredients, instructions }) => {
    insert.run(name, category, origin, servings, JSON.stringify(ingredients), instructions || '');
  });
  insert.finalize();
});

// Append 8 more simple recipes to reach 20
const more = [
  {
    name: 'Pancit (Stir Noodles)',
    category: 'Main',
    origin: 'Filipino',
    servings: 4,
    ingredients: [
      { item: 'Rice noodles', qty: 300, unit: 'g' },
      { item: 'Soy sauce', qty: 2, unit: 'tbsp' },
    ],
    instructions: 'Stir fry vegetables, add noodles and sauce, toss to combine.'
  },
  {
    name: 'Pesto Pasta',
    category: 'Pasta',
    origin: 'Italian',
    servings: 4,
    ingredients: [
      { item: 'Pasta', qty: 400, unit: 'g' },
      { item: 'Basil pesto', qty: 0.5, unit: 'cup' }
    ],
    instructions: 'Cook pasta and toss with pesto and a splash of pasta water.'
  },
  {
    name: 'Lentil Soup',
    category: 'Soup',
    origin: 'Mediterranean',
    servings: 4,
    ingredients: [
      { item: 'Lentils', qty: 200, unit: 'g' },
      { item: 'Vegetable stock', qty: 4, unit: 'cup' }
    ],
    instructions: 'Simmer lentils in stock with aromatics until tender.'
  },
  {
    name: 'Stir-fried Bok Choy',
    category: 'Side',
    origin: 'Chinese',
    servings: 2,
    ingredients: [
      { item: 'Bok choy', qty: 300, unit: 'g' },
      { item: 'Garlic', qty: 2, unit: 'clove' }
    ],
    instructions: 'Quick stir-fry with garlic and a splash of soy.'
  },
  {
    name: 'Falafel',
    category: 'Snack',
    origin: 'Middle Eastern',
    servings: 6,
    ingredients: [
      { item: 'Chickpeas (soaked)', qty: 2, unit: 'cup' },
      { item: 'Onion', qty: 1, unit: 'unit' }
    ],
    instructions: 'Blend, shape, and fry until golden.'
  },
  {
    name: 'Salsa Roja',
    category: 'Condiment',
    origin: 'Mexican',
    servings: 4,
    ingredients: [
      { item: 'Tomatoes', qty: 4, unit: 'unit' },
      { item: 'Onion', qty: 0.5, unit: 'unit' }
    ],
    instructions: 'Roast tomatoes and blend with onion, cilantro, and lime.'
  },
  {
    name: 'Apple Crumble',
    category: 'Dessert',
    origin: 'British',
    servings: 6,
    ingredients: [
      { item: 'Apples (sliced)', qty: 6, unit: 'unit' },
      { item: 'Oats', qty: 1, unit: 'cup' }
    ],
    instructions: 'Layer apples, top with oat crumble and bake until golden.'
  },
  {
    name: 'Fried Rice',
    category: 'Main',
    origin: 'Asian',
    servings: 3,
    ingredients: [
      { item: 'Cooked rice', qty: 3, unit: 'cup' },
      { item: 'Eggs', qty: 2, unit: 'unit' }
    ],
    instructions: 'Stir-fry rice with eggs and season to taste.'
  }
];

const insertMore = db.prepare('INSERT INTO recipes (name, category, origin, servings, ingredients_json, instructions) VALUES (?, ?, ?, ?, ?, ?)');
more.forEach(r => insertMore.run(r.name, r.category, r.origin, r.servings, JSON.stringify(r.ingredients), r.instructions || ''));
insertMore.finalize();

db.close();
console.log('Database seeded!');