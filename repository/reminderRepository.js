const model = require("../model/reminderModel.js");

const Reminder = {
  async list() {
    const query = {};
    return await model.find(query);
  },
  byId(id) {
    return model.findOne({ _id: id });
  },
  create(data) {
    const reminder = new model(data);
    return reminder.save();
  },
  async updateById(id, data) {
    return await model.updateOne({ _id: id }, data);
  },
  async deleteById(id) {
    return await model.deleteOne({ _id: id });
  },
};

module.exports = Reminder;
