# Product Management System

Angular frontend + Node/Express backend with MySQL database.

This repository contains a simple product management application with features to add, list, update, delete, and bulk upload products. The frontend uses Angular (standalone components) and the backend uses Node.js + Express with a MySQL database.

---

## Prerequisites

- Node.js (v18+ recommended)
- npm (or yarn)
- MySQL 8+ (or compatible)
- Git
- Optional: Angular CLI (`npm install -g @angular/cli`) for convenience

---

## Project structure

- /backend - Express server and API
- /frontend - Angular standalone app
- mysql_database.sql - Schema and seed data for local testing

---

## Setup

1. Clone the repo

```bash
git clone <repo-url>
cd Project
```

2. Create and seed the database

- Start MySQL and import the schema provided in `mysql_database.sql`:

```bash
mysql -u root -p < mysql_database.sql
# or if database `product_system` exists:
mysql -u root -p product_system < mysql_database.sql
```

3. Backend setup

```bash
cd backend
npm install
```

- Copy or create a `.env` file in /backend with credentials, for example:

```
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=product_system
PORT=5500
```

- Run the backend server:

```bash
npm run dev    # or `npm start` (check backend/package.json)
```

Default server port: 5500 (changeable in .env)

4. Frontend setup

```bash
cd ../frontend
npm install
```

- Update the API URL in `src/app/services/product.service.ts` if your backend address differs (default: `http://localhost:5500/api/products`).

- Serve the frontend for development:

```bash
npm start       # or `ng serve` depending on package.json scripts
```

Default frontend port: 4200 (or configured port in your tooling)

---

## Run both servers concurrently (optional)

Install `concurrently` or `npm-run-all` and create a single script that starts both backend and frontend at once.

Example using `concurrently`:

```bash
npm install -g concurrently
concurrently "cd backend && npm run dev" "cd frontend && npm start"
```

---

## API Endpoints

- GET /api/products?page=&size=&sort=&search=
- GET /api/products/report
- POST /api/products
- PUT /api/products/:id
- DELETE /api/products/:id
- POST /api/products/bulk-upload
- GET /api/categories

---

## Tests

- Frontend unit tests

```bash
cd frontend
npm test
```

- Backend tests 

```bash
cd backend
npm test
```

---

## Troubleshooting

Common issues and fixes:

- HttpClient NullInjectorError (runtime)
  - Ensure the Angular bootstrap provides HttpClient globally in `src/main.ts`:
    - Use `provideHttpClient(withInterceptorsFromDi())` with `bootstrapApplication`.

  - Example (frontend/src/main.ts):

  ```ts
  import { bootstrapApplication } from '@angular/platform-browser';
  import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
  import { AppComponent } from './app/app.component';

  bootstrapApplication(AppComponent, {
    providers: [ provideHttpClient(withInterceptorsFromDi()) ]
  }).catch(err => console.error(err));
  ```

- HttpClient NullInjectorError (unit tests)
  - Tests do not run the application bootstrap. Ensure you include `HttpClientTestingModule` in the TestBed imports or add `provideHttpClient()` in the TestBed providers.

  Example in spec files:
  ```ts
  import { HttpClientTestingModule } from '@angular/common/http/testing';

  TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule, /* component */ ],
  });
  ```

- ProductService not provided
  - Ensure `ProductService` has `@Injectable({ providedIn: 'root' })` so it is globally available.

- CORS
  - Enable CORS in the backend if making requests from a different origin:

  ```js
  // in backend/app.js
  const cors = require('cors');
  app.use(cors());
  ```

- Database connection issues
  - Confirm the `.env` in backend contains correct DB credentials and the DB has been seeded.

---

## Notes & Security

- The SQL seed data stores passwords as plain text for demo purposes only. Use proper hashing and secure storage in production.
- Default seeded users exist for demo and testing purposes. Change or remove them for production.

---

## Production / SSR

- Check `frontend/package.json` scripts for production build or SSR commands (`build`, `build:ssr`, `serve:ssr`, etc.).
- Typical steps:

```bash
cd frontend
npm run build:ssr
cd ../backend
# run the production SSR server, e.g. node dist/server/main.js
```

You may need to update the server configuration to serve the compiled frontend files and include SSR providers for HttpClient on the server.

---

## Contributing

- Open issues and PRs
- Add tests, run them, and ensure builds pass
- Keep changes small and focused

