const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String },
  body: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  state: { type: String, enum: ["draft", "published"], default: "draft" },
  read_count: { type: Number, default: 0 },
  reading_time: { type: Number, default: 0 },
  tags: { type: [String] },
  timestamp: { type: Date, default: Date.now },
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
