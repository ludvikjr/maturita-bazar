const express = require("express");
const router = express.Router();
const auth = require("../auth/auth");

const catController = require("../controllers/cats.js");

/**
 * paths to the cathegories
 */
router.post("/colors", auth, catController.addColor);
router.post("/brands", auth, catController.addBrand);
router.post("/transmissions", auth, catController.addTransmission);
router.post("/cartypes", auth, catController.addType);
router.get("/", catController.getCats);
router.delete("/:id", auth, catController.deleteCat);

module.exports = router;
