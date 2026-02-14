import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
	username: string;
	email: string;
	role: string;
}

const userSchema = new Schema<IUser>(
	{
		username: { type: String, required: true, trim: true },
		email: { type: String, required: true, trim: true, lowercase: true },
		role: { type: String, default: 'member' }
	},
	{ timestamps: true }
);

export const User = mongoose.model<IUser>('User', userSchema);
