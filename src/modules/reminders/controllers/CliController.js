class CliController {
  constructor(service) {
    this.service = service;
  }
  async add(data) {
    return await this.service.add({
      title: data.adicionar,
      description: data.descricao,
    });
  }

  async list() {
    return await this.service.list();
  }

  async finish(id) {
    await this.service.finishReminder(id);
  }

  async delete(id) {
    await this.service.remove(id);
  }
}

export default CliController;
