import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
	name: string;
	price: number;
	category: string;
	inStock: boolean;
	priceWithTax: number;
	createdAt: Date;
	updatedAt?: Date;
}

const productSchema = new Schema<IProduct>(
	{
		name: {
			type: String,
			required: [true, 'Product name is required'],
			trim: true,
			maxlength: [120, 'Product name cannot exceed 120 characters']
		},
		price: {
			type: Number,
			required: [true, 'Price is required'],
			min: [0, 'Price cannot be negative']
		},
		category: {
			type: String,
			required: [true, 'Category is required'],
			trim: true
		},
		inStock: {
			type: Boolean,
			default: true
		}
	},
	{
		timestamps: true,
		toJSON: { virtuals: true },
		toObject: { virtuals: true }
	}
);

// TODO: Create one virtual named priceWithTax
// Requirements:
// - tax rate: 7%
// - return rounded to 2 decimals
// - calculate from this.price

export const Product = mongoose.model<IProduct>('Product', productSchema);
