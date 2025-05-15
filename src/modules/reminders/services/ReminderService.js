class ReminderService {
  constructor(repository) {
    this.repository = repository;
  }
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

    return this.repository.create(data);
  }

  list() {
    return this.repository.list();
  }

  finishReminder(id) {
    return this.repository.updateById(id, { done: true });
  }

  remove(id) {
    return this.repository.deleteById(id);
  }
}

export default ReminderService;
