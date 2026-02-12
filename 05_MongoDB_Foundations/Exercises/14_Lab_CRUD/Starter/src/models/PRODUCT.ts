import mongoose, { Schema, Document } from 'mongoose';

// TypeScript interface for type safety
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

// Create and export the Product model
export const Product = mongoose.model<IProduct>('Product', productSchema);
