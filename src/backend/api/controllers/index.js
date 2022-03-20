const path = require("path");

/**
 * what user gets initially upon landing on the page
 * @param req - request made by the user
 * @param res - response sent by the server
 */
exports.getIndex = (req, res) => {
  res.sendFile(path.join(__dirname, "/../../public/build/index.html"));
};
