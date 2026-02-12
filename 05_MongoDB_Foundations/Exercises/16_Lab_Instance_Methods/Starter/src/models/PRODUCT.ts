import mongoose, { Schema, Document } from 'mongoose';

// TypeScript interface for type safety
// Instance methods must be declared in the interface
export interface IProduct extends Document {
	name: string;
	description: string;
	price: number;
	category: string;
	inStock: boolean;
	quantity: number;
	imageUrl?: string;
	createdAt: Date;
	updatedAt?: Date;
	// Instance method declarations
	applyDiscount(percentage: number): Promise<IProduct>;
	isLowStock(): boolean;
	restock(amount: number): Promise<IProduct>;
}

// Mongoose schema with validation rules
const productSchema = new Schema<IProduct>({
	name: {
		type: String,
		required: [true, 'Product name is required'],
		trim: true,
		maxlength: [100, 'Product name cannot exceed 100 characters']
	},
	description: {
		type: String,
		required: [true, 'Description is required'],
		minlength: [10, 'Description must be at least 10 characters']
	},
	price: {
		type: Number,
		required: true,
		min: [0, 'Price cannot be negative']
	},
	category: {
		type: String,
		required: true,
		default: 'General'
	},
	inStock: {
		type: Boolean,
		default: true
	},
	quantity: {
		type: Number,
		default: 0,
		min: [0, 'Quantity cannot be negative']
	},
	imageUrl: {
		type: String,
		required: false
	},
	createdAt: {
		type: Date,
		default: Date.now
	},
	updatedAt: {
		type: Date
	}
});

// ========================================
// TODO: IMPLEMENT INSTANCE METHODS
// ========================================

// TODO 1: Implement applyDiscount() method
// This should reduce the product's price by the given percentage
// Steps:
// 1. Calculate the discount amount: price * (percentage / 100)
// 2. Subtract discount from current price
// 3. Update the updatedAt timestamp
// 4. Save and return the updated product
// Hint: Use 'this' to access the document's properties
productSchema.methods.applyDiscount = async function(percentage: number): Promise<IProduct> {
	// YOUR CODE HERE
};

// TODO 2: Implement isLowStock() method
// This should return true if quantity is less than 10, false otherwise
// Steps:
// 1. Check if this.quantity < 10
// 2. Return the boolean result
// Hint: This is a synchronous method (no async/await needed)
productSchema.methods.isLowStock = function(): boolean {
	// YOUR CODE HERE
};

// TODO 3: Implement restock() method
// This should add the specified amount to the current quantity
// Steps:
// 1. Add the amount to this.quantity
// 2. Set inStock to true
// 3. Update the updatedAt timestamp
// 4. Save and return the updated product
// Hint: Don't forget to save the document!
productSchema.methods.restock = async function(amount: number): Promise<IProduct> {
	// YOUR CODE HERE
};

// Create and export the Product model
export const Product = mongoose.model<IProduct>('Product', productSchema);
