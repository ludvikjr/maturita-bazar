const express = require("express");
const router = express.Router();
const auth = require("../auth/auth");

const reviewController = require("../controllers/userReviews.js");

/**
 * paths to user reviews
 */
router.post("/", auth, reviewController.addReview);
router.get("/:username", reviewController.getUsersReviews);
router.delete("/:id", auth, reviewController.deleteReview);

module.exports = router;
