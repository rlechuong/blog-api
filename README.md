# Blog Platform

A full-stack blog platform built around a REST API with two separate React front-ends: a public site for reading and commenting, and an admin dashboard for authoring, publishing, and moderating.

The API uses JWT authentication with a three role system (user, author, admin), ownership-based permissions on posts and comments, and role management for admins.

Built as part of The Odin Project's [NodeJS Course](https://www.theodinproject.com/lessons/node-path-nodejs-blog-api).

**Live:** [Public Client](https://rlechuong-blog-api-public.netlify.app/) · [Admin Client](https://rlechuong-blog-api-admin.netlify.app/) · [Backend API (Health Check)](https://blog-api-production-73fc.up.railway.app/)

## Demo Accounts

These are seeded demo accounts. Anyone can log in with them for testing:

| Role   | Email                | Password            | Access                          |
| ------ | -------------------- | ------------------- | ------------------------------- |
| Admin  | `admin@example.com`  | `adminPassword123`  | Both clients - full permissions |
| Author | `author@example.com` | `authorPassword123` | Both clients - own posts only   |
| User   | `user@example.com`   | `userPassword123`   | Public client only - commenting |

You can register a new account on the public client. New accounts default to the user role and an admin can change roles from the admin dashboard.

## Tech Stack

**Backend**

- Node.js, Express 5, TypeScript
- PostgreSQL, Prisma 7
- Passport (Local Strategy), JWT Auth
- bcrypt for password hashing
- express-validator for input validation
- helmet, cors, express-rate-limit

**Frontend**

- React 19, TypeScript, Vite
- React Router 7
- CSS Modules

**Deployment**

- API and PostgreSQL on Railway
- Clients on Netlify

**Tooling**

- ESLint, Prettier
- Strict TypeScript Config
- ESM Modules

## Features

**Public Site**

- Browse published posts, while drafts remain unexposed
- Register and log in with sessions persisting through refreshes
- Comment on posts when logged into an account
- Edit or delete your own comments

**Admin Dashboard**

- Authors can only see own posts, while admins see all
- Create, edit, publish, and unpublish posts
- Delete comments on posts you have permission to edit
- Admins can promote or demote users between roles

**API**

- JWT authentication with role and ownership-based authorization
- Input validation on every write endpoint
- Rate limiting, with stricter limits on auth routes
- Centralized error handling with consistent JSON responses

## Running Locally

**Prerequisites:** Node.js 20+, PostgreSQL

```bash
git clone https://github.com/rlechuong/blog-api.git
cd blog-api
```

### API

```bash
cd api
npm install
cp .env.example .env
```

Fill in `.env`:

| Variable       | Description                                                                              |
| -------------- | ---------------------------------------------------------------------------------------- |
| `DATABASE_URL` | PostgreSQL connection string                                                             |
| `JWT_SECRET`   | Generate with `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"` |
| `CORS_ORIGINS` | Comma-separated. Example: `http://localhost:5173,http://localhost:5174`                  |

Then create the database, run migrations, and seed:

```bash
createdb blog_api
npm run db:reset
npm run dev
```

The API runs on `http://localhost:3000`.

### Clients

Each client is set up the same way:

```bash
cd client-public   # or client-admin
npm install
cp .env.example .env
npm run dev
```

The default `VITE_API_URL` in `.env.example` is `http://localhost:3000`, so no changes are needed if the API is running there.

The public client runs on `http://localhost:5173` and the admin client on `http://localhost:5174`. Both need the API running.

## Architecture

```
blog-api/
├── api/
│   ├── prisma/
│   │   ├── migrations/
│   │   ├── schema.prisma
│   │   └── seed.ts
│   └── src/
│       ├── config/         # Environment variables, Passport strategy
│       ├── controllers/    # Request handling, ownership checks, responses
│       ├── lib/            # Prisma client, password hashing, JWT signing
│       ├── middleware/     # Auth, rate limiting, error handling
│       ├── queries/        # Database access
│       ├── routes/         # Route definitions and middleware
│       ├── types/          # Express types
│       ├── validators/     # express-validator
│       ├── app.ts          # Express app setup
│       └── index.ts        # Server entry point
├── client-public/
│   └── src/
│       ├── api/            # Wrappers over shared fetch client
│       ├── components/     # Shared UI
│       ├── context/        # Auth state
│       ├── lib/            # Date formatting, text truncation
│       ├── pages/          # Route components
│       ├── styles/         # Shared CSS modules
│       └── types/          # API response shapes
└── client-admin/           # Similar structure to client-public
```

## Design Decisions

**JWT over session-based authentication.** The project spec wanted us to use JWTs, which worked well since there were two separate front-ends on different origins that talk to one API. Session cookies are tied to a single origin and assume browser usage. The tradeoff is that tokens can't be revoked before they expire, so for future projects I want to research refresh tokens and practice implementing them along with access tokens.

**Separate role and ownership check.** A role check (user, author, admin) only needs the token, so it lives in middleware and rejects requests before any database access. An ownership check (must be this post's author) requires fetching from a database, so it lives in the controller.

**Admins can delete comments but not edit them.** Nearly every platform I use handles it this way, so I implemented similarly.

**Content remains when deleting user.** The schema uses SetNull rather than cascade on the author relation so posts and comments survive with a null author rather than getting deleted. The frontend renders these as "Deleted User." However, use deletion wasn't implemented.

**Shared frontend code is duplicated.** Both clients share very similar code in certain files. In future projects I want to look into if I should remove this duplication somehow.

**Two error response shapes.** Express-validator failures return `{ errors: [...] }`, while everything other error returns `{ error: "message" }`. I had to handle both shapes in the front ends which I struggled with initially. In future projects I would look into returning a singular shape.

**Posts are always created unpublished.** There's no "publish immediately" option on the create form and publishing is a separate action from the dashboard. I wasn't thinking about it fully because of the publish toggle.

## Known Limitations

**No tests.** The course hasn't gone over testing yet so I decided to save it for future projects.

**No refresh tokens.** The access tokens last seven days. When the token expires, the client detects a 401 error, clears the token from state, and returns the user to login. In the future I want to research refresh and access tokens to handle this better.

**No pagination.** Every list endpoint returns everything in the array. In a real blog with hundreds of posts or comments I would look into pagination for performance.

**No audit trail.** Admins can edit other people's posts and change user roles, but there is no logging.

**No email verification or password reset.** Registration takes an email but never confirms it, and there's no recovery flow.

**Post content is plain text.** There's no text editor like most similar platforms, so the content just displays as a plain string.
