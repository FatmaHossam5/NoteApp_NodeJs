/**
 * Async handler wrapper to catch errors in async functions
 * @param {Function} fn - Async function to wrap
 * @returns {Function} Express middleware function
 */
export const asyncHandler = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(err => {
            next(new Error(err, { cause: 500 }));
        });
    };
};

/**
 * Global error handling middleware
 * @param {Error} err - Error object
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
export const globalErrorHandling = (err, req, res, next) => {
    if (err) {
        const statusCode = err.cause || 500;
        const isDevelopment = process.env.NODE_ENV === 'development';
        
        const errorResponse = {
            message: err.message || 'Internal Server Error',
            status: statusCode,
            timestamp: new Date().toISOString(),
            path: req.originalUrl
        };

        // Include stack trace in development mode
        if (isDevelopment) {
            errorResponse.stack = err.stack;
        }

        return res.status(statusCode).json(errorResponse);
    }
    
    // If no error, pass to next middleware
    next();
};






