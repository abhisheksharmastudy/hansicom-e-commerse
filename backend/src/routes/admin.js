import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { body, validationResult } from 'express-validator';
import { verifyToken } from '../middleware/auth.js';
import { createProduct, updateProduct, disableProduct, getAllProducts } from '../services/productService.js';
import { getAllEnquiries } from '../services/enquiryService.js';
import { getMonthlyReport } from '../services/analyticsService.js';

const router = express.Router();

// ─────────────────────────────────────────────────────────────
// Auth Routes
// ─────────────────────────────────────────────────────────────

/**
 * POST /api/admin/login
 * Authenticate admin user
 */
router.post('/login',
  body('email').isEmail().withMessage('Valid email required'),
  body('password').notEmpty().withMessage('Password required'),
  
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array().map(e => e.msg) });
    }

    const { email, password } = req.body;

    // V1: Single admin check (from environment)
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@fireguard.com';
    const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;

    // For development, allow a default password
    const defaultDevPassword = 'admin123';
    
    if (email !== adminEmail) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    // Check password
    let isValidPassword = false;
    
    if (adminPasswordHash) {
      isValidPassword = await bcrypt.compare(password, adminPasswordHash);
    } else if (process.env.NODE_ENV !== 'production') {
      // Development mode: allow default password
      isValidPassword = password === defaultDevPassword;
    }

    if (!isValidPassword) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign(
      { email, role: 'admin' },
      process.env.JWT_SECRET || 'dev-secret-change-in-production',
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    res.json({
      success: true,
      message: 'Login successful',
      token,
      admin: { email, role: 'admin' }
    });
  }
);

// ─────────────────────────────────────────────────────────────
// Protected Routes (Require JWT)
// ─────────────────────────────────────────────────────────────

/**
 * GET /api/admin/products
 * Get all products (including disabled)
 */
router.get('/products', verifyToken, async (req, res) => {
  try {
    const products = await getAllProducts({ includeInactive: true });
    res.json({ success: true, products });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

/**
 * POST /api/admin/products
 * Create a new product
 */
router.post('/products', 
  verifyToken,
  body('product_name').trim().notEmpty().withMessage('Product name required'),
  body('category').trim().notEmpty().withMessage('Category required'),
  body('price').isNumeric().withMessage('Valid price required'),
  
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array().map(e => e.msg) });
    }

    try {
      const product = await createProduct(req.body);
      res.status(201).json({ success: true, product });
    } catch (error) {
      res.status(500).json({ error: 'Failed to create product' });
    }
  }
);

/**
 * PUT /api/admin/products/:id
 * Update a product
 */
router.put('/products/:id', verifyToken, async (req, res) => {
  try {
    const product = await updateProduct(req.params.id, req.body);
    res.json({ success: true, product });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update product' });
  }
});

/**
 * PATCH /api/admin/products/:id/disable
 * Disable a product
 */
router.patch('/products/:id/disable', verifyToken, async (req, res) => {
  try {
    const product = await disableProduct(req.params.id);
    res.json({ success: true, message: 'Product disabled', product });
  } catch (error) {
    res.status(500).json({ error: 'Failed to disable product' });
  }
});

/**
 * GET /api/admin/enquiries
 * Get all enquiries with optional filters
 */
router.get('/enquiries', verifyToken, async (req, res) => {
  try {
    const filters = {
      startDate: req.query.startDate,
      endDate: req.query.endDate,
      city: req.query.city
    };
    
    const enquiries = await getAllEnquiries(filters);
    res.json({ 
      success: true, 
      count: enquiries.length,
      enquiries 
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch enquiries' });
  }
});

/**
 * GET /api/admin/reports/monthly
 * Get monthly analytics report
 */
router.get('/reports/monthly', verifyToken, async (req, res) => {
  try {
    const report = await getMonthlyReport(req.query.month);
    res.json({ success: true, report });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate report' });
  }
});

export default router;
