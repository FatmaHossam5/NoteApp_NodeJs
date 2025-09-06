# 📝 NoteApp Backend API

A robust RESTful API for personal note-taking with JWT authentication, built with Node.js, Express, and MongoDB.

## ✨ Features

- **User Authentication**: Secure registration and login with JWT tokens
- **Note Management**: Full CRUD operations for personal notes
- **User Isolation**: Each user can only access their own notes
- **Input Validation**: Comprehensive validation using Joi
- **Security**: Rate limiting, helmet security headers, and password hashing
- **Error Handling**: Centralized error handling with detailed responses
- **Modern Architecture**: Clean MVC pattern with modular design

## 🛠️ Tech Stack

- **Runtime**: Node.js 18+
- **Framework**: Express.js 4.18.2
- **Database**: MongoDB with Mongoose 8.0.3
- **Authentication**: JWT (jsonwebtoken 9.0.2)
- **Security**: Helmet, express-rate-limit, bcryptjs
- **Validation**: Joi 17.11.0
- **Email**: Nodemailer 6.9.7
- **Deployment**: Vercel-ready

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- MongoDB database (local or cloud)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd NoteApp_NodeJs
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   # Server Configuration
   PORT=3000
   NODE_ENV=development
   
   # Database
   DBURI=mongodb://localhost:27017/noteapp
   
   # JWT Configuration
   signature=your-super-secret-jwt-key-here
   BearerKey=Bearer 
   SALTROUND=10
   
   # Email Configuration (Optional)
   nodeMailerEmail=your-email@gmail.com
   nodeMailerPassword=your-app-password
   
   
   ```

4. **Start the server**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

The server will start on `http://localhost:3000` (or your specified PORT).

## 📚 API Documentation

### Base URL
```
http://localhost:3000/api/v1
```

### Authentication Endpoints

#### Register User
```http
POST /auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123",
  "cPassword": "SecurePass123",
  "phone": 1234567890,
  "age": 25
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "64f1a2b3c4d5e6f7g8h9i0j1",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### Login User
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "64f1a2b3c4d5e6f7g8h9i0j1",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Note Endpoints

> **Note**: All note endpoints require authentication. Include the JWT token in the Authorization header:
> ```
> Authorization: Bearer <your-jwt-token>
> ```

#### Create Note
```http
POST /note/add
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "My First Note",
  "desc": "This is the content of my note"
}
```

**Response:**
```json
{
  "message": "Note created successfully",
  "note": {
    "_id": "64f1a2b3c4d5e6f7g8h9i0j2",
    "title": "My First Note",
    "desc": "This is the content of my note",
    "userID": "64f1a2b3c4d5e6f7g8h9i0j1",
    "createdAt": "2023-09-01T10:00:00.000Z",
    "updatedAt": "2023-09-01T10:00:00.000Z"
  }
}
```

#### Get User Notes
```http
GET /note/notes/:userId
Authorization: Bearer <token>
```

**Response:**
```json
{
  "message": "Notes retrieved successfully",
  "notes": [
    {
      "_id": "64f1a2b3c4d5e6f7g8h9i0j2",
      "title": "My First Note",
      "desc": "This is the content of my note",
      "userID": "64f1a2b3c4d5e6f7g8h9i0j1",
      "createdAt": "2023-09-01T10:00:00.000Z",
      "updatedAt": "2023-09-01T10:00:00.000Z"
    }
  ],
  "count": 1
}
```

#### Update Note
```http
PUT /note/update/:noteId
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Note Title",
  "desc": "Updated note content"
}
```

#### Delete Note
```http
DELETE /note/delete/:noteId
Authorization: Bearer <token>
```

## 🔒 Security Features

- **Password Hashing**: Uses bcryptjs with configurable salt rounds
- **JWT Authentication**: Secure token-based authentication
- **Rate Limiting**: 100 requests per 15 minutes per IP
- **Security Headers**: Helmet.js for security headers
- **Input Validation**: Joi validation for all inputs
- **CORS Protection**: Configurable CORS settings
- **Request Size Limits**: 10MB limit on request bodies

## 📁 Project Structure

```
NoteApp_NodeJs/
├── DB/                          # Database layer
│   ├── connection.js           # MongoDB connection
│   └── model/                  # Data models
│       ├── note.js            # Note schema
│       └── User.js            # User schema
├── middleware/                  # Middleware layer
│   ├── auth.js                # JWT authentication
│   └── validation.js          # Input validation
├── modules/                    # Feature modules
│   ├── auth/                  # Authentication module
│   │   ├── auth.router.js     # Auth routes
│   │   ├── auth.validation.js # Auth validation schemas
│   │   └── controller/        # Auth controllers
│   │       └── registration.js
│   ├── note/                  # Note management module
│   │   ├── note.router.js     # Note routes
│   │   ├── note.validation.js # Note validation schemas
│   │   └── controller/        # Note controllers
│   │       └── note.js
│   └── index.router.js        # Main router configuration
├── services/                   # Service layer
│   ├── email.js               # Email service
│   └── errorHandling.js       # Error handling utilities
├── index.js                   # Application entry point
├── package.json               # Dependencies and scripts
├── vercel.json               # Deployment configuration
└── README.md                 # This file
```

## 🚀 Deployment

### Vercel Deployment

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Set Environment Variables**
   In your Vercel dashboard, add all the environment variables from your `.env` file.




## 🧪 Testing the API

You can test the API using:

- **Postman**: Import the endpoints and test
- **Thunder Client**: VS Code extension
- **curl**: Command line testing
- **Insomnia**: API testing tool

### Example curl commands:

```bash
# Register a user
curl -X POST http://localhost:3000/api/v1/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"SecurePass123","cPassword":"SecurePass123"}'

# Login
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"SecurePass123"}'

# Create a note (replace <token> with actual JWT token)
curl -X POST http://localhost:3000/api/v1/note/add \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"title":"My Note","desc":"Note content"}'
```

## 🐛 Error Handling

The API returns consistent error responses:

```json
{
  "message": "Error description",
  "status": 400,
  "timestamp": "2023-09-01T10:00:00.000Z",
  "path": "/api/v1/note/add"
}
```

Common HTTP status codes:
- `200`: Success
- `201`: Created
- `400`: Bad Request
- `401`: Unauthorized
- `404`: Not Found
- `409`: Conflict
- `429`: Too Many Requests
- `500`: Internal Server Error