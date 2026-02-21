import { model, Schema } from 'mongoose';

interface GreetingInput {
  name: string;
  message: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const greetingSchema = new Schema<GreetingInput>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 80,
    },
    message: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
  },
  { timestamps: true }
);

const Greeting = model<GreetingInput>('Greeting', greetingSchema);

export default Greeting;
