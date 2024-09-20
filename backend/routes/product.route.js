import express from 'express';
const router = express.Router();
import { getAllProducts } from '../controllers/product.controller.js';
import { adminRoute, protectRoute } from '../middleware/auth.middleware.js';

router.get('/', protectRoute, adminRoute, getAllProducts);  // only admin can view all the products.

export default router;