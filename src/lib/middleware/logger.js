const { logger } = require("../utils");

/**
 * Application logger middleware
 * @param {import("express").Request} req HTTP request object
 * @param {import("express").Response} res HTTP response object
 * @param {*} next
 */
function appLogger(req, _, next) {
  const message = `${req.method} ${req.path}`;
  logger.http(message);
  next();
}

module.exports = appLogger;
