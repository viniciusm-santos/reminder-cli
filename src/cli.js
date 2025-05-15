#!/usr/bin/env node
import { parseArgs } from "node:util";
import { connectDB, disconnectDB } from "../config/mongoose.js";
import Reminder from "./modules/reminders/models/Reminder.js";
import ReminderRepository from "./modules/reminders/repositories/ReminderRepository.js";
import ReminderService from "./modules/reminders/services/ReminderService.js";
import CliController from "./modules/reminders/controllers/CliController.js";

async function main() {
  const { values } = parseArgs({
    options: {
      adicionar: {
        type: "string",
        short: "a",
      },
      descricao: {
        type: "string",
        short: "d",
      },
      remover: {
        type: "string",
        short: "r",
      },
      concluir: {
        type: "string",
        short: "c",
      },
      listar: {
        type: "boolean",
        short: "l",
      },
      ajuda: {
        type: "boolean",
        short: "h",
      },
    },
    allowPositionals: true,
  });

  await connectDB();
  const repository = new ReminderRepository(Reminder);
  const service = new ReminderService(repository);
  const cliController = new CliController(service);

  try {
    if (values.ajuda) {
      mostrarAjuda();
    } else if (values.adicionar) {
      const reminder = await cliController.add(values);
      console.log(
        `✅ Tarefa adicionada (usando controller): ${reminder.title}`
      );
    } else if (values.remover) {
      await cliController.delete(values.remover);
      console.log(`🗑️ Lembrete removido`);
    } else if (values.concluir) {
      await cliController.finish(values.concluir);
      console.log(`🎉 Lembrete concluído`);
    } else if (values.listar) {
      const reminders = await cliController.list();
      reminders.forEach((r) => {
        console.log(
          `${r.done ? "✓" : "◻"} ${r._id}: ${r.title} - ${r.description || ""}`
        );
      });
    } else {
      mostrarAjuda();
    }
  } catch (error) {
    console.error("Erro durante execução:", err);
  } finally {
    disconnectDB();
    process.exit(0);
  }

  function mostrarAjuda() {
    console.log(`
Uso: reminder [comando]

Comandos disponíveis:
  -a, --adicionar <título>     Adiciona nova tarefa
      [-d, --descricao <descrição>]  
  -r, --remover <id>           Remove uma tarefa
  -c, --concluir <id>          Marca tarefa como concluída
  -l, --listar                 Lista todas as tarefas
  -h, --ajuda                  Mostra esta ajuda
`);
  }
}

main();
