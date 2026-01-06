# TodoMaster

A modern, full-stack Todo application built with **Nuxt 3**, **Shadcn Vue**, **Drizzle ORM**, and **PostgreSQL**.

## Tech Stack

- **Framework:** [Nuxt 4](https://nuxt.com/)
- **UI Library:** [Shadcn Vue](https://www.shadcn-vue.com/) (using Tailwind CSS v4)
- **Database:** PostgreSQL
- **ORM:** [Drizzle ORM](https://orm.drizzle.team/)
- **Auth:** Custom JWT Authentication
- **Package Manager:** [Bun](https://bun.sh/)

## Prerequisites

Ensure you have the following installed:

- [Bun](https://bun.sh/) (or Node.js v20+)
- [Docker](https://www.docker.com/) & Docker Compose (for the database)

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/amiyo-mondol-sazim/nuxt-shadcn.git
cd nuxt-shadcn
```

### 2. Install dependencies

```bash
bun install
```

### 3. Configure Environment Variables

Copy the example environment file and update it if necessary:

```bash
cp .env.example .env
```

The default configuration in `.env` is set up to work with the provided Docker Compose setup:

```ini
DATABASE_URL=postgres://postgres:postgres@localhost:5432/postgres
JWT_SECRET=your-secret-key-change-this-in-production
```

### 4. Start the Database

Start the PostgreSQL container using Docker Compose:

```bash
docker compose up -d
```

### 5. Push Database Schema

Synchronize your database schema with the Drizzle schema definition:

```bash
bunx drizzle-kit generate
bunx drizzle-kit migrate
bunx drizzle-kit push
```

### 6. Run the Development Server

Start the Nuxt development server:

```bash
bun dev
```

The application will be available at `http://localhost:3000`.

## Project Structure

- `app/components` - Vue components (including Shadcn UI components).
- `app/pages` - Application routes/pages.
- `server/api` - API endpoints (Nitro server routes).
- `server/db` - Database schema and configuration.
- `server/lib` - Shared server utilities (e.g., db client).
- `shared/types` - Type definitions shared between frontend and backend.

## Scripts

| Script                      | Description                |
| :-------------------------- | :------------------------- |
| `bun dev`                   | Start development server   |
| `bun build`                 | Build for production       |
| `bun generate`              | Generate static site       |
| `bun lint`                  | Lint code using ESLint     |
| `bun format`                | Format code using Prettier |
| `bunx drizzle-kit generate` | Generates sql migrations   |
| `bunx drizzle-kit migrate`  | Run migrations             |
| `bunx drizzle-kit push`     | Push schema to database    |

## Authentication

The app uses a custom JWT-based authentication system.

- **Signup:** `/signup`
- **Login:** `/login`
- **Protected Routes:** Middleware enforces authentication on `/dashboard`.

## UI System

This project uses **Shadcn Vue**. You can add new components using the CLI (though `bun` usage might require checking specific shadcn-vue CLI commands, usually `npx shadcn-vue@latest add <component>`).

Components are located in `app/components/ui`.
