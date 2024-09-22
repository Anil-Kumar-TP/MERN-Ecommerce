import express from 'express';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import { connectDB } from './lib/db.js';

import authRoutes from './routes/auth.route.js'
import productRoutes from './routes/product.route.js'
import cartRoutes from './routes/cart.route.js'
import couponRoutes from './routes/coupon.route.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cookieParser());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/coupons', couponRoutes);

app.listen(5000, () => {
    console.log('server is running on http://localhost:' + PORT);
    connectDB();
})


