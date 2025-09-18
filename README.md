# Fullstack User Authentication

A modern fullstack user authentication system built with React, Node.js, Express, and MongoDB.

## Features

- 🔐 Secure JWT-based authentication
- 🛡️ Password hashing with bcrypt
- 🌙 Dark/Light theme support
- 📱 Responsive design with TailwindCSS
- ⚡ Fast development with Vite
- 🔒 Protected routes and middleware
- 🎯 Form validation with Zod
- 🍪 Secure cookie-based sessions

## Tech Stack

**Frontend:**
- React 19 + Vite
- React Router v7
- TailwindCSS v4
- Axios for API calls
- React Toastify for notifications

**Backend:**
- Node.js + Express
- MongoDB + Mongoose
- JWT for authentication
- bcrypt for password hashing
- Zod for input validation

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/paramveer02/fullstack-user-authentication.git
   cd fullstack-user-authentication
   ```

2. **Install root dependencies**
   ```bash
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd client-auth
   npm install
   cd ..
   ```

4. **Install server dependencies**
   ```bash
   cd server-auth
   npm install
   cd ..
   ```

5. **Environment Setup**
   ```bash
   # Copy the example environment file
   cp .env.example .env
   
   # Edit .env with your configuration
   # Make sure to set a secure JWT_SECRET_KEY (at least 32 characters)
   ```

6. **Start MongoDB**
   - Local: Make sure MongoDB is running
   - Cloud: Update DB_URI in .env with your MongoDB Atlas connection string

### Development

**Start both client and server concurrently:**
```bash
npm run dev
```

**Or start them separately:**

```bash
# Terminal 1 - Start server (from root)
npm run dev-server

# Terminal 2 - Start client (from root)  
npm run dev-client
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:8000

## Project Structure

```
fullstack-user-authentication/
├── client-auth/                 # React frontend
│   ├── src/
│   │   ├── components/         # Reusable components
│   │   ├── context/           # React context providers
│   │   ├── pages/             # Route components
│   │   ├── utils/             # Utility functions
│   │   └── main.jsx           # App entry point
│   ├── public/                # Static assets
│   └── package.json
├── server-auth/                # Express backend
│   ├── config/                # Configuration files
│   ├── controllers/           # Route handlers
│   ├── errors/                # Custom error classes
│   ├── middlewares/           # Express middlewares
│   ├── models/                # Mongoose models
│   ├── routes/                # API routes
│   ├── schemas/               # Zod validation schemas
│   ├── utils/                 # Utility functions
│   └── server.js              # Server entry point
└── package.json               # Root package.json
```

## API Endpoints

### Authentication
- `POST /api/v1/auth/signup` - Register new user
- `POST /api/v1/auth/login` - Login user
- `POST /api/v1/auth/logout` - Logout user
- `GET /api/v1/auth/me` - Get current user (protected)

## Security Features

- ✅ Password hashing with bcrypt (12 salt rounds)
- ✅ JWT tokens with secure cookies
- ✅ Password complexity requirements
- ✅ Input validation and sanitization
- ✅ CORS protection
- ✅ Helmet security headers
- ✅ Environment variable validation

## Password Requirements

Passwords must contain at least:
- 8 characters minimum
- One lowercase letter
- One uppercase letter  
- One number
- One special character (@$!%*?&)

## Environment Variables

See `.env.example` for all required environment variables.

**Required:**
- `DB_URI` - MongoDB connection string
- `JWT_SECRET_KEY` - JWT signing key (min 32 characters)
- `JWT_EXPIRES_IN` - Token expiration time
- `NODE_ENV` - Environment (development/production)

## Building for Production

**Build the client:**
```bash
cd client-auth
npm run build
```

**Start production server:**
```bash
cd server-auth
NODE_ENV=production npm start
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Author

**Paramvir Marwah** - [GitHub](https://github.com/paramveer02)

---

⭐ Star this repository if you find it helpful!