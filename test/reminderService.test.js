// __tests__/reminder.test.js
const reminderService = require("../domain/reminderService");
const repository = require("../repository/reminderRepository");

jest.mock("../repository/reminderRepository");

describe("reminderService.add", () => {
  it("should add a new reminder", async () => {
    const mockValues = {
      adicionar: "Estudar Node.js",
      descricao: "Focar em testes unitários",
    };

    const mockResult = { _id: "123", ...mockValues };

    repository.create.mockResolvedValue(mockResult);

    const result = await reminderService.add(mockValues);

    expect(repository.create).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "Estudar Node.js",
        description: "Focar em testes unitários",
        repeatIntervalMinutes: 60,
        random: true,
      })
    );

    expect(result).toEqual(mockResult);
  });
});

describe("reminderService.list", () => {
  it("should return all reminder", async () => {
    const mockReminders = [
      { _id: "1", title: "Estudar", description: "Node.js", done: false },
      { _id: "2", title: "Dormir", description: "", done: true },
    ];

    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    repository.list.mockResolvedValue(mockReminders);

    await reminderService.list();

    expect(repository.list).toHaveBeenCalled();

    expect(consoleSpy).toHaveBeenCalledWith("📋 Lista de Tarefas:");
    expect(consoleSpy).toHaveBeenCalledWith("◻ 1: Estudar - Node.js");
    expect(consoleSpy).toHaveBeenCalledWith("✓ 2: Dormir - ");

    consoleSpy.mockRestore();
  });
});
