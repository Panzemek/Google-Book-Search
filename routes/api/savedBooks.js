const router = require("express").Router();
const booksController = require("../../controllers/booksController");

// Matches with "/api/savedBooks"
router.route("/")
  .get(booksController.findAll)
  .post(booksController.create);

// Matches with "/api/savedBooks/:id"
router
  .route("/:bookID")
  .get(booksController.findById)
  .put(booksController.update)
  .delete(booksController.remove);

module.exports = router;
