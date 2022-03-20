const express = require("express");

const router = express.Router();
const auth = require("../auth/auth");

const userController = require("../controllers/user.js");

/**
 * paths to the user
 */
router.post("/signup", userController.signUp);
router.post("/signin", userController.signIn);
router.delete("/:id", auth, userController.deleteUser);
router.get("/:username", userController.getUserByUsername);
router.get("/", userController.getUsers);
router.put("/:userId", auth, userController.updateUser);

module.exports = router;
