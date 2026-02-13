import mongoose, { Schema, Document } from 'mongoose';

// TypeScript interface for type safety
export interface IPost extends Document {
	title: string;
	body: string;
	author: string;
	tags: string[];
	published: boolean;
	views: number;
	createdAt: Date;
	updatedAt?: Date;
}

// Mongoose schema with validation rules
const postSchema = new Schema<IPost>({
	title: {
		type: String,
		required: [true, 'Title is required'],
		trim: true,
		maxlength: [200, 'Title cannot exceed 200 characters']
	},
	body: {
		type: String,
		required: [true, 'Body is required'],
		minlength: [10, 'Body must be at least 10 characters']
	},
	author: {
		type: String,
		required: true,
		default: 'Anonymous'
	},
	tags: {
		type: [String],
		default: []
	},
	published: {
		type: Boolean,
		default: false
	},
	views: {
		type: Number,
		default: 0,
		min: [0, 'Views cannot be negative']
	},
	createdAt: {
		type: Date,
		default: Date.now
	},
	updatedAt: {
		type: Date
	}
});

// Create and export the Post model
export const Post = mongoose.model<IPost>('Post', postSchema);
