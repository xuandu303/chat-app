# Chat App (Learning Project)

A real-time chat app built **only for learning**. This repo exists to practice WebSocket/Socket.IO concepts, not to ship a production product.

## Learning objectives (what I’m learning)

- Real-time communication with Socket.IO on client and server.
- Client–server event flow (send, receive, broadcast).
- Connection lifecycle: connect, disconnect, reconnect, and cleanup.
- Keeping UI state in sync with live events and persisted data.

## New concepts or technologies practiced

- Socket.IO events (`sendMessage`, `receiveMessage`, `sendChannelMessage`).
- Express APIs for auth, contacts, messages, and channels.
- MongoDB + Mongoose models and aggregation queries.
- File upload handling for profile images and message attachments.

## Tech stack

- React + Vite (client UI)
- Node.js + Express (server API)
- Socket.IO (real-time events)
- MongoDB + Mongoose (persistence)

## Project structure (simple)

```
.
├── client/   # React UI (routes, state, socket client)
├── server/   # Express API + Socket.IO server
├── package.json
└── readme.md
```

## How to run the project

1. Install dependencies for all packages:
   ```bash
   npm install
   npm install --prefix server
   npm install --prefix client
   ```
2. Create a server `.env` file (example values):
   ```bash
   PORT=3001
   DATABASE_URL=mongodb://localhost:27017/chat-app
   JWT_KEY=change-me
   ORIGIN=http://localhost:5173
   ```
3. Configure the client server URL (Vite env):
   ```bash
   # client/.env
   VITE_SERVER_URL=http://localhost:3001
   ```
4. Start both client and server (from repo root):
   ```bash
   npm run dev
   ```
5. Open the client in your browser:
   ```
   http://localhost:5173
   ```

## Lessons learned / notes

- Socket event names and payload structure matter more than I expected.
- Reconnect behavior can cause missed updates unless state is refreshed.
- Real-time UX depends on good separation between API data and live events.

## Limitations / future improvements

- Minimal error handling and input validation.
- Basic auth flow only; no refresh tokens or roles.
- No production hardening (security, monitoring, scaling).
- Limited testing around socket events and reconnect edge cases.
