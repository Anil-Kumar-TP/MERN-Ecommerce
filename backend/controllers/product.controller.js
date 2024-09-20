import cloudinary from "../lib/cloudinary.js";
import { redis } from "../lib/redis.js";
import Product from "../models/product.model.js"

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.json({ products });
    } catch (error) {
        console.log('error in getAllProducts controller', error.message);
        res.status(500).json({ message: 'server error', error: error.message });
    }
}

export const getFeaturedProducts = async (req, res) => {
    try {
        let featuredProducts = await redis.get("featured_products");
        if (featuredProducts) {
            return res.json(JSON.parse(featuredProducts));
        }

        //if the featured products are not in redis,check in mongodb
        // .lean() returns a plain JS object instead of mongodb document.
        featuredProducts = await Product.find({ isFeatured: true }).lean();

        if (!featuredProducts) {
            return res.status(404).json({ message: 'No featured products found' });
        }

        //if found in mongodb,store it in redis for quick access.
        await redis.set("featured_products", JSON.stringify(featuredProducts));
        res.json(featuredProducts);
    } catch (error) {
        console.log('error in getFeaturedProducts controller', error.message);
        res.status(500).json({ message: 'server error', error: error.message });
    }
}


export const createProduct = async (req, res) => {
    try {
        const { name, description, price, image, category } = req.body;
        let cloudinaryResponse = null;
        if (image) {
            cloudinaryResponse = await cloudinary.uploader(image, { folder: "products" });
        }
        const product = await Product.create({
            name,
            description,
            price,
            image: cloudinaryResponse?.secure_url ? cloudinaryResponse.secure_url : "",
            category
        });
        res.status(201).json(product);
    } catch (error) {
        console.log('error in createProduct controller', error.message);
        res.status(500).json({ message: 'server error', error: error.message });
    }
}

//delete image from db as well as from cloudinary.
export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'product not found' });
        }
        if (product.image) {
            const publicId = product.image.split("/").pop().split(".")[0];
            try {
                await cloudinary.uploader.destroy(`products/${publicId}`);
                console.log('Image deleted from cloudinary');
            } catch (error) {
                console.log('error deleting image from cloudinary',error);
            }
        }
        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: 'product deleted successfully' });
    } catch (error) {
        console.log('error in deleteProduct controller', error.message);
        res.status(500).json({ message: 'server error', error: error.message });
    }
}


export const getRecommendedProducts = async (req, res) => {
    try {
        const products = await Product.aggregate([
            {
                $sample: { size: 3 }
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    description: 1,
                    image: 1,
                    price: 1
                }
            }
        ]);
        res.json(products);
    } catch (error) {
        console.log('error in getRecommendedProducts controller', error.message);
        res.status(500).json({ message: 'server error', error: error.message });
    }
}


