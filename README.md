# 🧠 Admin Dashboard - Next.js

A modern admin dashboard built with [Next.js](https://nextjs.org/) and powered by [Prisma](https://www.prisma.io/) using SQLite as the database engine.

---

## 🚀 Tech Stack

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Prisma ORM](https://www.prisma.io/)
- [SQLite](https://www.sqlite.org/)

---

## 📦 Installation

Make sure you have the following installed:

- Node.js (recommended: v18+)

### 1. Clone the repository

```
git clone https://github.com/renanrcp16/admin-dashboard.git
cd admin-dashboard
```

### 2. Install dependencies

```
npm install
```

---

## ⚙️ Environment

No need to manually configure environment variables. The repository already includes a pre-configured `.env` file with:

```env
DATABASE_URL='file:./dev.db'
```

---

## 🔧 Prisma Setup

### 1. Generate Prisma client

```
npx prisma db push
```

This creates and applies the initial database schema using SQLite.

### 2. Seed the database

To populate the database with mock data:

```
npx prisma db seed
```

---

## 🧪 Development

To start the development server with **Turbopack**:

```
npm run dev
```

Open your browser at: [http://localhost:3000](http://localhost:3000)

---

## 🏗️ Production Build

To build the app for production:

```
npm run build
```

Then to run it:

```
npm start
```

---

## 🛠️ Available Scripts

| Command                  | Description                         |
| ------------------------ | ----------------------------------- |
| `npm run dev`            | Starts dev server with Turbopack    |
| `npm run build`          | Builds the production application   |
| `npm run lint`           | Runs ESLint for code quality checks |
| `npm start`              | Starts the production server        |
| `npm prisma generate`    | Generates the Prisma client         |
| `npm prisma migrate dev` | Applies migrations to the database  |
| `npx prisma db seed`     | Seeds the database with mock data   |

---

## 📁 Project Structure

```
├── prisma/
│   ├── schema.prisma         # Prisma data model definition
│   └── seed.ts               # Seed script to populate mock data
├── public/                   # Static assets (e.g. images, favicons)
├── src/
│   ├── actions/              # Server actions (DB operations, mutations)
│   ├── app/
│   │   └── (pages)/          # Application routes (App Router)
│   ├── components/           # Reusable UI components
│   ├── lib/                  # Prisma client instance and helpers
│   ├── utils/                # General utilities and helper functions
│   ├── zustand/              # Zustand stores for global state management
└── .env
```

---

## 🧹 Linting & Formatting

```
npm lint
```

---

## 👨‍💻 Developed by

- Renan — [linkedin.com/in/renanrcp16/](https://www.linkedin.com/in/renanrcp16/)
