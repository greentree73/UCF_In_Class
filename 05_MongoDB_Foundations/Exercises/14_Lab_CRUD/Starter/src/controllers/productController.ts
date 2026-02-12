import { Request, Response } from 'express';
import { Product } from '../models';

// ============================================
// CREATE - Add a new product
// ============================================

export const createProduct = async (req: Request, res: Response): Promise<void> => {
	try {
		const product = new Product({
			name: req.body.name,
			description: req.body.description,
			price: req.body.price,
			category: req.body.category,
			inStock: req.body.inStock,
			quantity: req.body.quantity,
			imageUrl: req.body.imageUrl
		});

		const savedProduct = await product.save();
		
		res.status(201).json({ 
			message: 'Product created successfully',
			product: savedProduct 
		});
	} catch (err: any) {
		res.status(400).json({ 
			message: 'Error creating product',
			error: err.message 
		});
	}
};

// ============================================
// READ - Get all products
// ============================================

export const getAllProducts = async (req: Request, res: Response): Promise<void> => {
	try {
		const products = await Product.find();
		
		res.json({ 
			count: products.length,
			products 
		});
	} catch (err: any) {
		res.status(500).json({ 
			message: 'Error fetching products',
			error: err.message 
		});
	}
};

// ============================================
// READ - Get product by ID
// ============================================

export const getProductById = async (req: Request, res: Response): Promise<void> => {
	try {
		const product = await Product.findById(req.params.id);
		
		if (!product) {
			res.status(404).json({ message: 'Product not found' });
			return;
		}
		
		res.json({ product });
	} catch (err: any) {
		res.status(400).json({ 
			message: 'Invalid product ID',
			error: err.message 
		});
	}
};

// ============================================
// UPDATE - Update a product by ID
// ============================================

export const updateProduct = async (req: Request, res: Response): Promise<void> => {
	try {
		const product = await Product.findByIdAndUpdate(
			req.params.id,
			{ 
				...req.body,
				updatedAt: Date.now()
			},
			{ 
				new: true,           // Return the updated document
				runValidators: true  // Run schema validation
			}
		);
		
		if (!product) {
			res.status(404).json({ message: 'Product not found' });
			return;
		}
		
		res.json({ 
			message: 'Product updated successfully',
			product 
		});
	} catch (err: any) {
		res.status(400).json({ 
			message: 'Error updating product',
			error: err.message 
		});
	}
};

// ============================================
// TODO: UPDATE - Update product by category
// ============================================
// INSTRUCTIONS:
// - Find the FIRST product that matches the category from req.params.category
// - Update its name using req.body.name
// - Set the updatedAt field to the current time
// - Return the UPDATED document (not the original)
// - Run validators on the update
// - Handle the case where no product is found (return 404)
// - Handle any errors (return 400)

export const updateProductByCategory = async (req: Request, res: Response): Promise<void> => {
	try {
		// TODO: Implement this controller function
		// Use Product.findOneAndUpdate() to:
		// 1. Find the first product where category matches req.params.category
		// 2. Update the name to req.body.name
		// 3. Set updatedAt to Date.now()
		// 4. Return the updated document (use { new: true })
		// 5. Run validators (use { runValidators: true })
		
		// TODO: Check if product was found, if not return 404
		
		// TODO: Return success response with updated product
		
		res.status(501).json({ message: 'Not implemented yet - complete this TODO!' });
	} catch (err: any) {
		res.status(400).json({ 
			message: 'Error updating product by category',
			error: err.message 
		});
	}
};

// ============================================
// DELETE - Remove a product
// ============================================

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
	try {
		const product = await Product.findByIdAndDelete(req.params.id);
		
		if (!product) {
			res.status(404).json({ message: 'Product not found' });
			return;
		}
		
		res.json({ 
			message: 'Product deleted successfully',
			product 
		});
	} catch (err: any) {
		res.status(400).json({ 
			message: 'Error deleting product',
			error: err.message 
		});
	}
};

// ============================================
// QUERY - Get in-stock products
// ============================================

export const getInStockProducts = async (req: Request, res: Response): Promise<void> => {
	try {
		const products = await Product.find({ inStock: true })
			.sort({ createdAt: -1 })
			.limit(10);
		
		res.json({ 
			count: products.length,
			products 
		});
	} catch (err: any) {
		res.status(500).json({ 
			message: 'Error fetching in-stock products',
			error: err.message 
		});
	}
};

// ============================================
// QUERY - Get products by category
// ============================================

export const getProductsByCategory = async (req: Request, res: Response): Promise<void> => {
	try {
		const products = await Product.find({ 
			category: req.params.category 
		});
		
		res.json({ 
			category: req.params.category,
			count: products.length,
			products 
		});
	} catch (err: any) {
		res.status(500).json({ 
			message: 'Error fetching products by category',
			error: err.message 
		});
	}
};
