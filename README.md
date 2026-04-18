# Unfiltered API - Backend Service

A high-performance, secure Node.js backend designed for the **Unfiltered** ecosystem. This API manages user sanctuaries, mood-based analytics, secure journaling, and real-time community engagement.

---

## 🚀 Optimized for the Cloud

This repository is pre-configured for seamless deployment using:
- **Serverless Runtime**: Optimized for [Vercel](https://vercel.com).
- **Cloud Database**: Built to work with [Neon.tech](https://neon.tech) (Serverless PostgreSQL).
- **ORM**: Powered by **Knex.js** for elegant migrations and query building.

---

## ✨ Core Features

- 🔐 **Secure Authentication**: Robust JWT-based registration and login system with bcrypt hashing.
- 📊 **Mood Intelligence**: Log daily emotional states and retrieve intelligent analytics aggregated by mood types.
- 📓 **Private Journaling**: Encrypted-path journaling for personal reflection and emotional tracking.
- 💬 **Community Sanctuaries**: Mood-based chat rooms for real-time connection (Socket.io supported for persistent hosts).
- 🛠 **Developer First**: Fully equipped with database migrations, seeds, and comprehensive error handling.

---

## 🛠 Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **Node.js** | Core Runtime |
| **Express.js** | Web Framework |
| **PostgreSQL** | Primary Database |
| **Knex.js** | Query Builder & Migrations |
| **Socket.io** | Real-time Communication |
| **JWT** | Secure Authentication |

---

## 📖 API Documentation

### 🔓 Authentication
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register a new account (`name`, `email`, `password`) |
| `POST` | `/api/auth/login` | Authenticate and retrieve JWT token |

### 🌈 Mood & Analytics
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/mood/log` | Log an emotional entry (`modeType`, `modeSubType`) |
| `GET` | `/api/mood/analytics` | Retrieve mood aggregation stats (Supports `?days=` param) |

### 📝 Journal Entries
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/journals` | Create a detailed journal entry with mood tagging |
| `GET` | `/api/journals` | Retrieve all journals for the authenticated user |
| `POST` | `/api/journal/entries` | Legacy/Simplified entry creation |
| `GET` | `/api/journal/entries` | Legacy/Simplified entry retrieval |

### 🏠 Chat Sanctuaries
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/rooms` | List all available mood-based sanctuaries |
| `GET` | `/api/rooms/:id/messages` | Retrieve message history for a specific sanctuary |

---

## ⚙️ Local Setup

1. **Clone and Install**:
```bash
git clone <repository-url>
npm install
```

2. **Environment Configuration**:
Create a `.env` file in the root:
```env
PORT=5000
DATABASE_URL=postgresql://user:pass@localhost:5432/unfiltered
JWT_SECRET=your_secure_secret_key
NODE_ENV=development
```

3. **Database Initialization**:
```bash
npx knex migrate:latest
npx knex seed:run
```

---

## 🌍 Cloud Deployment (Vercel + Neon)

1. **Database**: Create a project on [Neon.tech](https://neon.tech) and copy your connection string.
2. **Migration**: Run migrations against your Neon DB from your local terminal:
```bash
DATABASE_URL="your_neon_url" NODE_ENV=production npx knex migrate:latest
```
3. **Vercel**: Import the repository, add the `DATABASE_URL` and `JWT_SECRET` to your project environment variables, and deploy.

---

## ⚡️ Real-time Support (Socket.io)
The API includes an integrated Socket.io handler (`src/socket.js`). 
> **Note**: Standard Vercel Serverless functions do not support persistent WebSockets. For full real-time capabilities, deploy this backend to a persistent host like **Render**, **Railway**, or **AWS EC2**.

---
*Created with ❤️ by the Unfiltered Team*
