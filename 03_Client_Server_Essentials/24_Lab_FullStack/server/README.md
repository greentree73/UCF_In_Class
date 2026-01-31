# Server README

## Setup

1. Create a PostgreSQL database:
   ```bash
   psql -U postgres
   CREATE DATABASE fullstack_db;
   \q
   ```

2. Copy `.env.EXAMPLE` to `.env` and update with your database credentials:
   ```bash
   cp .env.EXAMPLE .env
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Run in development mode:
   ```bash
   npm run dev
   ```

## API Endpoints

- `GET /api/messages` - Get all messages
- `POST /api/messages` - Create a new message
  - Body: `{ "username": "string", "content": "string" }`
- `GET /api/health` - Health check

## Technologies

- **Express**: Web framework
- **Sequelize**: PostgreSQL ORM
- **TypeScript**: Type safety
- **tsx**: TypeScript execution
