import debug from "debug";
import mongoose from "mongoose";
import config from "config";

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

export { connectDB, disconnectDB };
