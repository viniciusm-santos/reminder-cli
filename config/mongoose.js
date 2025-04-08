const debug = require("debug");
const mongoose = require("mongoose");
const config = require("config");

const log = debug("reminder-pusher:config:mongoose");

mongoose.connect(config.get("mongo.uri"));
mongoose.connection.on("error", (err) => log("mongodb err", err));

module.exports = mongoose;
