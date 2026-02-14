import mongoose, { Document, Schema } from 'mongoose';

export interface IPost extends Document {
	title: string;
	body: string;
	author: string;
	tags: string[];
	published: boolean;
	createdAt: Date;
	updatedAt?: Date;
	readingTimeMinutes: number;
	titleWithAuthor: string;
}

const postSchema = new Schema<IPost>(
	{
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
		}
	},
	{
		timestamps: true,
		toJSON: { virtuals: true },
		toObject: { virtuals: true }
	}
);

postSchema.virtual('readingTimeMinutes').get(function (this: IPost) {
	const wordCount = this.body.trim().split(/\s+/).length;
	const wordsPerMinute = 200;
	return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
});

postSchema.virtual('titleWithAuthor').get(function (this: IPost) {
	return `${this.title} — by ${this.author}`;
});

export const Post = mongoose.model<IPost>('Post', postSchema);
