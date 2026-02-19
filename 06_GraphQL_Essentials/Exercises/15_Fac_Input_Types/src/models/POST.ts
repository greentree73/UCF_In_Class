import mongoose, { Schema, Document } from 'mongoose';

export interface IPost extends Document {
  postId: string;
  title: string;
  content: string;
  author: string;
  views: number;
  published: boolean;
  createdAt: Date;
  tags: string[];
  category: string;
}

const PostSchema: Schema = new Schema({
  postId: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  views: {
    type: Number,
    default: 0
  },
  published: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  tags: {
    type: [String],
    default: []
  },
  category: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

export const Post = mongoose.model<IPost>('Post', PostSchema);