# Recipe Sharing App

A full-stack web app for sharing, browsing, and managing cooking recipes. Built as a team project using the **MEAN stack** (MongoDB, Express, Angular, Node.js).

See [`API.md`](./API.md) for the full API contract, database schemas, and team decisions on JWT expiry, recipe categories, and image handling. Read that file before writing any endpoint or form code.

See [`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md) before building or styling any frontend page so all team members use the same colors, layouts, cards, forms, and responsive rules.

---

## Features

- User registration & login (JWT-based auth)
- Full CRUD on recipes (create, view, edit, delete)
- Search and filter recipes by title, category, and cook time
- "My Recipes" view scoped to the logged-in user
- Ownership enforcement — only a recipe's creator can edit or delete it

---

## Tech Stack

| Layer    | Technology |
|----------|------------|
| Database | MongoDB (Mongoose ODM) |
| Backend  | Node.js, Express |
| Frontend | Angular |
| Auth     | JWT (JSON Web Tokens), bcrypt for password hashing |

---

## Team & Ownership

Each person owns one backend piece and one matching frontend piece, so everyone gets full-stack scope and the workload stays balanced.

| Name | Backend | Frontend |
|------|---------|----------|
| صالح محمد صالح عبدالعزيز | User model, password hashing, register/login endpoints, JWT + auth middleware | Login/register pages, auth guard + interceptor |
| مازن محمد الباز محمد | Recipe model, POST/PUT/DELETE endpoints, ownership check + validation | Recipe form (create + edit), client-side validation |
| شادي علي محروس فهيم | GET /recipes query filtering (search, category, cookTime) | Recipes browse page, search bar + filter UI |
| محمد احمد محمد عبد المجيد | GET /recipes/:id endpoint, response shaping | Recipe details page |
| عبدالرحمن السعيد مصطفى عبدالحميد | GET /recipes/mine endpoint | My Recipes page, shared RecipeService + routing module |

**Integration testing is a shared team task, not one person's feature** — done together in the final days once every branch is merged, with everyone testing everyone's work against the running app.

Each feature is developed on its own branch (`feature/your-feature-name`) and merged into `main` via Pull Request. See **Contributing** below.

Note: مازن (writes) and محمد (reads) both depend on the same `Recipe` model — agree up front on who creates `Recipe.js` first so it isn't duplicated.

---

## Folder Structure

```
recipe-sharing-app/
├── backend/
│   ├── src/
│   │   ├── models/          (User.js, Recipe.js)
│   │   ├── controllers/     (authController.js, recipeController.js)
│   │   ├── routes/          (authRoutes.js, recipeRoutes.js)
│   │   ├── middleware/      (auth.js, errorHandler.js)
│   │   ├── configs/         (db.js)
│   │   └── server.js
│   ├── .env.example
│   └── package.json
├── frontend/
│   └── src/app/
│       ├── auth/
│       ├── recipes/
│       ├── my-recipes/
│       └── shared/          (services, guards, interceptors, models)
├── API.md
└── README.md
```

---

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm
- MongoDB (local install, or a free MongoDB Atlas cluster)
- Angular CLI: `npm install -g @angular/cli`

### 1. Clone the repo
```bash
git clone https://github.com/<org-or-user>/recipe-sharing-app.git
cd recipe-sharing-app
```

### 2. Backend setup
```bash
cd backend
npm install
cp .env.example .env
```
Fill in `.env` with your real values (a local Mongo URI or a MongoDB Atlas connection string):
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_here
PORT=5000
```
Run the backend:
```bash
node src/server.js
```
If you'd rather use `npm start`, add this to `backend/package.json` first:
```json
"scripts": {
  "start": "node src/server.js"
}
```
On success you should see both `Server running on port 5000` and `DB connected successfully` in the terminal — if the DB message doesn't appear, check your `MONGO_URI` in `.env` before assuming anything else is broken.

API will be available at `http://localhost:5000`.

### 3. Frontend setup
```bash
cd frontend
npm install
ng serve
```
App will be available at `http://localhost:4200`.

---

## Contributing

1. Pull the latest `main` before starting new work:
   ```bash
   git checkout main
   git pull
   ```
2. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit with clear messages, push your branch:
   ```bash
   git push origin feature/your-feature-name
   ```
4. Open a Pull Request into `main` on GitHub, tag a teammate for review.
5. Merge only after approval — do not force-push over someone else's branch.

**Never commit `.env` files.** Use `.env.example` to document required variables without real secrets.

---

## API Reference

Full endpoint list, request/response shapes, and database schemas are documented in [`API.md`](./API.md). This is the source of truth — if the API changes, update that file in the same PR.
