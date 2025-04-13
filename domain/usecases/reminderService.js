const reminderService = (repository) => {
  return {
    add({ title, description }) {
      const data = {
        title,
        description,
        date: new Date().toISOString(),
        repeatIntervalMinutes: 60,
        nextTriggerAt: 30,
        random: true,
        channels: ["whatsapp", "browser"],
      };

      return repository.create(data);
    },

    list() {
      return repository.list();
    },

    finishReminder(id) {
      return repository.updateById(id, { done: true });
    },

    remove(id) {
      return repository.deleteById(id);
    },
  };
};

module.exports = reminderService;
