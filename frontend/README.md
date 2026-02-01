# Client & Project Tracking Dashboard - Frontend

A modern Next.js application with shadcn/ui for managing clients and projects.

## Features

- 🎨 Beautiful UI with shadcn/ui components
- 🔐 Secure authentication with JWT
- 📊 Dashboard with project statistics
- 👥 Client management interface
- 📁 Project management with filtering and search
- 🌙 Dark mode support
- 📱 Responsive design

## Prerequisites

- Node.js 18+ and npm
- Backend API running on `http://localhost:3000`

## Installation

```bash
npm install
```

## Environment Variables

Create a `.env.local` file in the frontend directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

See `.env.local.example` for reference.

## Running the Application

### Development Mode
```bash
npm run dev
```

The application will be available at `http://localhost:3001`

### Production Build
```bash
npm run build
npm start
```

## Pages and Routes

### Public Routes
- `/login` - Login page

### Protected Routes (requires authentication)
- `/dashboard` - Dashboard overview with statistics
- `/dashboard/clients` - Client list
- `/dashboard/clients/new` - Create new client
- `/dashboard/clients/[id]` - Client details
- `/dashboard/clients/[id]/edit` - Edit client
- `/dashboard/projects` - Project list with filters
- `/dashboard/projects/new` - Create new project
- `/dashboard/projects/[id]` - Project details
- `/dashboard/projects/[id]/edit` - Edit project

## Default Login Credentials

- Username: `admin`
- Password: `admin`

## Project Structure

```
app/
├── login/              # Login page
└── dashboard/          # Protected dashboard area
    ├── clients/        # Client management pages
    └── projects/       # Project management pages
components/
└── ui/                 # shadcn/ui components
lib/
├── api.ts              # API client with auth
├── types.ts            # TypeScript interfaces
└── constants.ts        # App constants
```

## Technologies Used

- Next.js 15 with App Router
- TypeScript
- shadcn/ui components
- Tailwind CSS
- Lucide icons

## Features Highlights

### Dashboard
- Real-time project statistics
- Quick access to recent projects
- Status-based project counts

### Client Management
- Grid-based client cards
- Full CRUD operations
- View associated projects

### Project Management
- Advanced filtering by status
- Search functionality
- Status badges with color coding
- Client association

## Development Notes

- All routes except `/login` are protected by middleware
- Authentication tokens are stored in localStorage and cookies
- API calls automatically include JWT tokens
- Unauthorized requests redirect to login page
