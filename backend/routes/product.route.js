import express from 'express';
const router = express.Router();
import { getAllProducts,getFeaturedProducts,createProduct } from '../controllers/product.controller.js';
import { adminRoute, protectRoute } from '../middleware/auth.middleware.js';

router.get('/', protectRoute, adminRoute, getAllProducts);  // only admin can view all the products.
router.get('/featured', getFeaturedProducts);
router.post('/', protectRoute, adminRoute, createProduct);

export default router;