const express = require("express");
const router = express.Router();
const checkToken = require("../middleware/checkToken");

const authController = require('../controllers/AuthController');

router.get("/", checkToken, authController.getUserPosts);
router.post("/", checkToken, authController.createPost);
router.patch("/:id", checkToken, authController.editPost);
router.delete("/:id", checkToken, authController.deletePost);

module.exports = router;