#!/usr/bin/env node
const { parseArgs } = require("node:util");
const fs = require("fs");
const repository = require("../repository/Reminder.js");

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
const fileName = "./reminder.json";

const generateId = () => {
  return Math.random().toString(36).substring(2, 9);
};

const add = async () => {
  const data = {
    title: values.adicionar,
    description: values.descricao,
    date: new Date().toISOString(),
  };

  await repository.create(data);

  console.log(`✅ Tarefa adicionada: ${values.descricao}`);
};

const list = async () => {
  console.log("📋 Lista de Tarefas:");
  const reminders = await repository.list();
  reminders.forEach((r) => {
    console.log(
      `${r.done ? "✓" : "◻"} ${r._id}: ${r.title} - ${r.description}`
    );
  });
};

const finishReminder = async () => {
  const result = await repository.updateById(values.concluir, { done: true });
  console.log(`🎉 Tarefa concluída: ${result.title}`);
};

const remove = async () => {
  const result = await repository.deleteById(values.remover);
  console.log(`🗑️ Tarefa removida: ID ${values.remover}`);
};

let tarefas = [
  { id: 1, descricao: "Estudar Node.js", concluida: false },
  { id: 2, descricao: "Fazer exercícios", concluida: true },
];

if (values.ajuda) {
  mostrarAjuda();
} else if (values.adicionar) {
  add();
} else if (values.remover) {
  remove();
} else if (values.concluir) {
  finishReminder();
} else if (values.listar) {
  list();
} else {
  mostrarAjuda();
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
