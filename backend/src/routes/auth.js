/**
 * User Authentication Routes
 * Handles registration, login, and Google OAuth
 */

import express from 'express';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
import * as userService from '../services/userService.js';

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'dev-jwt-secret-change-in-production';

/**
 * Generate JWT token for user
 */
function generateToken(user) {
  return jwt.sign(
    { 
      id: user.id, 
      email: user.email, 
      name: user.name,
      type: 'user' // differentiate from admin tokens
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

/**
 * POST /api/auth/register
 * Register a new user
 */
router.post('/register', [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { name, email, password } = req.body;
    
    const user = await userService.createUser({ name, email, password });
    const token = generateToken(user);

    res.status(201).json({
      success: true,
      message: 'Account created successfully',
      user,
      token
    });
  } catch (error) {
    console.error('[Auth] Register error:', error.message);
    res.status(400).json({ 
      success: false, 
      error: error.message 
    });
  }
});

/**
 * POST /api/auth/login
 * Login with email and password
 */
router.post('/login', [
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { email, password } = req.body;
    
    // Find user
    const user = await userService.findByEmail(email);
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        error: 'Invalid email or password' 
      });
    }

    // Check if user registered with Google
    if (user.provider === 'google' && !user.password_hash) {
      return res.status(401).json({ 
        success: false, 
        error: 'This account uses Google sign-in. Please use "Sign in with Google".' 
      });
    }

    // Verify password
    const isValid = await userService.verifyPassword(user, password);
    if (!isValid) {
      return res.status(401).json({ 
        success: false, 
        error: 'Invalid email or password' 
      });
    }

    // Generate token
    const token = generateToken(user);
    const { password_hash: _, ...safeUser } = user;

    res.json({
      success: true,
      message: 'Login successful',
      user: safeUser,
      token
    });
  } catch (error) {
    console.error('[Auth] Login error:', error.message);
    res.status(500).json({ 
      success: false, 
      error: 'Login failed. Please try again.' 
    });
  }
});

/**
 * POST /api/auth/google
 * Handle Google OAuth sign-in
 * Expects { name, email, googleId } from frontend after Google sign-in
 */
router.post('/google', [
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('googleId').notEmpty().withMessage('Google ID is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { name, email, googleId } = req.body;
    
    const user = await userService.findOrCreateGoogleUser({ name, email, googleId });
    const token = generateToken(user);

    res.json({
      success: true,
      message: 'Google sign-in successful',
      user,
      token
    });
  } catch (error) {
    console.error('[Auth] Google auth error:', error.message);
    res.status(500).json({ 
      success: false, 
      error: 'Google sign-in failed. Please try again.' 
    });
  }
});

/**
 * GET /api/auth/me
 * Get current user from JWT token
 */
router.get('/me', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        success: false, 
        error: 'No token provided' 
      });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Only accept user tokens, not admin tokens
    if (decoded.type !== 'user') {
      return res.status(401).json({ 
        success: false, 
        error: 'Invalid token type' 
      });
    }

    const user = await userService.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        error: 'User not found' 
      });
    }

    const { password_hash: _, ...safeUser } = user;
    res.json({
      success: true,
      user: safeUser
    });
  } catch (error) {
    console.error('[Auth] Token verification error:', error.message);
    res.status(401).json({ 
      success: false, 
      error: 'Invalid or expired token' 
    });
  }
});

export default router;
