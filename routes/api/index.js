const router = require("express").Router();
const bookRoutes = require("./savedBooks");

// Book routes
router.use("/savedBooks", bookRoutes);

module.exports = router;
