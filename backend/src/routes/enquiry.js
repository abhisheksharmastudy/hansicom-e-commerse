import express from 'express';
import { body, validationResult } from 'express-validator';
import { submitEnquiry } from '../services/enquiryService.js';

const router = express.Router();

/**
 * POST /api/enquiry
 * Submit a customer enquiry
 */
router.post('/',
  // Validation rules
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('phone').matches(/^[6-9]\d{9}$/).withMessage('Valid 10-digit Indian phone number required'),
  body('company').optional().trim(),
  body('product_interest').optional().trim(),
  body('quantity').optional().isInt({ min: 1 }).toInt(),
  body('city').optional().trim(),
  body('notes').optional().trim().isLength({ max: 500 }).withMessage('Notes must be under 500 characters'),
  
  async (req, res) => {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        errors: errors.array().map(e => e.msg) 
      });
    }

    try {
      const result = await submitEnquiry({
        ...req.body,
        source_page: req.headers.referer || 'Direct API'
      });

      res.status(201).json({
        success: true,
        message: 'Thank you! Your enquiry has been submitted. Our team will contact you shortly.',
        enquiry_id: result.enquiry_id
      });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        error: 'Failed to submit enquiry. Please try again.' 
      });
    }
  }
);

export default router;
