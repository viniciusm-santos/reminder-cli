// const mongoose = require("../config/mongoose.js");
const mongoose = require("mongoose");

const { Schema } = mongoose;

const reminderSchema = new Schema({
  title: String,
  description: String,
  date: Date,
  done: Boolean,
  repeatQuantity: Number,
  repeatIntervalMinutes: Number,
  nextTriggerAt: Number,
  random: Boolean,
  channels: [String],
});

module.exports = mongoose.model("Reminder", reminderSchema);
