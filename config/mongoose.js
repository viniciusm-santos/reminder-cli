const debug = require("debug");
const mongoose = require("mongoose");
const config = require("config");

const log = debug("reminder-pusher:config:mongoose");

let isConnected = false;

async function connectDB() {
  if (isConnected) return;
  await mongoose.connect(config.get("mongo.uri"));
  isConnected = true;
}

async function disconnectDB() {
  if (isConnected) {
    await mongoose.disconnect();
    isConnected = false;
  }
}
module.exports = { connectDB, disconnectDB };
