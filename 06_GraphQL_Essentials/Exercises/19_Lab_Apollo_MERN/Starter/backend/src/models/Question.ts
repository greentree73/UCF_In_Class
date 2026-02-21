import { model, Schema } from 'mongoose';

export interface QuestionInput {
  title: string;
  body: string;
  author: string;
  tags: string[];
  votes: number;
  createdAt?: Date;
}

const questionSchema = new Schema<QuestionInput>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },
    body: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    tags: {
      type: [String],
      default: [],
      validate: {
        validator: function (tags: string[]) {
          return tags.length <= 5;
        },
        message: 'A question can have at most 5 tags',
      },
    },
    votes: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

questionSchema.virtual('age').get(function () {
  return this.createdAt ? Date.now() - new Date(this.createdAt).getTime() : 0;
});

questionSchema.index({ title: 'text', body: 'text' });
questionSchema.index({ createdAt: -1 });
questionSchema.index({ votes: -1 });

const Question = model<QuestionInput>('Question', questionSchema);

export default Question;