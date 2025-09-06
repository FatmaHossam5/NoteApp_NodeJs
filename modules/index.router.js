
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
    
    // CORS configuration
    app.use(cors({
        origin: process.env.FRONTEND_URL || '*',
        credentials: true
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
