const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * schema for a new review
 */
const reviewSchema = new Schema(
  {
    // false - negative | true - positive
    positive: {
      type: Boolean,
      required: true,
    },
    // user sending review
    from: {
      type: String,
      required: true,
    },
    // reviewed user
    to: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
