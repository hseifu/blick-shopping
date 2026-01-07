# Shopping List App

A full-stack shopping list application built with React (TypeScript, Vite, Zustand, shadcn/ui, fetch) on the frontend and Express (TypeScript) + MongoDB on the backend. Users can add items, mark them as bought, and delete them with a clean, responsive UI.

## Project Overview

This application provides a simple but polished shopping list manager where users can add items by name, toggle their "bought" status with a checkbox (applying strikethrough styling), and delete items. The frontend uses Zustand for global state management and shadcn/ui components for a modern UI. The backend is a REST API built with Express and MongoDB for persistence.

## Folder Structure

```
shopping-list-app/
├── backend/
│   ├── src/
│   │   ├── models/
│   │   │   └── Item.ts
│   │   ├── routes/
│   │   │   └── items.ts
│   │   ├── index.ts
│   │   └── types.ts
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/
│   │   │   │   ├── alert.tsx
│   │   │   │   ├── button.tsx
│   │   │   │   ├── card.tsx
│   │   │   │   ├── checkbox.tsx
│   │   │   │   ├── input.tsx
│   │   │   │   ├── separator.tsx
│   │   │   │   └── skeleton.tsx
│   │   │   ├── AddItemForm.tsx
│   │   │   └── ShoppingList.tsx
│   │   ├── lib/
│   │   │   └── utils.ts
│   │   ├── store/
│   │   │   └── useShoppingStore.ts
│   │   ├── App.tsx
│   │   ├── App.css
│   │   ├── main.tsx
│   │   ├── index.css
│   │   └── vite-env.d.ts
│   ├── .env.example
│   ├── .gitignore
│   ├── components.json
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   ├── tsconfig.app.json
│   ├── tsconfig.node.json
│   └── vite.config.ts
└── README.md
```

## Setup Instructions

### Prerequisites

- Node.js (v18+)
- Docker (for MongoDB)
- npm or yarn

### MongoDB Setup (Docker)

Start a MongoDB instance locally using Docker:

```bash
docker run -d \
  --name mongodb \
  -p 27017:27017 \
  -v mongodb_data:/data/db \
  mongo:7
```

This command will:

- Run MongoDB 7 in detached mode (`-d`)
- Name the container `mongodb`
- Map port 27017 to your local machine
- Create a volume `mongodb_data` for data persistence

To stop MongoDB:

```bash
docker stop mongodb
```

To start it again:

```bash
docker start mongodb
```

To remove the container:

```bash
docker rm mongodb
```

**Alternative**: You can also use MongoDB Atlas (cloud) or a local MongoDB installation instead of Docker.

### Backend Setup

1. Navigate to backend directory:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create `.env` file from example:

```bash
cp .env.example .env
```

4. Edit `.env` with your MongoDB URI:

```
MONGODB_URI=mongodb://localhost:27017/shopping-list
PORT=4000
```

5. Run the backend:

```bash
npm run dev
```

Backend will run on `http://localhost:4000`

### Frontend Setup

1. Navigate to frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Create `.env` file from example:

```bash
cp .env.example .env
```

4. Edit `.env` with your API URL:

```
VITE_API_URL=http://localhost:4000
```

5. Run the frontend:

```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

### Running Both Apps

Open two terminal windows:

Terminal 1 (Backend):

```bash
cd backend
npm run dev
```

Terminal 2 (Frontend):

```bash
cd frontend
npm run dev
```

Visit `http://localhost:5173` in your browser.

## Scripts

### Backend

- `npm run dev` - Run development server with nodemon
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Run compiled JavaScript

### Frontend

- `npm run dev` - Run Vite development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## API Endpoints

- `GET /items` - Get all shopping items
- `POST /items` - Add new item (body: `{ name: string }`)
- `PUT /items/:id` - Update bought status (body: `{ bought: boolean }`)
- `DELETE /items/:id` - Delete item
