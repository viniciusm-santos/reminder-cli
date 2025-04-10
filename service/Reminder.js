const repository = require("../repository/Reminder.js");

const Reminder = {
  async add(values) {
    const data = {
      title: values.adicionar,
      description: values.descricao,
      date: new Date().toISOString(),
    };

    await repository.create(data);

    console.log(`✅ Tarefa adicionada: ${values.descricao}`);
  },

  async list() {
    console.log("📋 Lista de Tarefas:");
    const reminders = await repository.list();
    reminders.forEach((r) => {
      console.log(
        `${r.done ? "✓" : "◻"} ${r._id}: ${r.title} - ${r.description}`
      );
    });
  },

  async finishReminder(values) {
    await repository.updateById(values.concluir, { done: true });
    console.log(`🎉 Tarefa concluída: ${values.concluir}`);
  },

  async remove(values) {
    await repository.deleteById(values.remover);
    console.log(`🗑️ Tarefa removida: ID ${values.remover}`);
  },
};

module.exports = Reminder;
