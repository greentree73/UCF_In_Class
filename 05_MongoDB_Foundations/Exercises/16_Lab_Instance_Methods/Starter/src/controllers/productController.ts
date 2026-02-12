import { Request, Response } from 'express';
import { Product } from '../models';

// Create a new product
export const createProduct = async (req: Request, res: Response): Promise<void> => {
	try {
		const product = new Product(req.body);
		await product.save();
		res.status(201).json({ message: 'Product created successfully', product });
	} catch (err: any) {
		res.status(400).json({ message: 'Error creating product', error: err.message });
	}
};

// Get all products
export const getAllProducts = async (req: Request, res: Response): Promise<void> => {
	try {
		const products = await Product.find();
		res.json({ count: products.length, products });
	} catch (err: any) {
		res.status(400).json({ message: 'Error fetching products', error: err.message });
	}
};

// Get a single product by ID
export const getProductById = async (req: Request, res: Response): Promise<void> => {
	try {
		const product = await Product.findById(req.params.id);
		
		if (!product) {
			res.status(404).json({ message: 'Product not found' });
			return;
		}
		
		res.json({ product });
	} catch (err: any) {
		res.status(400).json({ message: 'Error fetching product', error: err.message });
	}
};

// ========================================
// CONTROLLERS USING INSTANCE METHODS
// ========================================

// Apply a discount to a product
export const applyDiscountToProduct = async (req: Request, res: Response): Promise<void> => {
	try {
		const product = await Product.findById(req.params.id);
		
		if (!product) {
			res.status(404).json({ message: 'Product not found' });
			return;
		}
		
		const { percentage } = req.body;
		
		if (!percentage || percentage <= 0 || percentage > 100) {
			res.status(400).json({ message: 'Percentage must be between 1 and 100' });
			return;
		}
		
		const originalPrice = product.price;
		
		// Call instance method
		await product.applyDiscount(percentage);
		
		res.json({ 
			message: `${percentage}% discount applied successfully`,
			originalPrice,
			newPrice: product.price,
			discount: originalPrice - product.price,
			product 
		});
	} catch (err: any) {
		res.status(400).json({ message: 'Error applying discount', error: err.message });
	}
};

// Check if product is low on stock
export const checkLowStock = async (req: Request, res: Response): Promise<void> => {
	try {
		const product = await Product.findById(req.params.id);
		
		if (!product) {
			res.status(404).json({ message: 'Product not found' });
			return;
		}
		
		// Call instance method
		const lowStock = product.isLowStock();
		
		res.json({ 
			product: product.name,
			quantity: product.quantity,
			isLowStock: lowStock,
			message: lowStock 
				? `⚠️ Warning: Only ${product.quantity} units remaining!`
				: `✅ Stock level is adequate (${product.quantity} units)`
		});
	} catch (err: any) {
		res.status(400).json({ message: 'Error checking stock', error: err.message });
	}
};

// Restock a product
export const restockProduct = async (req: Request, res: Response): Promise<void> => {
	try {
		const product = await Product.findById(req.params.id);
		
		if (!product) {
			res.status(404).json({ message: 'Product not found' });
			return;
		}
		
		const { amount } = req.body;
		
		if (!amount || amount <= 0) {
			res.status(400).json({ message: 'Amount must be a positive number' });
			return;
		}
		
		const oldQuantity = product.quantity;
		
		// Call instance method
		await product.restock(amount);
		
		res.json({ 
			message: 'Product restocked successfully',
			previousQuantity: oldQuantity,
			newQuantity: product.quantity,
			added: amount,
			product 
		});
	} catch (err: any) {
		res.status(400).json({ message: 'Error restocking product', error: err.message });
	}
};

// Delete a product
export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
	try {
		const product = await Product.findByIdAndDelete(req.params.id);
		
		if (!product) {
			res.status(404).json({ message: 'Product not found' });
			return;
		}
		
		res.json({ message: 'Product deleted successfully' });
	} catch (err: any) {
		res.status(400).json({ message: 'Error deleting product', error: err.message });
	}
};
