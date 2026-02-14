import { Request, Response } from 'express';
import { Product } from '../models';

export const createProduct = async (req: Request, res: Response): Promise<void> => {
	try {
		const product = new Product({
			name: req.body.name,
			price: req.body.price,
			category: req.body.category,
			inStock: req.body.inStock
		});

		const savedProduct = await product.save();
		res.status(201).json({ message: 'Product created', product: savedProduct });
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

		res.json({ product });
	} catch (error: any) {
		res.status(500).json({ message: 'Error fetching product', error: error.message });
	}
};

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
	try {
		const deletedProduct = await Product.findByIdAndDelete(req.params.id);

		if (!deletedProduct) {
			res.status(404).json({ message: 'Product not found' });
			return;
		}

		res.json({ message: 'Product deleted successfully', deletedProduct });
	} catch (error: any) {
		res.status(500).json({ message: 'Error deleting product', error: error.message });
	}
};
