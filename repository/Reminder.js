const mongoose = require("../config/mongoose.js");
const schema = require("../schema/Reminder.js");
const model = mongoose.model("Reminder", schema);

const Reminder = {
  async list() {
    const query = {};
    const result = await model.find(query);
    mongoose.connection.close();
    return result;
  },
  byId(id) {
    return model.findOne({ _id: id });
  },
  create(data) {
    const reminder = new model(data);
    return reminder.save();
  },
  async updateById(id, data) {
    const result = await model.updateOne({ _id: id }, data);
    mongoose.connection.close();
    return result;
  },
  async deleteById(id) {
    const result = await model.deleteOne({ _id: id });
    mongoose.connection.close();
    return result;
  },
};

module.exports = Reminder;
