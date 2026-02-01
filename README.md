# Client & Project Tracking Dashboard

A full-stack internal business tool for managing clients and projects, built with NestJS, Next.js, and MongoDB.

## 🚀 Overview

This application replaces spreadsheets and notes with a structured, maintainable system for tracking clients and their associated projects. It features secure authentication, real-time statistics, and advanced filtering capabilities.

## ✨ Features

- **Secure Authentication** - JWT-based login system
- **Client Management** - Full CRUD operations for client records
- **Project Tracking** - Manage projects with status tracking (Planning, In Progress, Blocked, Completed)
- **Advanced Filtering** - Search and filter projects by status, client, or keywords
- **Dashboard Analytics** - Real-time statistics and project overview
- **Modern UI** - Beautiful interface built with shadcn/ui components
- **Responsive Design** - Works seamlessly on desktop and mobile

## 🛠️ Tech Stack

### Backend
- **NestJS** - Progressive Node.js framework
- **MongoDB Atlas** - Cloud database (free tier)
- **Mongoose** - ODM for MongoDB
- **JWT** - Secure authentication
- **TypeScript** - Type-safe development

### Frontend
- **Next.js 15** - React framework with App Router
- **shadcn/ui** - Beautiful, accessible UI components
- **Tailwind CSS** - Utility-first styling
- **TypeScript** - Type-safe development

## 📋 Prerequisites

- Node.js 18 or higher
- npm or yarn
- MongoDB Atlas account (free tier available at https://www.mongodb.com/cloud/atlas)

## 🚦 Quick Start

### 1. Clone and Navigate
```bash
cd "c:\Users\hp\Desktop\Development\a things i complete\upworkfullstack1"
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:
```env
MONGODB_URI=your-mongodb-atlas-connection-string
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRATION=24h
PORT=3000
```

Start the backend:
```bash
npm run start:dev
```

Backend will run on `http://localhost:3000`

### 3. Frontend Setup

Open a new terminal:
```bash
cd frontend
npm install
```

Create `.env.local` file:
```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

Start the frontend:
```bash
npm run dev
```

Frontend will run on `http://localhost:3001`

### 4. Access the Application

1. Open your browser to `http://localhost:3001`
2. Login with default credentials:
   - **Username:** `admin`
   - **Password:** `admin`

## 📁 Project Structure

```
upworkfullstack1/
├── backend/                 # NestJS API
│   ├── src/
│   │   ├── auth/           # Authentication module
│   │   ├── clients/        # Clients module
│   │   ├── projects/       # Projects module
│   │   └── main.ts         # Entry point
│   ├── .env                # Environment variables
│   └── README.md           # Backend documentation
│
└── frontend/               # Next.js application
    ├── app/
    │   ├── login/          # Login page
    │   └── dashboard/      # Protected routes
    │       ├── clients/    # Client management
    │       └── projects/   # Project management
    ├── components/ui/      # shadcn/ui components
    ├── lib/                # Utilities and API client
    ├── .env.local          # Environment variables
    └── README.md           # Frontend documentation
```

## 🔑 Default Credentials

**⚠️ Important:** Change these credentials in production!

- Username: `admin`
- Password: `admin`

## 📚 API Endpoints

### Authentication
- `POST /auth/login` - Login and receive JWT token

### Clients
- `GET /clients` - List all clients
- `POST /clients` - Create client
- `GET /clients/:id` - Get client details
- `PATCH /clients/:id` - Update client
- `DELETE /clients/:id` - Delete client

### Projects
- `GET /projects` - List projects (with filtering)
- `POST /projects` - Create project
- `GET /projects/:id` - Get project details
- `PATCH /projects/:id` - Update project
- `DELETE /projects/:id` - Delete project
- `GET /projects/stats` - Get statistics

## 🎯 Usage Guide

### Creating a Client
1. Navigate to **Clients** in the sidebar
2. Click **New Client**
3. Fill in client information (name, email, notes)
4. Click **Create Client**

### Creating a Project
1. Navigate to **Projects** in the sidebar
2. Click **New Project**
3. Select a client from the dropdown
4. Enter project title, status, and description
5. Click **Create Project**

### Filtering Projects
1. Go to **Projects** page
2. Use the search bar to find projects by title
3. Use the status dropdown to filter by project status
4. Click **Clear** to reset filters

### Updating Project Status
1. Click on a project to view details
2. Click **Edit**
3. Change the status dropdown
4. Click **Save Changes**

## 🔒 Security Notes

- All API endpoints (except login) are protected with JWT authentication
- Tokens expire after 24 hours
- Middleware protects frontend routes
- Input validation on all forms
- MongoDB injection protection via Mongoose

## 🚀 Deployment Recommendations

### Backend
- Deploy to services like Heroku, Railway, or Render
- Use environment variables for sensitive data
- Enable CORS for your frontend domain
- Consider adding rate limiting

### Frontend
- Deploy to Vercel or Netlify
- Update `NEXT_PUBLIC_API_URL` to your backend URL
- Enable production optimizations

## 📝 Development Notes

- Backend runs on port 3000
- Frontend runs on port 3001
- Hot reload enabled in development mode
- TypeScript strict mode enabled
- ESLint configured for code quality

## 🤝 Contributing

This is an internal tool. For modifications:
1. Create a feature branch
2. Test thoroughly
3. Update documentation
4. Submit for review

## 📄 License

Internal use only - not for public distribution

## 🆘 Troubleshooting

### Backend won't start
- Check MongoDB connection string
- Ensure all environment variables are set
- Verify Node.js version (18+)

### Frontend won't connect to backend
- Verify backend is running on port 3000
- Check `.env.local` has correct API URL
- Check browser console for errors

### Authentication issues
- Clear browser localStorage
- Clear cookies
- Restart both backend and frontend

## 📞 Support

For issues or questions, contact your development team.

---

Built with ❤️ for internal business operations
