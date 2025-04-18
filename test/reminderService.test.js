import MakeReminderService from "../domain/usecases/ReminderService";

describe("Reminder Service", () => {
  let reminderService;
  let fakeRepository;

  beforeEach(() => {
    const reminders = [];

    fakeRepository = {
      create: jest.fn(async (data) => {
        const newReminder = { _id: String(reminders.length + 1), ...data };
        reminders.push(newReminder);
        return newReminder;
      }),
      list: jest.fn(async () => reminders),
      updateById: jest.fn(),
      deleteById: jest.fn(),
    };

    reminderService = new MakeReminderService(fakeRepository);
  });

  it("deve adicionar um lembrete com sucesso", async () => {
    const values = {
      title: "Estudar testes",
      description: "Cobrir service com jest",
    };

    const result = await reminderService.add(values);

    expect(result.title).toBe("Estudar testes");
    expect(fakeRepository.create).toHaveBeenCalled();
  });

  it("deve listar os lembretes cadastrados", async () => {
    await reminderService.add({ adicionar: "1", descricao: "teste 1" });
    await reminderService.add({ adicionar: "2", descricao: "teste 2" });

    const list = await reminderService.list();

    expect(Array.isArray(list)).toBe(true);
    expect(list.length).toBe(2);
    expect(fakeRepository.list).toHaveBeenCalled();
  });
});
