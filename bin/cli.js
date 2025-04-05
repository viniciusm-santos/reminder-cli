const fs = require("fs");

const fileName = "./reminder.json";
const [, , command, ...args] = process.argv;

const generateId = () => {
  return Math.random().toString(36).substring(2, 9);
};

const add = () => {
  const newReminder = {
    id: generateId(),
    title: args[0],
    description: args[1],
    date: new Date().toISOString(),
  };

  let data = [];
  if (fs.existsSync(fileName)) {
    data = JSON.parse(fs.readFileSync(fileName, "utf-8"));
  }

  data.push(newReminder);

  fs.writeFileSync(fileName, JSON.stringify(data, null, 2));

  console.log(`Tarefa adicionada com ID: ${newReminder.id}`);
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

switch (command) {
  case "--add":
    add();
    break;
  case "--list":
    list();
    break;
  case "--remove":
    remove();
    break;
}
