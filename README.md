# UnfilteredApp-Backend

A robust Node.js, Express, and PostgreSQL backend for the Unfiltered application. This API supports user authentication, mood logging with analytics, journaling, and a real-time mood-based chat system.

## Features

- **Auth**: JWT-based authentication (Register/Login).
- **Mood Logging**: Log daily moods and view analytics aggregated by type.
- **Journaling**: Secure personal journal entries.
- **Chat**: Real-time mood-based chat rooms using Socket.io.
- **Database**: Managed with Knex.js migrations and seeds.

---

## Prerequisites

- **Node.js** (v14 or higher recommended)
- **PostgreSQL** (Active instance running locally or remotely)
- **npm** or **yarn**

---

## Setup Instructions

### 1. Clone & Install
```bash
git clone <repository-url>
cd node-postgres-backend
npm install
```

### 2. Environment Variables
Create a `.env` file in the root directory and configure the following:
```env
PORT=3000
DATABASE_URL=postgres://username:password@localhost:5432/database_name
JWT_SECRET=your_jwt_secret_here
```

### 3. Database Setup
Ensure your PostgreSQL database exists, then run migrations and seeds:
```bash
# Run migrations to create tables
npx knex migrate:latest

# Seed the database with fixed chat rooms
npx knex seed:run
```

---

## Running the Application

### Development Mode (with Nodemon)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will be running at `http://localhost:3000`.

---

## API Summary

### Authentication
- `POST /api/auth/register`: Create user (`email`, `password`, `name`).
- `POST /api/auth/login`: Get JWT and user info.

### Mood & Analytics
- `POST /api/mood/log`: Save a mood entry (`modeType`, `modeSubType`).
- `GET /api/mood/analytics`: Get aggregated stats (query param `days`).

### Journaling
- `POST /api/journal/entries`: Save text entry (`content`).
- `GET /api/journal/entries`: Get all personal entries.

### Chat Rooms
- `GET /api/rooms`: List available mood rooms.
- `GET /api/rooms/:id/messages`: Get message history for a specific room.

### Real-time (Socket.io)
- **Events**:
  - `join_room`: Joins a room by ID.
  - `send_message`: Broadcasts message to room members.
