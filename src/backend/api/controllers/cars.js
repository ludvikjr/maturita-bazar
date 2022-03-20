const Car = require("../models/cars.js");
const User = require("../models/user.js");
require("dotenv").config();

/**
 * Adds a new Car to the database
 * @param req - request made by a user
 * @param res - response made by the server
 * @returns HTTP status code, errors
 */
exports.addCar = async (req, res) => {
  try {
    const username = req.userData.username;
    const car = new Car({
      name: req.body.name,
      cost: req.body.cost,
      type: req.body.carType,
      brand: req.body.brand,
      model: req.body.model,
      color: req.body.color,
      manufactured: req.body.manufactured,
      owner: username,
      mileage: req.body.mileage,
      consumption: req.body.consumption,
      power: req.body.power,
      transmission: req.body.transmission,
      description: req.body.description,
      imagePath: `/images/${req.filename}`,
    });
    const result = await car.save();
    if (result) {
      return res.status(201).json({
        message: "Car created",
        request: {
          type: "POST",
        },
      });
    }
    return res.status(404).json({ msg: "Not found" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: err });
  }
};

/**
 * Gets 5 cars from the database
 * @param req - request made by a user
 * @param res - response made by the server
 * @returns first 5 cars in the db
 */
exports.getCars = async (req, res) => {
  try {
    const cars = await Car.find()
      .select("-__v")
      .skip(5 * parseInt(req.body.page))
      .limit(req.body.limit)
      .exec();
    if (cars) {
      const response = {
        cars: cars.map((car) => {
          return {
            car,
          };
        }),
        request: {
          type: "GET",
        },
      };
      return res.status(200).json(response);
    }
    return res.status(404).json({ msg: "Not found" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

exports.getFilteredCars = async (req, res) => {
  try {
    const { name, brand, model, minCost, maxCost } = req.body;
    const cars = await Car.find({
      name: { $regex: name, $options: "i" },
      brand: { $regex: brand, $options: "i" },
      model: { $regex: model, $options: "i" },
      cost: { $gte: minCost, $lte: maxCost },
    })
      .select("-__v")
      .exec();
    if (cars) {
      const response = {
        cars: cars.map((car) => {
          return {
            car,
          };
        }),
        request: {
          type: "GET",
        },
      };
      return res.status(200).json(response);
    }
    return res.status(404).json({ msg: "Not found" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

/**
 * Gets car by its id
 * @param req - request made by a user
 * @param res - response made by the server
 * @returns car
 */
exports.getCarById = async (req, res) => {
  try {
    const id = req.params.id;
    const car = await Car.findById(id).select("-__v").exec();
    if (car) {
      res.status(200).json({
        car: car,
        request: {
          type: "GET",
        },
      });
      return;
    }
    res.status(404).json({
      message: "Not found",
    });
  } catch (err) {
    res.status(500).json({ error: err });
    console.log(err);
  }
};

/**
 * Updates car in the database
 * @param req - request made by a user
 * @param res - response made by the server
 * @returns HTTP status code, errors
 */
exports.updateCar = async (req, res) => {
  try {
    const id = req.params.id;
    const updates = req.body;

    const car = await Car.findById(id).exec();

    if (
      car.owner != req.userData.username &&
      !(req.userData.userType === "admin")
    ) {
      return res.status(403);
    }

    await Car.findByIdAndUpdate(id, updates).exec();
    res.status(200).json({
      message: "Car updated",
      request: {
        type: "PUT",
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      err: err,
    });
  }
};

/**
 * Removes a Car from the database
 * @param req - request made by a user
 * @param res - response made by the server
 * @returns HTTP status code, errors
 */
exports.deleteCar = async (req, res) => {
  try {
    const id = req.params.id;

    const car = await Car.findById(id).exec();
    if (
      car.owner != req.userData.username &&
      !(req.userData.userType === "admin")
    ) {
      return res.status(403);
    }

    await Car.findByIdAndDelete(id).exec();
    res.status(200).json({
      message: "Car deleted",
      request: {
        type: "DELETE",
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: err });
  }
};
