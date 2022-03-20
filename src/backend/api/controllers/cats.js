const { Color, Type, Brand, Transmission } = require("../models/cats.js");

/**
 * Adds new car colors to the database
 * @param req request made by a user
 * @param res response sent by the server
 * @returns HTTP status code, errors
 */
exports.addColor = async (req, res) => {
  try {
    /**
     * In case a regular user wanted to add new cathegories
     */
    if (req.userData.userType == "user") {
      return res.status(403).json({ msg: "Forbidden" });
    }
    const { data } = req.body;

    if (typeof data != "string")
      return res.status(422).json({ msg: "Invalid input" });
    const newColor = new Color({
      name: data,
    });
    const result = await newColor.save();
    if (!result)
      return res.status(500).json({ msg: `Failed adding \"${data}\"` });

    return res.status(201).json({ msg: "Color/s added!" });
  } catch (err) {
    res.status(500).json({ err: err });
  }
};

/**
 * Adds new types of transmissions to the database
 * @param req request made by a user
 * @param res response sent by the server
 * @returns HTTP status code, errors
 */
exports.addTransmission = async (req, res) => {
  try {
    /**
     * In case a regular user wanted to add new cathegories
     */
    if (req.userData.userType == "user") {
      return res.status(403).json({ msg: "Forbidden" });
    }
    const { data } = req.body;

    if (typeof data != "string") return res.status(422);
    const newTransmission = new Transmission({
      name: data,
    });
    const result = await newTransmission.save();
    if (!result)
      return res.status(500).json({ msg: `Failed adding \"${data}\"` });

    return res.status(201).json({ msg: "Transmission/s added!" });
  } catch (err) {
    res.status(500).json({ err: err });
  }
};

/**
 * Adds new car types to the database
 * @param req request made by a user
 * @param res response sent by the server
 * @returns HTTP status code, errors
 */
exports.addType = async (req, res) => {
  try {
    /**
     * In case a regular user wanted to add new cathegories
     */
    if (req.userData.userType == "user") {
      return res.status(403).json({ msg: "Forbidden" });
    }
    const { data } = req.body;

    if (typeof data != "string") return res.status(422);
    const newType = new Type({
      name: data,
    });
    const result = await newType.save();
    if (!result)
      return res.status(500).json({ msg: `Failed adding \"${data}\"` });

    return res.status(201).json({ msg: "Type/s added!" });
  } catch (err) {
    res.status(500).json({ err: err });
  }
};

/**
 * Adds new car brands to the database
 * @param req request made by a user
 * @param res response sent by the server
 * @returns HTTP status code, errors
 */
exports.addBrand = async (req, res) => {
  try {
    /**
     * In case a regular user wanted to add new cathegories
     */
    if (req.userData.userType == "user") {
      return res.status(403).json({ msg: "Forbidden" });
    }
    const { data } = req.body;

    if (typeof data != "string") return res.status(422);
    const newBrand = new Brand({
      name: data,
    });
    const result = await newBrand.save();
    if (!result)
      return res.status(500).json({ msg: `Failed adding \"${data}\"` });

    return res.status(201).json({ msg: "Brand/s added!" });
  } catch (err) {
    res.status(500).json({ err: err });
  }
};

/**
 * Gets all cathegories
 * @param {*} req request made by user
 * @param {*} res response sent by server
 */
exports.getCats = async (req, res) => {
  try {
    const brands = await Brand.find().select("-__v");
    const transmissions = await Transmission.find().select("-__v");
    const colors = await Color.find().select("-__v");
    const types = await Type.find().select("-__v");
    res.status(200).json({
      cats: {
        brands: brands,
        transmissions: transmissions,
        colors: colors,
        types: types,
      },
      request: { type: "GET" },
    });
  } catch (err) {
    res.status(500).json({ err: err });
  }
};

/**
 * Deletes cathegory from the database
 * @param {*} req request made by user
 * @param {*} res response sent by server
 * @returns HTTP status code, errors
 */
exports.deleteCat = async (req, res) => {
  try {
    if (req.userData.userType != "admin") return res.status(403);
    const catId = req.params.id;
    const catType = req.body.catType;

    switch (catType) {
      case "brand":
        await Brand.findByIdAndDelete(catId).exec();
        await res.status(200).json({ msg: "Deleted successfully" });
        break;
      case "carType":
        await Type.findByIdAndDelete(catId).exec();
        await res.status(200).json({ msg: "Deleted successfully" });
        break;
      case "color":
        await Color.findByIdAndDelete(catId).exec();
        await res.status(200).json({ msg: "Deleted successfully" });
        break;
      case "transmission":
        await Transmission.findByIdAndDelete(catId).exec();
        await res.status(200).json({ msg: "Deleted successfully" });
        break;
    }
  } catch (err) {
    return res.status(500).json({ msg: err });
  }
};
