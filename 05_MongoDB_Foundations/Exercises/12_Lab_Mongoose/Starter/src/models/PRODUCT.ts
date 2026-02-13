import mongoose, { Schema, Document } from 'mongoose';

// TODO: Explain what a TypeScript interface is and why we use it with Mongoose
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

// TODO: Explain what a Mongoose Schema is and how it differs from the TypeScript interface
const productSchema = new Schema<IProduct>({
	// TODO: Explain what the 'required' validator does
	name: {
		type: String,
		required: [true, 'Product name is required'],
		// TODO: Explain what 'trim' does
		trim: true,
		// TODO: Explain what 'maxlength' validation does
		maxlength: [100, 'Product name cannot exceed 100 characters']
	},
	description: {
		type: String,
		required: [true, 'Description is required'],
		// TODO: Explain what 'minlength' validation does
		minlength: [10, 'Description must be at least 10 characters']
	},
	// TODO: Explain what the 'min' validator does for numbers
	price: {
		type: Number,
		required: true,
		min: [0, 'Price cannot be negative']
	},
	// TODO: Explain what a 'default' value does
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
	// TODO: Explain what it means for a field to be optional (not required)
	imageUrl: {
		type: String,
		required: false
	},
	// TODO: Explain what Date.now does as a default value
	createdAt: {
		type: Date,
		default: Date.now
	},
	updatedAt: {
		type: Date
	}
});

// TODO: Explain what mongoose.model() does and what collection name will be created
export const Product = mongoose.model<IProduct>('Product', productSchema);
