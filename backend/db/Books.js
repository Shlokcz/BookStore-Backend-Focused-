const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  year: Number,
  createTime: String,
  updateTime: String
});

module.exports = mongoose.model("books", bookSchema);