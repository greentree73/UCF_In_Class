import mongoose, { Schema, Document } from 'mongoose';

export interface IReview extends Document {
	username: string;
	rating: number;
	comment: string;
	createdAt: Date;
}

const reviewSchema = new Schema<IReview>({
	username: {
		type: String,
		required: [true, 'Username is required'],
		trim: true,
		maxlength: [40, 'Username cannot exceed 40 characters']
	},
	rating: {
		type: Number,
		required: [true, 'Rating is required'],
		min: [1, 'Rating must be at least 1'],
		max: [5, 'Rating cannot exceed 5']
	},
	comment: {
		type: String,
		required: [true, 'Comment is required'],
		trim: true,
		maxlength: [500, 'Comment cannot exceed 500 characters']
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});

export interface IProduct extends Document {
	name: string;
	price: number;
	category: string;
	inStock: boolean;
	reviews: IReview[];
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
		},
		reviews: {
			type: [reviewSchema],
			default: []
		}
	},
	{
		timestamps: true
	}
);

export const Product = mongoose.model<IProduct>('Product', productSchema);
