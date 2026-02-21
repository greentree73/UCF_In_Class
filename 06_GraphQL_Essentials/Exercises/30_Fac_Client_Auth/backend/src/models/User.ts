import { model, Schema } from 'mongoose';

interface UserDoc {
  username: string;
  email: string;
  password: string;
}

const userSchema = new Schema<UserDoc>(
  {
    username: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const User = model<UserDoc>('User', userSchema);

export default User;
