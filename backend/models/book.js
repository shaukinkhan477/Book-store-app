const mongoose = require("mongoose");
const { buffer } = require("sharp/lib/is");
const bookSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true,
    trim: true,
    default: "Unknown",
    lowercase: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
  },
  pages: {
    type: Number,
    required: true,
    min: 1,
  },

  year: {
    type: Number,
    required: true,
  },
  language: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  country: {
    type: String,
    required: true,
    minlength: 3,
    trim: true,
    lowercase: true,
  },
  link: {
    type: String,
    required: true,
  },
  image: {
    type: buffer,
  },
  category: {
    type: String,
    required: true,
    lowercase: true,
  },
});

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
