# Server

This is the small Express server that serves recipes stored in `recipes.db`.

Default port
- The server defaults to port 5001 to avoid macOS ControlCenter/AirPlay conflicts on port 5000.

Run

```bash
cd server
npm install    # optional if you've not installed deps
npm start
```

Override port
- Set the `PORT` environment variable before starting to use a different port:

```bash
PORT=3000 npm start
```

API routes
- GET /recipes - list all recipes
- POST /recipes - add a recipe (JSON body)

Notes
- If you want to use `.env`, install dotenv and add a `.env` file with `PORT=...`.
