const Review = require("../models/userReviews.js");
const User = require("../models/user.js");

/**
 * Adds new user review to the database
 * @param req request made the user
 * @param res response sent by the server
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
 * @param req request made the user
 * @param res response sent by the server
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
