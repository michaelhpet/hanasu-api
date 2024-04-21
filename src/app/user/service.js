const { AppError } = require("../../lib/utils");
const User = require("./model");

class UserService {
  async createUser(payload) {
    if (await User.findOne({ email: payload.email }))
      throw new AppError(400, "User already exists");
    const user = await User.create(payload);
    return user;
  }

  async getUser(email, withPassword = false) {
    if (withPassword)
      return await User.findOne({ email }).select("+password").exec();
    return await User.findOne({ email });
  }
}

const userService = new UserService();
module.exports = userService;
