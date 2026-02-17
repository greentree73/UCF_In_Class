import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
}, { timestamps: true });

const QuestionSchema = new mongoose.Schema({
  title: String,
  body: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

const AnswerSchema = new mongoose.Schema({
  body: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
}, { timestamps: true });

export const User = mongoose.model('User', UserSchema);
export const Question = mongoose.model('Question', QuestionSchema);
export const Answer = mongoose.model('Answer', AnswerSchema);
