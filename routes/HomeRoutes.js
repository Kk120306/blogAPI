const express = require("express");
const router = express.Router();

const homeController = require('../controllers/HomeController');

router.get("/blog", homeController.getAllBlog);
router.get("/blog/:id", homeController.getBlogById);
router.get("/blog/:id/comments", homeController.getBlogComments);
router.post("/blog/:id/comments", homeController.createBlogComment);

module.exports = router;