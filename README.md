# Unfiltered API — Backend Service

A high performance, secure Node.js backend designed for the **Unfiltered** ecosystem. This API manages user sanctuaries, mood-based analytics, secure journaling, and real-time community engagement via WebSockets.

---

## ✨ Core Features

- 🔐 **Secure Authentication** — JWT-based registration & login with bcrypt password hashing.
- 📊 **Mood Intelligence** — Log daily emotional states and retrieve analytics aggregated by mood type.
- 📓 **Private Journaling** — Personal journal entries with mood tagging.
- 💬 **Real-time Sanctuaries** — Mood-based chat rooms powered by **Socket.io** with full WebSocket support.
- 🛠 **Developer First** — Knex.js migrations, seeds, and comprehensive error handling.

---

## 🛠 Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **Node.js** | Core Runtime |
| **Express.js** | Web Framework |
| **PostgreSQL** | Primary Database (Neon.tech) |
| **Knex.js** | Query Builder & Migrations |
| **Socket.io** | Real-time WebSocket Communication |
| **JWT** | Secure Authentication |
| **bcrypt** | Password Hashing |

---

## 📖 API Documentation

Base URL: `https://unfilteredapp-backend.onrender.com`

### 🔓 Authentication
| Method | Endpoint | Auth | Description |
| :--- | :--- | :---: | :--- |
| `POST` | `/api/auth/register` | ❌ | Register a new account (`name`, `email`, `password`) |
| `POST` | `/api/auth/login` | ❌ | Authenticate and retrieve a JWT token |
| `GET` | `/api/auth/profile` | ✅ | Get the authenticated user's profile |

### 🌈 Mood & Analytics
| Method | Endpoint | Auth | Description |
| :--- | :--- | :---: | :--- |
| `POST` | `/api/mood/log` | ✅ | Log an emotional entry (`modeType`, `modeSubType`) |
| `GET` | `/api/mood/analytics` | ✅ | Retrieve mood aggregation stats (supports `?days=` param) |

### 📝 Journal Entries
| Method | Endpoint | Auth | Description |
| :--- | :--- | :---: | :--- |
| `POST` | `/api/journals` | ✅ | Create a detailed journal entry with mood tagging |
| `GET` | `/api/journals` | ✅ | Retrieve all journals for the authenticated user |
| `POST` | `/api/journal/entries` | ✅ | Simplified entry creation |
| `GET` | `/api/journal/entries` | ✅ | Simplified entry retrieval |

### 🏠 Chat Sanctuaries
| Method | Endpoint | Auth | Description |
| :--- | :--- | :---: | :--- |
| `GET` | `/api/rooms` | ✅ | List all available mood-based sanctuaries |
| `GET` | `/api/rooms/:id/messages` | ✅ | Retrieve message history for a specific sanctuary |

### ⚡ Real-time — Socket.io Events
| Event | Direction | Payload | Description |
| :--- | :--- | :--- | :--- |
| `join_room` | Client → Server | `roomId` | Join a sanctuary chat room |
| `send_message` | Client → Server | `{ roomId, userId, content }` | Send a message to a room |
| `receive_message` | Server → Client | `{ id, roomId, userId, content, createdAt }` | Receive a broadcast message |
| `disconnect` | Client → Server | — | Client leaves all rooms |

---

## ⚙️ Local Setup

1. **Clone and Install**:
```bash
git clone https://github.com/vidney14/UnfilteredApp-Backend.git
cd UnfilteredApp-Backend
npm install
```

2. **Environment Configuration** — create a `.env` file in the root:
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

4. **Run the dev server**:
```bash
npm run dev
```

---

## 🌍 Cloud Deployment (Render + Neon)

This backend is deployed as a **persistent Web Service on [Render](https://render.com)**, which provides full WebSocket support required by Socket.io.

### Database (Neon.tech)
1. Create a project on [Neon.tech](https://neon.tech) and copy your connection string.
2. Run migrations against the production db:
```bash
DATABASE_URL="your_neon_url" NODE_ENV=production npx knex migrate:latest
```

### Render
| Setting | Value |
| :--- | :--- |
| **Runtime** | Node |
| **Build Command** | `npm install` |
| **Start Command** | `node index.js` |
| **Branch** | `main` |

Add these environment variables in the Render dashboard:
```
DATABASE_URL=<your_neon_connection_string>
JWT_SECRET=<your_secret>
NODE_ENV=production
```

Render auto-deploys on every push to `main`. 🚀

---

