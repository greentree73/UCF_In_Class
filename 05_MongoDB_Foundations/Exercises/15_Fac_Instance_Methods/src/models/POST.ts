import mongoose, { Schema, Document } from 'mongoose';

// TypeScript interface for type safety
// Must declare instance methods in the interface
export interface IPost extends Document {
	title: string;
	body: string;
	author: string;
	tags: string[];
	published: boolean;
	views: number;
	createdAt: Date;
	updatedAt?: Date;
	// Instance method declarations
	incrementViews(): Promise<IPost>;
	getExcerpt(length?: number): string;
	publish(): Promise<IPost>;
	addTag(tag: string): Promise<IPost>;
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

// ========================================
// INSTANCE METHODS
// ========================================
// Instance methods are called on individual documents
// Access using: post.methodName()

// Increment the view count for this post
postSchema.methods.incrementViews = async function(): Promise<IPost> {
	this.views += 1;
	return await this.save();
};

// Get an excerpt (shortened version) of the post body
postSchema.methods.getExcerpt = function(length: number = 50): string {
	if (this.body.length <= length) {
		return this.body;
	}
	return this.body.substring(0, length) + '...';
};

// Mark this post as published
postSchema.methods.publish = async function(): Promise<IPost> {
	this.published = true;
	this.updatedAt = new Date();
	return await this.save();
};

// Add a tag to this post (if it doesn't already exist)
postSchema.methods.addTag = async function(tag: string): Promise<IPost> {
	if (!this.tags.includes(tag)) {
		this.tags.push(tag);
		return await this.save();
	}
	return this;
};

// Create and export the Post model
export const Post = mongoose.model<IPost>('Post', postSchema);
