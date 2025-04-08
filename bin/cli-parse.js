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
  const { adicionar, descricao } = values;
  const newReminder = {
    // id: generateId(),
    title: adicionar,
    description: descricao,
    date: new Date().toISOString(),
  };

  //   let data = [];
  //   if (fs.existsSync(fileName)) {
  //     data = JSON.parse(fs.readFileSync(fileName, "utf-8"));
  //   }

  //   data.push(newReminder);

  //   fs.writeFileSync(fileName, JSON.stringify(data, null, 2));

  await repository.create(newReminder);

  console.log(`Tarefa adicionada com ID: ${newReminder.id}`);
  process.exit();
};

const list = () => {
  if (fs.existsSync(fileName)) {
    const data = fs.readFileSync(fileName, "utf-8");
    console.log(data);
  } else {
    console.log("Nenhuma tarefa registrada");
  }
};

const remove = () => {
  const id = args[0];
  if (fs.existsSync(fileName) && id) {
    let data = JSON.parse(fs.readFileSync(fileName, "utf-8"));
    let newData = data.filter((reminder) => reminder.id != id);

    fs.writeFileSync(fileName, JSON.stringify(newData, null, 2));
  }
};

let tarefas = [
  { id: 1, descricao: "Estudar Node.js", concluida: false },
  { id: 2, descricao: "Fazer exercícios", concluida: true },
];

if (values.ajuda) {
  mostrarAjuda();
} else if (values.adicionar) {
  const novaTarefa = {
    id: tarefas.length + 1,
    descricao: values.adicionar,
    concluida: false,
  };
  tarefas.push(novaTarefa);
  console.log(`✅ Tarefa adicionada: ${novaTarefa.descricao}`);
  add();
} else if (values.remover) {
  const id = parseInt(values.remover);
  tarefas = tarefas.filter((t) => t.id !== id);
  console.log(`🗑️ Tarefa removida: ID ${id}`);
} else if (values.concluir) {
  const id = parseInt(values.concluir);
  const tarefa = tarefas.find((t) => t.id === id);
  if (tarefa) {
    tarefa.concluida = true;
    console.log(`🎉 Tarefa concluída: ${tarefa.descricao}`);
  }
} else if (values.listar) {
  console.log("📋 Lista de Tarefas:");
  tarefas.forEach((t) => {
    console.log(`${t.concluida ? "✓" : "◻"} ${t.id}: ${t.descricao}`);
  });

  repository.list().then((result) => console.log(result));
  //   process.exit();
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
