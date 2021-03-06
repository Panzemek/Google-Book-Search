const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  bookID: { type: String, required: true },
  title: { type: String, required: true },
  authors: { type: Array, required: true },
  description: String,
  image: String,
  link: { type: String, required: true }
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
