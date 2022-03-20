const mongoose = require('mongoose');
const { isEmail } = require('validator');
const Schema = mongoose.Schema;

/**
 * schema for a new user
 */
const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [isEmail, 'Invalid email'],
    },
    password: {
      type: String,
      required: true,
    },
    userType: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
    },
    about: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
