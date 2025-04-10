// const mongoose = require("../config/mongoose.js");
const mongoose = require("mongoose");

const { Schema } = mongoose;

const reminderSchema = new Schema({
  title: String,
  description: String,
  date: Date,
  done: Boolean,
});

module.exports = mongoose.model("Reminder", reminderSchema);
