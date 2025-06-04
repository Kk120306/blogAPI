const express = require("express");
const router = express.Router();

const userController = require('../controllers/UserController');

router.post("/signup", userController.signUp);
router.post("/signin", userController.signIn);
router.post("/signout", userController.signOut);


module.exports = router;