# API.md — Recipe Sharing App Contract

This file is the source of truth for all endpoint shapes, request/response bodies, and schemas.
**Nobody changes this file alone.** If you need to change a field name or add a route, message the group first, then update this file in the same PR as your code change.

---

## 1. Database Schemas

### `users` collection

| Field       | Type     | Notes                                  |
|-------------|----------|-----------------------------------------|
| `_id`       | ObjectId | auto                                    |
| `username`  | String   | unique, required                        |
| `email`     | String   | unique, required                        |
| `password`  | String   | required, **hashed with bcrypt**, never returned in any response |
| `createdAt` | Date     | auto (timestamps: true)                 |

### `recipes` collection

| Field        | Type       | Notes                                              |
|--------------|------------|-----------------------------------------------------|
| `_id`        | ObjectId   | auto                                                |
| `title`      | String     | required                                            |
| `description`| String     | optional                                            |
| `ingredients`| [String]   | required, array of strings e.g. `["2 eggs", "1 cup flour"]` |
| `steps`      | [String]   | required, ordered array of instruction strings      |
| `category`   | String     | e.g. "Dessert", "Main Course" — used for filtering   |
| `cookTime`   | Number     | minutes, optional                                   |
| `imageUrl`   | String     | optional, direct URL to image                       |
| `owner`      | ObjectId   | required, ref: `User` — the creator, used for "My Recipes" and edit/delete permission checks |
| `createdAt`  | Date       | auto (timestamps: true)                             |
| `updatedAt`  | Date       | auto (timestamps: true)                             |

---

## 2. Auth Endpoints

Base path: `/auth`

### `POST /auth/register`
**Body:**
```json
{
  "username": "mazen123",
  "email": "mazen@example.com",
  "password": "plaintext_from_client"
}
```
**Response `201`:**
```json
{
  "user": { "id": "...", "username": "mazen123", "email": "mazen@example.com" },
  "token": "jwt_here"
}
```
**Errors:** `400` if email/username already exists, `400` if fields missing.

### `POST /auth/login`
**Body:**
```json
{ "email": "mazen@example.com", "password": "plaintext_from_client" }
```
**Response `200`:** same shape as register (`user` + `token`).
**Errors:** `401` invalid credentials.

**Token usage:** every protected route expects header:
```
Authorization: Bearer <token>
```
Decoded JWT payload must contain `{ id: user._id }` — **agree on this key name (`id`) up front**, this is the exact kind of mismatch that caused bugs before.

---

## 3. Recipe Endpoints

Base path: `/recipes`

### `GET /recipes`
Public. Supports query params for search/filter:
```
GET /recipes?search=pasta&category=Dessert&maxCookTime=30
```
- `search` → matches against `title` (case-insensitive regex or text index)
- `category` → exact match
- `maxCookTime` → `cookTime <= value`

**Response `200`:**
```json
[
  {
    "_id": "...",
    "title": "Spaghetti Carbonara",
    "description": "...",
    "category": "Main Course",
    "cookTime": 25,
    "imageUrl": "...",
    "owner": { "_id": "...", "username": "mazen123" }
  }
]
```
(List view returns lightweight fields — `ingredients`/`steps` not required here, keep payload small.)

### `GET /recipes/:id`
Public. Full recipe detail.
**Response `200`:**
```json
{
  "_id": "...",
  "title": "Spaghetti Carbonara",
  "description": "...",
  "ingredients": ["200g spaghetti", "2 eggs", "..."],
  "steps": ["Boil pasta", "Mix eggs and cheese", "..."],
  "category": "Main Course",
  "cookTime": 25,
  "imageUrl": "...",
  "owner": { "_id": "...", "username": "mazen123" },
  "createdAt": "..."
}
```
**Errors:** `404` not found.

### `GET /recipes/mine`
**Protected.** Returns only recipes where `owner == req.user.id`.
Same response shape as `GET /recipes`.

### `POST /recipes`
**Protected.**
**Body:**
```json
{
  "title": "...",
  "description": "...",
  "ingredients": ["..."],
  "steps": ["..."],
  "category": "...",
  "cookTime": 25,
  "imageUrl": "..."
}
```
`owner` is set server-side from the JWT — **never trust an `owner` field sent from the client.**
**Response `201`:** the created recipe object.
**Errors:** `400` validation (missing title/ingredients/steps), `401` no/invalid token.

### `PUT /recipes/:id`
**Protected.** Only the owner may update.
Same body shape as POST (partial updates allowed).
**Errors:** `403` if `req.user.id !== recipe.owner`, `404` not found.

### `DELETE /recipes/:id`
**Protected.** Only the owner may delete.
**Response `200`:** `{ "message": "Recipe deleted" }`
**Errors:** `403` not owner, `404` not found.

---

## 4. Standard Error Shape

Every error response, regardless of endpoint, uses this shape so the frontend can handle errors generically:
```json
{ "error": "Human-readable message here" }
```

---

## 5. Ownership Rule (applies everywhere)

Any protected write route (`PUT`, `DELETE` on `/recipes/:id`) must check `recipe.owner.toString() === req.user.id` **before** performing the action. This is a security requirement, not a nice-to-have — without it, any logged-in user can edit or delete anyone else's recipe.

---

## 6. Decisions

- **JWT expiry:** `7d`. The genuinely "most professional" setup is a short-lived access token (~15min) plus a refresh token, but that's real added complexity (refresh endpoint, refresh token storage/rotation) that isn't worth it for this project's scope and timeline. A single 7-day token is a reasonable, defensible tradeoff — just don't present it as best-practice-grade security if this ever comes up in a review; it's the practical choice, not the ideal one.
- **Categories:** fixed enum, not free text. Free text means شادي's filter dropdown and محمد's form have nothing reliable to agree on, and you'll get "Dessert" vs "dessert" vs "Desserts" fragmenting your data. Use:
  ```
  ["Breakfast", "Main Course", "Dessert", "Appetizer", "Salad", "Soup", "Beverage", "Snack"]
  ```
  Enforce this in the Mongoose schema with `enum: [...]` on the backend, and drive the Angular form's dropdown off the exact same array (put it in `shared/` so it's one source of truth, not copy-pasted in two places).
- **Image upload:** URL only. No file upload, no Cloudinary/multer integration. The `imageUrl` field just stores a string; the recipe form has a plain text input where the user pastes a link. Confirmed as final, not just a recommendation.
