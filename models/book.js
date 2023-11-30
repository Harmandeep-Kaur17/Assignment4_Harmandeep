
  const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  ISBN: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: false,
  },
  author: {
    type: String,
    required: false, // Make author optional
  },
  inventory: {
    type: Number,
    required: false, // Make inventory optional
  },
  category: {
    type: String,
    required: false, // Make category optional
  },
});

const BookModel = mongoose.model('Book', bookSchema);

module.exports = BookModel;
