const mongoose = require("mongoose");
const { MongooseFindByReference } = require("mongoose-find-by-reference");

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true, index: true },
  description: { type: String },
  body: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", index: true },
  state: { type: String, enum: ["draft", "published"], default: "draft" },
  read_count: { type: Number, default: 0 },
  reading_time: { type: Number, default: 0 },
  tags: { type: [String], index: true },
  timestamp: { type: Date, default: Date.now },
});

articleSchema.plugin(MongooseFindByReference);

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
