const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const app = express();
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");

/**
 * paths to all the routers
 */
const reviewsRouter = require("./api/routes/userReviews.js");
const carRouter = require("./api/routes/cars.js");
const userRouter = require("./api/routes/user.js");
const indexRouter = require("./api/routes/index.js");
const catRouter = require("./api/routes/cats.js");

/**
 * CORS - cross origin resource sharing
 */
app.use(
  cors({
    credentials: true,
    origin: process.env.ORIGIN,
  })
);

/**
 * Middleware for data sanitization
 */
app.use(
  mongoSanitize({
    replaceWith: "_",
  })
);

/**
 * middleware for static files
 */
app.use(express.static("public/build"));
app.use(express.static("public/images"));
app.use(express.static("public"));

app.use(cookieParser());

/**
 * body parser
 */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/**
 * morgan - logger middleware
 */
app.use(morgan("dev"));

/**
 * router
 */
app.use("/api/cars", carRouter);
app.use("/api/users", userRouter);
app.use("/api/reviews", reviewsRouter);
app.use("/api/cats", catRouter);
app.use("*", indexRouter);

/**
 * connection to the database
 */
mongoose
  /**
   * process.env.* - environment variables, stored in .env file
   */
  .connect(process.env.DB_URI)
  .then(() => app.listen(process.env.PORT))
  .catch((err) => console.log(err));

/**
 * if page doesn't exist
 */
app.use((req, res) => {
  res.status(404).send("<h1>404 Not found</h1>");
});
