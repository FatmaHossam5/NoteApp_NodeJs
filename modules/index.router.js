
import noteRouter from './note/note.router.js';
import authRouter from './auth/auth.router.js';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import connectDB from '../DB/connection.js';
import { globalErrorHandling } from '../services/errorHandling.js';

// Rate limiting configuration
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: {
        error: 'Too many requests from this IP, please try again later.'
    },
    standardHeaders: true,
    legacyHeaders: false,
});

export const appRouter = (app) => {
    // Security middleware
    app.use(helmet());
    app.use(limiter);
    
    // Body parsing middleware
    app.use(express.json({ limit: '10mb' }));
    app.use(express.urlencoded({ extended: false, limit: '10mb' }));
    
  
 

// CORS configuration with multiple origins
const allowedOrigins = [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'https://fatmahossam5.github.io',
    'https://fatmahossam5.github.io/NoteApp_React',
    process.env.FRONTEND_URL
].filter(Boolean); // Remove any undefined values

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        } else {
            console.log('CORS blocked origin:', origin);
            return callback(new Error('Not allowed by CORS'), false);
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
    const baseUrl = '/api/v1';
    
    // API routes
    app.use(`${baseUrl}/auth`, authRouter);
    app.use(`${baseUrl}/note`, noteRouter);
    
    // 404 handler
    app.use("*", (req, res) => {
        res.status(404).json({ 
            message: "Invalid route",
            availableRoutes: [
                `${baseUrl}/auth/signup`,
                `${baseUrl}/auth/login`,
                `${baseUrl}/note/add`,
                `${baseUrl}/note/notes/:id`,
                `${baseUrl}/note/update/:id`,
                `${baseUrl}/note/delete/:id`
            ]
        });
    });
    
    // Global error handling (must be last)
    app.use(globalErrorHandling);
    
    // Connect to database
    connectDB();
};
