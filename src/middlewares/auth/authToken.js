const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = async function authMiddleware(req, res, next) {
  const token = req.headers.authorization;
  let { role } = jwt.verify(token, config.jwtsecret);
  if (role === "user") {
    throw new Error("Недостаточно прав");
  } else {
    next();
  }
};
