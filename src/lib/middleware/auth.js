const { AppError } = require("../utils");
const jsonwebtoken = require("jsonwebtoken");

/**
 * Authentication middleware
 * @param {import("express").Request} req HTTP request object
 * @param {import("express").Response} res HTTP response object
 * @param {import("express").NextFunction} next Next function
 */
function authenticate(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader ? authHeader.replace(/^Bearer\s?/, "") : null;
  if (!token) throw new AppError(401, "Authentication token is required");
  try {
    const user = jsonwebtoken.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (error) {
    throw new AppError(401, error.message);
  }
}

module.exports = authenticate;
