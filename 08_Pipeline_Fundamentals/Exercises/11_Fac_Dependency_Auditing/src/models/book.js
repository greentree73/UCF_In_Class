const mongoose = require('mongoose');

// Mongoose schema used for validation in GraphQL mutation.
const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    author: {
      type: String,
      required: true,
      trim: true
    }
  },
  {
    versionKey: false
  }
);

module.exports = mongoose.models.Book || mongoose.model('Book', bookSchema);
