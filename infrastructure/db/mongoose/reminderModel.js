import mongoose from "mongoose";

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

export default mongoose.model("Reminder", reminderSchema);
