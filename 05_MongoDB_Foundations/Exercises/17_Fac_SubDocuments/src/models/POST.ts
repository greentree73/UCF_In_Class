import mongoose, { Schema, Document } from 'mongoose';

// ======================
// SUBDOCUMENT SCHEMA
// ======================
// This schema defines the structure of comments that will be EMBEDDED within posts
// Comments are subdocuments - they don't have their own collection

export interface IComment extends Document {
	author: string;
	text: string;
	likes: number;
	createdAt: Date;
}

const commentSchema = new Schema<IComment>({
	author: {
		type: String,
		required: [true, 'Comment author is required'],
		trim: true,
		maxlength: [50, 'Author name cannot exceed 50 characters']
	},
	text: {
		type: String,
		required: [true, 'Comment text is required'],
		minlength: [1, 'Comment must have at least 1 character'],
		maxlength: [500, 'Comment cannot exceed 500 characters']
	},
	likes: {
		type: Number,
		default: 0,
		min: [0, 'Likes cannot be negative']
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});

// ======================
// PARENT DOCUMENT SCHEMA
// ======================
// The Post schema includes an array of comment subdocuments

export interface IPost extends Document {
	title: string;
	body: string;
	author: string;
	tags: string[];
	published: boolean;
	views: number;
	comments: IComment[];  // 🗂️ Array of subdocuments
	createdAt: Date;
	updatedAt?: Date;
}

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
	// 🗂️ SUBDOCUMENT ARRAY
	// Each post can have multiple comments stored directly within it
	comments: {
		type: [commentSchema],  // Array of comment subdocuments
		default: [],
		// Optional: Limit the number of comments to prevent document from growing too large
		validate: {
			validator: function(comments: IComment[]) {
				return comments.length <= 100;
			},
			message: 'A post cannot have more than 100 comments'
		}
	},
	createdAt: {
		type: Date,
		default: Date.now
	},
	updatedAt: {
		type: Date
	}
}, {
	// Schema options
	timestamps: true  // Automatically manage createdAt and updatedAt
});

// ======================
// MODEL
// ======================
export const Post = mongoose.model<IPost>('Post', postSchema);
