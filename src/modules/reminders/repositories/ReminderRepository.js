class ReminderRepository {
  constructor(model) {
    this.model = model;
  }
  async list() {
    const query = {};
    return await this.model.find(query);
  }
  byId(id) {
    return this.model.findOne({ _id: id });
  }
  create(data) {
    const reminder = new this.model(data);
    return reminder.save();
  }
  async updateById(id, data) {
    return await this.model.updateOne({ _id: id }, data);
  }
  async deleteById(id) {
    return await this.model.deleteOne({ _id: id });
  }
}

export default ReminderRepository;
