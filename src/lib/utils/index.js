const { celebrate } = require("celebrate");
const winston = require("winston");

/**
 * Get pagination metadata
 * @param {object} pagination Pagination query
 * @param {number} count Total number of records returned
 * @param {number} total_records Total number of records in database
 * @returns Pagination metadata object
 */
function getPagination(pagination, count, total_records) {
  let { page = 1, limit = 10 } = pagination;

  const total_pages = Math.ceil(total_records / limit);
  const has_previous = Boolean(page - 1);
  const has_next = total_pages > page;

  let start = page;
  if (page > 1) start = limit * (page - 1) + 1;
  let end = start + limit - 1;
  if (start > total_records) start = total_records;
  if (end > total_records) end = total_records;

  return {
    page,
    limit,
    count,
    total_pages,
    total_records,
    has_previous,
    has_next,
    description: `${start} to ${end} of ${total_records}`,
  };
}

/**
 * Get response payload
 * @param {object} data
 * @param {string} message
 * @returns Response payload
 */
function success(res, data, message) {
  return { status: "success", message, data };
}

class AppError extends Error {
  /**
   * Define custom application error
   * @param {number} code HTTP status code
   * @param {string} message Error message
   */
  constructor(code, message) {
    super(message);
    this.code = code;
    this.status = code >= 400 && code < 500 ? "fail" : "error";
  }
}

const logger = winston.createLogger({
  transports: [
    ...(process.env.NODE_ENV !== "production"
      ? [new winston.transports.Console({ level: "http" })]
      : []),
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "info.log", level: "info" }),
    new winston.transports.File({ filename: "http.log", level: "http" }),
  ],
});

module.exports = { getPagination, success, AppError, logger };
