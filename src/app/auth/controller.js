const { success } = require("../../lib/utils");

class AuthController {
  /**
   * Create a new user
   * @param {import("express").Request} req Request object
   * @param {import("express").Response} res Response object
   */
  signup(req, res) {
    const response = success({ user: null }, "User created successfully");
    res.json(response);
  }

  /**
   * Login a user
   * @param {import("express").Request} req Request object
   * @param {import("express").Response} res Response object
   */
  login(req, res) {
    const response = success({ user: null }, "Login successful");
    res.json(response);
  }
}

const authController = new AuthController();
module.exports = authController;
