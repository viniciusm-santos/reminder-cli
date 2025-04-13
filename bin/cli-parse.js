#!/usr/bin/env node
const { parseArgs } = require("node:util");
const { connectDB, disconnectDB } = require("../config/mongoose.js");
const reminderService = require("../service/reminderService.js");

async function main() {
  const { values, positionals } = parseArgs({
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

  try {
    await connectDB();

    if (values.ajuda) {
      mostrarAjuda();
    } else if (values.adicionar) {
      await reminderService.add(values);
    } else if (values.remover) {
      await reminderService.remove(values);
    } else if (values.concluir) {
      await reminderService.finishReminder(values);
    } else if (values.listar) {
      await reminderService.list();
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
