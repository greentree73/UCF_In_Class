import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IComment {
	text: string;
	user: Types.ObjectId;
	createdAt: Date;
}

export interface IPost extends Document {
	title: string;
	body: string;
	author: Types.ObjectId;
	comments: IComment[];
	published: boolean;
	createdAt: Date;
	updatedAt?: Date;
}

const commentSchema = new Schema<IComment>({
	text: { type: String, required: true, trim: true },
	user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	createdAt: { type: Date, default: Date.now }
});

const postSchema = new Schema<IPost>(
	{
		title: { type: String, required: true, trim: true },
		body: { type: String, required: true },
		author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
		comments: { type: [commentSchema], default: [] },
		published: { type: Boolean, default: false }
	},
	{ timestamps: true }
);

export const Post = mongoose.model<IPost>('Post', postSchema);
