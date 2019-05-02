import axios from "axios";

export default {
  // Gets all saved books
  getBooks: function() {
    return axios.get("/api/savedBooks");
  },
  // Gets the book with the given id
  getBook: function(id) {
    return axios.get("/api/savedBooks/" + id);
  },
  // Deletes the book with the given id
  deleteBook: function(id) {
    return axios.delete("/api/savedBooks/" + id);
  },
  // Saves a book to the database
  saveBook: function(bookData) {
    return axios.post("/api/savedBooks", bookData);
  },
  searchBook: function(titleSearch, authorSearch) {

    return axios.get(
      "https://www.googleapis.com/books/v1/volumes?q=" +
        titleSearch +
        "+inauthor:" +
        authorSearch +
        "&fields=items(id,volumeInfo/description,volumeInfo/title,volumeInfo/authors,volumeInfo/imageLinks/smallThumbnail,volumeInfo/canonicalVolumeLink)&maxResults=5"
    );
  }
};
