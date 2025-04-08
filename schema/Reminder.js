const mongoose = require("../config/mongoose.js");
const { Schema } = mongoose;

const Reminder = new Schema({
  title: String,
  description: String,
  date: Date,
  done: Boolean,
});

module.exports = Reminder;
