const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * schema for a new car
 */
const carSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    cost: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    manufactured: {
      type: Number,
      required: true,
    },
    owner: {
      type: String,
      required: true,
    },
    mileage: {
      type: Number,
      required: true,
    },
    consumption: {
      type: Number,
      required: true,
    },
    power: {
      type: Number,
      required: true,
    },
    transmission: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    imagePath: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Car = mongoose.model("Car", carSchema);

module.exports = Car;
