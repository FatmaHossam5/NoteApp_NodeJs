import express from "express";
import dotenv from 'dotenv';
import { appRouter } from "./modules/index.router.js";

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Configure application routes and middleware
appRouter(app);

// Start server
app.listen(port, () => {
    console.log(`🚀 Server is running on port ${port}`);
    console.log(`📝 NoteApp API available at http://localhost:${port}/api/v1`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});
