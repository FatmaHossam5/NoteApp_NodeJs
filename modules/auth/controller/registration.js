import userModel from "../../../DB/model/User.js";
import { asyncHandler } from "../../../services/errorHandling.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

/**
 * User registration endpoint
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
export const signUp = asyncHandler(async (req, res, next) => {
    const { name, email, password } = req.body;
    
    // Check if user already exists
    const existingUser = await userModel.findOne({ email }).select('email');
    if (existingUser) {
        return res.status(409).json({ 
            message: "Email already exists",
            error: "EMAIL_EXISTS"
        });
    }
    
    // Hash password
    const saltRounds = parseInt(process.env.SALTROUND) || 10;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);
    
    // Create new user
    const newUser = new userModel({
        name,
        email,
        password: hashedPassword
    });
    
    const savedUser = await newUser.save();
    
    res.status(201).json({
        message: "User registered successfully",
        user: {
            id: savedUser._id,
            name: savedUser.name,
            email: savedUser.email
        }
    });
});

/**
 * User login endpoint
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
export const login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    
    // Find user by email
    const user = await userModel.findOne({ email });
    if (!user) {
        return res.status(401).json({ 
            message: "Invalid email or password",
            error: "INVALID_CREDENTIALS"
        });
    }
    
    // Verify password
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ 
            message: "Invalid email or password",
            error: "INVALID_CREDENTIALS"
        });
    }
    
    // Generate JWT token
    const token = jwt.sign(
        { id: user._id }, 
        process.env.signature,
        { expiresIn: '7d' }
    );
    
    res.status(200).json({
        message: "Login successful",
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email
        }
    });
});