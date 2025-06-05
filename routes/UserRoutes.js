const express = require("express");
const router = express.Router();
const checkToken = require('../middleware/checkToken');

const userController = require('../controllers/UserController');

router.post("/signup", userController.signUp);
router.post("/signin", userController.signIn);
router.post("/signout", userController.signOut);
router.get("/data", checkToken, userController.getData);


module.exports = router;