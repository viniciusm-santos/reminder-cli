#!/usr/bin/env node
import { parseArgs } from "node:util";
import { connectDB, disconnectDB } from "../config/mongoose.js";
import reminderModel from "../infrastructure/db/mongoose/reminderModel.js";
import reminderRepository from "../infrastructure/db/mongoose/reminderRepository.js";
import ReminderService from "../domain/usecases/ReminderService.js";
import WhatsappNotificationStrategy from "../domain/strategies/concrete/WhatsappNotificationStrategy.js";
import NotificationUseCase from "../domain/usecases/NotificationUseCase.js";

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

  const whatsappNotificationStrategy = new WhatsappNotificationStrategy();
  const notificatioUseCase = new NotificationUseCase(
    whatsappNotificationStrategy
  );
  notificatioUseCase.execute();

  await connectDB();
  const service = new ReminderService(reminderRepository(reminderModel));

  try {
    if (values.ajuda) {
      mostrarAjuda();
    } else if (values.adicionar) {
      const result = await service.add({
        title: values.adicionar,
        description: values.descricao,
      });
      console.log(`✅ Tarefa adicionada: ${result.title}`);
    } else if (values.remover) {
      await service.remove(values.remover);
      console.log(`🗑️ Tarefa removida: ID ${values.remover}`);
    } else if (values.concluir) {
      await service.finishReminder(values.concluir);
      console.log(`🎉 Tarefa concluída: ${values.concluir}`);
    } else if (values.listar) {
      console.log("📋 Lista de Tarefas:");
      const result = await service.list();
      result.forEach((r) => {
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
