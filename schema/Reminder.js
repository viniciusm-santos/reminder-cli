const mongoose = require("../config/mongoose.js");
const { Schema } = mongoose;

const Reminder = new Schema({
  title: String,
  description: String,
  data: Date,
});

module.exports = Reminder;
