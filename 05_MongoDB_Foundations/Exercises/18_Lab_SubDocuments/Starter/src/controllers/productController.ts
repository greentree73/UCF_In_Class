import { Request, Response } from 'express';
import { Product } from '../models';

export const createProduct = async (req: Request, res: Response): Promise<void> => {
	try {
		const product = new Product({
			name: req.body.name,
			price: req.body.price,
			category: req.body.category,
			inStock: req.body.inStock,
			reviews: req.body.reviews || []
		});

		const savedProduct = await product.save();

		res.status(201).json({
			message: 'Product created successfully',
			product: savedProduct,
			reviewCount: savedProduct.reviews.length
		});
	} catch (error: any) {
		res.status(500).json({ message: 'Error creating product', error: error.message });
	}
};

export const getAllProducts = async (req: Request, res: Response): Promise<void> => {
	try {
		const products = await Product.find();
		res.json({ count: products.length, products });
	} catch (error: any) {
		res.status(500).json({ message: 'Error fetching products', error: error.message });
	}
};

export const getProductById = async (req: Request, res: Response): Promise<void> => {
	try {
		const product = await Product.findById(req.params.id);

		if (!product) {
			res.status(404).json({ message: 'Product not found' });
			return;
		}

		res.json({ product, reviewCount: product.reviews.length });
	} catch (error: any) {
		res.status(500).json({ message: 'Error fetching product', error: error.message });
	}
};

export const getReviews = async (req: Request, res: Response): Promise<void> => {
	try {
		const product = await Product.findById(req.params.id);

		if (!product) {
			res.status(404).json({ message: 'Product not found' });
			return;
		}

		res.json({
			productId: product._id,
			productName: product.name,
			reviewCount: product.reviews.length,
			reviews: product.reviews
		});
	} catch (error: any) {
		res.status(500).json({ message: 'Error fetching reviews', error: error.message });
	}
};

export const addReview = async (req: Request, res: Response): Promise<void> => {
	res.status(501).json({
		message: 'TODO: Implement addReview controller in this lab',
		hint: 'Find product by id, push review subdocument, save, return 201 response'
	});
};

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
	try {
		const deletedProduct = await Product.findByIdAndDelete(req.params.id);

		if (!deletedProduct) {
			res.status(404).json({ message: 'Product not found' });
			return;
		}

		res.json({
			message: 'Product and embedded reviews deleted successfully',
			deletedProduct
		});
	} catch (error: any) {
		res.status(500).json({ message: 'Error deleting product', error: error.message });
	}
};
