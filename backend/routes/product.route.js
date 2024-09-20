import express from 'express';
const router = express.Router();
import { getAllProducts,getFeaturedProducts,getRecommendedProducts,getProductsByCategory,createProduct,toggleFeaturedProduct,deleteProduct } from '../controllers/product.controller.js';
import { adminRoute, protectRoute } from '../middleware/auth.middleware.js';

router.get('/', protectRoute, adminRoute, getAllProducts);  // only admin can view all the products.
router.get('/featured', getFeaturedProducts); // view the featured products
router.get('/category/:category', getProductsByCategory);
router.get('/recommendations', getRecommendedProducts);
router.post('/', protectRoute, adminRoute, createProduct);
router.patch('/:id', protectRoute, adminRoute, toggleFeaturedProduct);//admin can decide whether a product is featured/not
router.delete('/:id', protectRoute, adminRoute, deleteProduct);

export default router;