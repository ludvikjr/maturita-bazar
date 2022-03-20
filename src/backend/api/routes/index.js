const express = require("express");
const router = express.Router();

const indexController = require("../controllers/index.js");

/**
 * wherever user lands, he gets "index.html" as a response
 */
router.get("/", indexController.getIndex);
router.get("/profile/:username", indexController.getIndex);
router.get("/sell", indexController.getIndex);
router.get("/about", indexController.getIndex);
router.get("/signup", indexController.getIndex);
router.get("/signin", indexController.getIndex);

module.exports = router;
