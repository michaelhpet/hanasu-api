const { success, AppError, generateToken } = require("../../lib/utils");
const userService = require("../user/service");

class AuthController {
  /**
   * Create a new user
   * @param {import("express").Request} req Request object
   * @param {import("express").Response} res Response object
   * @param {import("express").NextFunction} next Next function
   */
  async signup(req, res, next) {
    try {
      const payload = req.body;
      const user = await userService.createUser(payload);
      const token = generateToken(user.toObject());
      const response = success({ token, user }, "User created successfully");
      res.json(response);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Login a user
   * @param {import("express").Request} req Request object
   * @param {import("express").Response} res Response object
   * @param {import("express").NextFunction} next Next function
   */
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await userService.getUser(email, true);
      if (!user) throw new AppError(404, "User not found");
      if (!(await user.isPassword(password)))
        throw new AppError(401, "Password is not correct");
      const token = generateToken(user.toObject());
      const response = success({ token, user }, "Login successful");
      res.json(response);
    } catch (error) {
      next(error);
    }
  }
}

const authController = new AuthController();
module.exports = authController;
