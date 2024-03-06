import inquirer from 'inquirer';

async function main() {
  const answer = await inquirer.prompt({
    type: "list",
    name: "option",
    message: "Selecciona una gestión de transacciones:",
    choices: ["Listar Transacciones", "Listar Stock", "Añadir Transacción", "Eliminar Transacción", "Volver"],
  });
  console.log(answer.name);

}



main();