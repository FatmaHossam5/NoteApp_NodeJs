import jwt from "jsonwebtoken";
import userModel from "../DB/model/User.js";
import { asyncHandler } from "../services/errorHandling.js";

/**
 * JWT Authentication Middleware
 * Verifies JWT token and attaches user to request object
 * @returns {Function} Express middleware function
 */
export const auth = () => {
    return asyncHandler(async (req, res, next) => {
        const { authorization } = req.headers;
        
        // Check if authorization header exists and starts with Bearer
        if (!authorization?.startsWith(process.env.BearerKey)) {
            return next(new Error("Invalid authorization header format", { cause: 401 }));
        }
        
        // Extract token from authorization header
        const token = authorization.split(process.env.BearerKey)[1];
        
        if (!token) {
            return next(new Error("No token provided", { cause: 401 }));
        }
        
        try {
            // Verify JWT token
            const decoded = jwt.verify(token, process.env.signature);
            
            if (!decoded?.id) {
                return next(new Error("Invalid token payload", { cause: 401 }));
            }
            
            // Find user by ID
            const user = await userModel.findById(decoded.id).select('email name _id');
            
            if (!user) {
                return next(new Error("User not found", { cause: 401 }));
            }
            
            // Attach user to request object
            req.user = user;
            return next();
            
        } catch (error) {
            if (error.name === 'JsonWebTokenError') {
                return next(new Error("Invalid token", { cause: 401 }));
            } else if (error.name === 'TokenExpiredError') {
                return next(new Error("Token expired", { cause: 401 }));
            } else {
                return next(new Error("Token verification failed", { cause: 401 }));
            }
        }
    });
};