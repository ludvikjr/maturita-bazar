const Review = require("../models/userReviews.js");
const User = require("../models/user.js");

/**
 * Checks if person didn't already make a review on this particular user
 * @param req - request made by the user
 * @param validatedReview - review that's being validated
 */
const checkValidity = (req, validatedReview) => {
  const reviews = this.getUsersReviews(req);
  reviews.map((review) => {
    if (
      review.to == validatedReview.toUserId &&
      review.from == validatedReview.fromUserId
    )
      return false;
    return true;
  });
};

/**
 * Adds new user review to the database
 * @param req - request made the user
 * @param res - response sent by the server
 * @returns HTTP status code, errors
 */
exports.addReview = async (req, res) => {
  try {
    const username = req.userData.username;
    const review = new Review({
      positive: req.body.positive,
      from: username,
      to: req.body.to,
      description: req.body.description,
    });
    const result1 = await Review.find({ to: req.body.to, from: username })
      .select("-__v")
      .exec();
    const result2 = await User.find({ username: username })
      .select("username")
      .exec();
    if (result1.length > 0) {
      return res
        .status(403)
        .json({ msg: "One review allowed per user", code: 1 });
    } else if (result2.length === 0) {
      return res
        .status(403)
        .json({ msg: "You cannot review yourself", code: 2 });
    }
    const result3 = await review.save();
    if (result3) {
      return res.status(201).json({
        message: "Review posted",
        request: {
          type: "POST",
        },
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: err });
  }
};

/**
 * Gets user's reviews
 * @param req - request made the user
 * @param res - response sent by the server
 * @returns user's reviews
 */
exports.getUsersReviews = async (req, res) => {
  try {
    const username = req.params.username;
    const reviews = await Review.find({ to: username }).select("-__v").exec();
    const response = {
      reviews: reviews,
      method: {
        type: "GET",
      },
    };
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

/**
 * Deletes review from the database
 * @param req - request made the user
 * @param res - response sent by the server
 * @returns HTTP status code, errors
 */
exports.deleteReview = async (req, res) => {
  try {
    const username = req.userData.username;
    const id = req.params.id;
    const result = await Review.deleteOne({ from: username, __id: id }).exec();
    if (result) {
      return res.status(200).json({
        message: "Review deleted",
        request: {
          type: "DELETE",
        },
      });
    }
    return res.status(404).json({ msg: "Not found" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: err });
  }
};
