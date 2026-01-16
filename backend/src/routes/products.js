import express from 'express';
import { getAllProducts, getProductById } from '../services/productService.js';

const router = express.Router();

/**
 * GET /api/products
 * Fetch all active products
 */
router.get('/', async (req, res) => {
  try {
    const products = await getAllProducts();
    
    // Optional filtering
    let filtered = products;
    
    if (req.query.category) {
      filtered = filtered.filter(p => 
        p.category.toLowerCase() === req.query.category.toLowerCase()
      );
    }
    
    if (req.query.search) {
      const search = req.query.search.toLowerCase();
      filtered = filtered.filter(p => 
        p.product_name.toLowerCase().includes(search) ||
        p.short_description.toLowerCase().includes(search)
      );
    }

    res.json({
      success: true,
      count: filtered.length,
      products: filtered
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

/**
 * GET /api/products/:id
 * Fetch a single product by ID
 */
router.get('/:id', async (req, res) => {
  try {
    const product = await getProductById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({
      success: true,
      product
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

export default router;
