import express from 'express';
const router = express.Router();
import { getAllProducts,getFeaturedProducts } from '../controllers/product.controller.js';
import { adminRoute, protectRoute } from '../middleware/auth.middleware.js';

router.get('/', protectRoute, adminRoute, getAllProducts);  // only admin can view all the products.
router.get('/featured', getFeaturedProducts);


export default router;