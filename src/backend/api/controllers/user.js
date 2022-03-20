const User = require("../models/user.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

/**
 * User signup
 * @param req - request made the user
 * @param res - response sent by the server
 * @returns HTTP status code, errors
 */
exports.signUp = async (req, res) => {
  try {
    const user = await User.find({ email: req.body.email }).exec();
    if (user.length >= 1)
      return res.status(422).json({ msg: "Email already in use!" });
    await bcrypt.hash(req.body.password, 10, async (err, hash) => {
      if (err)
        return res.status(500).json({ msg: "Oops, something went wrong.." });
      const user = new User({
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        userType: "user",
        password: hash,
        about: null,
      });
      const result = await user.save();
      if (result) {
        return res.status(201).json({
          message: "User created!",
          request: {
            type: "POST",
          },
        });
      }
    });
  } catch (err) {
    res.status(500).json({ err: err });
  }
};

/**
 * User login
 * @param req - request made the user
 * @param res - response sent by the server
 * @returns JWT access and refresh token
 */
exports.signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.find({ email: email })
      .select("-__v -createdAt -updatedAt")
      .exec();
    if (user.length < 1) return res.status(403).json({ msg: "Auth failed" });
    bcrypt.compare(password, user[0].password, (err, result) => {
      if (err) return res.status(403).json({ err: err });
      if (result) {
        const accessToken = jwt.sign(
          {
            email: user[0].email,
            username: user[0].username,
            userType: user[0].userType,
          },
          process.env.JWT_ACCESS_KEY + "",
          { expiresIn: "3m", noTimestamp: true }
        );
        const refreshToken = jwt.sign(
          {
            email: user[0].email,
            username: user[0].username,
            userType: user[0].userType,
          },
          process.env.JWT_REFRESH_KEY,
          { expiresIn: "2h", noTimestamp: true }
        );
        res.cookie("accessToken", accessToken, {
          httpOnly: true,
        });
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
        });

        return res.status(200).json({
          msg: "Auth successful",
          user: user[0],
          request: {
            type: "POST",
          },
        });
      }
      res.status(403).json({ msg: "Auth failed" });
    });
  } catch (err) {
    res.status(500).json({ err: err });
  }
};

/**
 * Updates user in the database
 * @param req - request made the user
 * @param res - response sent by the server
 * @returns HTTP status code, errors
 */
exports.updateUser = async (req, res) => {
  try {
    /**
     * userData = data extracted from JWT token
     */
    const id = req.params.userId;
    const user = await User.findById(id);
    if (
      req.userData.username != user.username &&
      !(req.userData.userType === "admin" || user.userType === "admin")
    ) {
      return res.status(403);
    }
    const updates = req.body;
    await User.findByIdAndUpdate(id, updates).exec();
    res.status(200).json({
      message: "User updated",
      request: {
        type: "PUT",
      },
    });
  } catch (err) {
    res.status(500).json({
      err: err,
    });
  }
};

/**
 * Deletes user from the database
 * @param req - request made the user
 * @param res - response sent by the server
 * @returns HTTP status code, errors
 */
exports.deleteUser = async (req, res) => {
  try {
    /**
     * userData = data extracted from JWT token
     */
    const username = req.userData.username;
    const user = await User.findOne({ username: username }).exec();
    if (
      (user.username != username &&
        !(
          req.userData.userType === "admin" ||
          req.userData.userType === "superadmin"
        )) ||
      user.userType === "superadmin" ||
      (user.userType === "admin" && req.userData.userType === "admin")
    ) {
      return res.status(403);
    }

    const result = await User.findByIdAndDelete(req.params.id).exec();
    if (result) {
      return res
        .status(200)
        .json({ msg: "User deleted", request: { type: "DELETE" } });
    }
    return res.status(404).json({ msg: "User not found" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err: err });
  }
};

/**
 * grabs a user from the database
 * @param req - request made by the user
 * @param res - response sent by the server
 * @returns user info
 */
exports.getUserByUsername = async (req, res) => {
  try {
    const username = req.params.username;
    const user = await User.find({ username: username })
      .select("-password -createdAt -updatedAt -__v")
      .exec();
    if (user) {
      res.status(200).json({
        user: user,
        request: {
          type: "GET",
        },
      });
    }
  } catch (err) {
    return res.status(500).json({ err: err });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password -__v").exec();
    if (users) {
      res.status(200).json({
        users: users,
        request: {
          type: "GET",
        },
      });
    }
  } catch (err) {
    res.status(500).json({ err: err });
  }
};
