import express from 'express';
const router = express.Router();
import { getAllProducts,getFeaturedProducts,getRecommendedProducts,getProductsByCategory,createProduct,deleteProduct } from '../controllers/product.controller.js';
import { adminRoute, protectRoute } from '../middleware/auth.middleware.js';

router.get('/', protectRoute, adminRoute, getAllProducts);  // only admin can view all the products.
router.get('/featured', getFeaturedProducts);
router.get('/category/:category', getProductsByCategory);
router.get('/recommendations', getRecommendedProducts);
router.post('/', protectRoute, adminRoute, createProduct);
router.delete('/:id', protectRoute, adminRoute, deleteProduct);

export default router;