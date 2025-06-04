const express = require("express");
const router = express.Router();
const checkToken = require("../middleware/checkToken");

const authController = require('../controllers/AuthController');
const authorizeAdmin = require("../middleware/authorizeAdmin");

router.get("/", checkToken, authController.getUserPosts);
router.post("/", checkToken, authController.createPost);
router.patch("/:id", checkToken, authorizeAdmin, authController.editPost);
router.delete("/:id", checkToken, authorizeAdmin, authController.deletePost);

module.exports = router;