const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * schemas for new cathegories
 */

const colorSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const typeSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const brandSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const transmissionSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const Transmission = mongoose.model("Transmission", transmissionSchema);
const Color = mongoose.model("Color", colorSchema);
const Type = mongoose.model("Type", typeSchema);
const Brand = mongoose.model("Brand", brandSchema);

module.exports = { Transmission, Color, Type, Brand };
