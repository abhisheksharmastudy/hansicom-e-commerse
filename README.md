# Hansicom Fire Safety E-Commerce

A premium fire safety equipment e-commerce platform with a React frontend and Node.js backend.

## Project Structure

```
hansicom-e-commerse/
├── frontend/          # React + Vite + Tailwind CSS
│   ├── src/           # React components and pages
│   ├── public/        # Static assets
│   └── package.json
│
├── backend/           # Node.js + Express + Google Sheets
│   ├── src/           # API routes and services
│   └── package.json
│
└── README.md          # This file
```

## Quick Start

### 1. Start Backend (Port 5000)

```bash
cd backend
npm install
npm run dev
```

### 2. Start Frontend (Port 5173)

```bash
cd frontend
npm install
npm run dev
```

### 3. Open in Browser

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000/api/health

## Default Admin Credentials (Dev Mode)

- Email: `admin@fireguard.com`
- Password: `admin123`

## Tech Stack

| Layer    | Technology                                  |
| -------- | ------------------------------------------- |
| Frontend | React 19, Vite, Tailwind CSS, Framer Motion |
| Backend  | Node.js, Express, Google Sheets API         |
| Auth     | JWT                                         |
