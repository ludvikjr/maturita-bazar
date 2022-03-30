const jwt = require("jsonwebtoken");

/**
 * Authenticates user
 * @param {*} req Request made by the user
 * @param {*} res Response sent by the server
 * @param {*} next
 */
module.exports = async (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;
    const data = await jwt.verify(accessToken, process.env.JWT_ACCESS_KEY);
    req.userData = data;
    next();
  } catch {
    try {
      // if token expires, server tries generating new access token using refresh token
      const refreshToken = req.cookies.refreshToken;
      const data = await jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY);
      const accessToken = await jwt.sign(
        {
          email: data.email,
          username: data.username,
          userType: data.userType,
        },
        process.env.JWT_ACCESS_KEY,
        { expiresIn: "3m", noTimestamp: true }
      );
      res.cookie("accessToken", accessToken);
      req.userData = data;
      next();
    } catch (err) {
      res.status(401).json({ msg: "Auth failed", err: err });
    }
  }
};
