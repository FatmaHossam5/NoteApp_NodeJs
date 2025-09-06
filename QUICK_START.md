# 🚀 Quick Start Guide

Get your NoteApp Backend running in 5 minutes!

## ⚡ **Prerequisites**
- Node.js 18+ installed
- MongoDB running (local or cloud)

## 🏃‍♂️ **Quick Setup**

### 1. **Install Dependencies**
```bash
npm install
```

### 2. **Configure Environment**
Edit the `.env` file with your settings:
```env
# Update these values:
DBURI=mongodb://localhost:27017/noteapp
signature=your-super-secret-jwt-key-here
```

### 3. **Start the Server**
```bash
npm run dev
```

### 4. **Test the API**
Open Postman and import `NoteApp_API.postman_collection.json`

Or test with curl:
```bash
# Register a user
curl -X POST http://localhost:3000/api/v1/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"TestPass123","cPassword":"TestPass123"}'

# Login
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"TestPass123"}'
```

## 🎯 **API Base URL**
```
http://localhost:3000/api/v1
```

## 📚 **Full Documentation**
- See `README.md` for complete API documentation
- See `DEPLOYMENT.md` for deployment instructions
- See `PORTFOLIO_SUMMARY.md` for project overview

## 🔧 **Troubleshooting**

### Server won't start?
- Check if MongoDB is running
- Verify `.env` file exists and has correct values
- Ensure port 3000 is available

### Database connection failed?
- Check MongoDB connection string in `.env`
- Ensure MongoDB is running
- Verify database permissions

### API returns errors?
- Check if all required fields are provided
- Verify JWT token is valid for protected routes
- Check server logs for detailed error messages

---

**Ready to go! 🎉**
