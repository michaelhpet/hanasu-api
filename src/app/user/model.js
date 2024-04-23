const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const Article = require("../article/model");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
});

userSchema.virtual("articles", {
  ref: "Article",
  localField: "_id",
  foreignField: "author",
});

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.pre("remove", async function (next) {
  await Article.deleteMany({ author: this._id });
  next();
});

const User = mongoose.model("User", userSchema);

User.prototype.isPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = User;
