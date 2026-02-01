# Client & Project Tracking Dashboard - Backend

A secure NestJS REST API for managing clients and projects with MongoDB.

## Features

- 🔐 JWT-based authentication
- 👥 Client management (CRUD operations)
- 📁 Project management with status tracking
- 🔍 Advanced filtering and search
- ✅ Input validation with DTOs
- 🗄️ MongoDB with Mongoose ODM

## Prerequisites

- Node.js 18+ and npm
- MongoDB Atlas account (free tier available)

## Installation

```bash
npm install
```

## Environment Variables

Create a `.env` file in the backend directory:

```env
MONGODB_URI=your-mongodb-connection-string
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRATION=24h
PORT=3000
```

See `.env.example` for reference.

## Running the Application

### Development Mode
```bash
npm run start:dev
```

The API will be available at `http://localhost:3000`

### Production Mode
```bash
npm run build
npm run start:prod
```

## API Endpoints

### Authentication
- `POST /auth/login` - Login and receive JWT token
  ```json
  {
    "username": "admin",
    "password": "admin"
  }
  ```

### Clients
- `GET /clients` - List all clients
- `POST /clients` - Create a new client
- `GET /clients/:id` - Get client by ID
- `PATCH /clients/:id` - Update client
- `DELETE /clients/:id` - Delete client

### Projects
- `GET /projects` - List all projects (supports filtering)
  - Query params: `?status=Planning&clientId=xxx&search=term`
- `POST /projects` - Create a new project
- `GET /projects/:id` - Get project by ID
- `PATCH /projects/:id` - Update project
- `DELETE /projects/:id` - Delete project
- `GET /projects/stats` - Get project statistics

## Project Structure

```
src/
├── auth/           # Authentication module
│   ├── dto/        # Data transfer objects
│   ├── guards/     # Route guards
│   └── strategies/ # JWT strategy
├── clients/        # Clients module
│   ├── dto/        # DTOs for clients
│   └── schemas/    # MongoDB schemas
├── projects/       # Projects module
│   ├── dto/        # DTOs for projects
│   └── schemas/    # MongoDB schemas
└── main.ts         # Application entry point
```

## Default Credentials

- Username: `admin`
- Password: `admin`

**⚠️ Change these in production!**

## Technologies Used

- NestJS 10
- MongoDB with Mongoose
- JWT for authentication
- class-validator for validation
- TypeScript
