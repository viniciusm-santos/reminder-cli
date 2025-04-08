// import mongoose from "../config/mongoose.js";
// import schema from "../schema/Reminder.js";
const mongoose = require("../config/mongoose.js");
const schema = require("../schema/Reminder.js");
const model = mongoose.model("Reminder", schema);

const Reminder = {
  async list() {
    const query = {};
    const result = await model.find(query);
    mongoose.connection.close();
    return result;
    // return model.find(query);
  },
  byId(id) {
    return model.findOne({ _id: id });
  },
  create(data) {
    const reminder = new model(data);
    return reminder.save();
  },
  updateById(id, data) {
    return model.updateOne({ _id: id }, data);
  },
  deleteById(id) {
    return model.deleteOne({ _id: id });
  },
};

module.exports = Reminder;
