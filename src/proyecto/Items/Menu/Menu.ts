/**
 * Universidad de La Laguna
 * Asignatura: Desarrollo de Sistemas Informáticos
 * Séptima práctica de la asignatura DSI
 * Realizada por: 
 *  > Antonio Ramos Castilla (alu0101480367@ull.edu.es)
 *  > Ithaisa Morales Arbelo (alu0101482194@ull.edu.es)
 *  > Omar Suárez Doro (alu0101483474@ull.edu.es)
 */

import inquirer from 'inquirer';
import * as ReadlineSync from 'readline-sync';
import { sortStrategy } from '../../Interfaces/Interfaces.js';
import { BaseDeDatos } from '../../BaseDeDatos/BaseDeDatos.js';
import { Mueble } from '../Muebles/Mueble.js';
import { OrdenarAlfabeticamente } from '../../BaseDeDatos/OrdenarAlfabeticamente.js';
import { OrdenarPorPrecio } from '../../BaseDeDatos/OrdenarPorPrecio.js';
import { OrdenarPorId } from '../../BaseDeDatos/OrdenarPorId.js';

const bbdd = new BaseDeDatos();
 
/**
 * Función que muestra el menú de generación de informes.
 */
async function generarInformes() {
  const answer = await inquirer.prompt({
    type: "list",
    name: "option",
    message: "Seleccione el tipo de informe:",
    choices: ["Stock de una categoría de muebles", "históricos de ventas", "Volver"],
  });

  switch (answer.option) {
    case "Stock de una categoría de muebles":
      console.log("Generando informe de stock...");
      break;
    case "históricos de ventas":
      console.log("Generando informe de ventas...");
      break;
    case "Volver":
      console.log("Volviendo al menú principal...");
      main();
      break;
    default:
      console.log("Opción no válida. Por favor, selecciona una opción válida.");
  }

}

/**
 * Función que muestra el menú de gestión de ventas y devoluciones.
 */
async function menuVentasTransacciones() {
  const answer = await inquirer.prompt({
    type: "list",
    name: "option",
    message: "Seleccione el tipo de transacción:",
    choices: ["Añadir", "Borrar", "Volver"],
  });

  switch (answer.option) {
    case "Añadir":
      console.log("Añadiendo venta...");
      break;
    case "Borrar":
      console.log("Borrando venta...");
      break;
    case "Volver":
      console.log("Volviendo al menú principal...");
      main();
      break;
    default:
      console.log("Opción no válida. Por favor, selecciona una opción válida.");
  }
}

/**
 * Función que muestra el menú de gestión de transacciones.
 */
async function menuTransacciones() {
  const answer = await inquirer.prompt({
    type: "list",
    name: "option",
    message: "Seleccione el tipo de transacción:",
    choices: ["Venta", "Devolución", "Volver"],
  });

  switch (answer.option) {
    case "Ventas":
      console.log("Realizando venta...");
      menuVentasTransacciones();
      break;
    case "Devoluciones":
      console.log("Realizando devolución...");
      menuVentasTransacciones();
      break;
    case "Volver":
      console.log("Volviendo al menú principal...");
      main();
      break;
    default:
      console.log("Opción no válida. Por favor, selecciona una opción válida.");
  
  }

}

/**
 * Función que muestra el menú de búsqueda de muebles.
 */
async function menuBusquedaMuebles() {
  const answer = await inquirer.prompt({
    type: "list",
    name: "option",
    message: "¿Cómo desea buscar?",
    choices: ["Por nombre", "Por tipo", "Por descripción", "Volver"],
  });
  switch (answer.option) {
    case "Por nombre":
      // se podrá mostrar ordenada alfabéticamente y por precio, tanto ascendente como descendente
      const nombre : string = ReadlineSync.question("Introduzca el nombre del mueble: ");
      const opcion : estrategiaOrdenacion = parseInt(ReadlineSync.question("Introduzca la estrategia de ordenación: \n 1: Alfabéticamente \n 2: Por precio \n 3: Por id \n 👉 "));
      const descendente : boolean = ReadlineSync.keyInYNStrict("¿Desea ordenar de forma descendente?:");
      console.log(bbdd.buscarMueble({nombre: nombre, ordenDesc : descendente}, returnStrat(opcion)));
      break;
    case "Por tipo":
      // se podrá mostrar ordenada alfabéticamente y por precio, tanto ascendente como descendente
      console.log("Buscando...");
      break;
    case "Por descripción":
      // se podrá mostrar ordenada alfabéticamente y por precio, tanto ascendente como descendente
      console.log("Buscando...");
      break;
    case "Volver":
      console.log("Volviendo al menú principal...");
      main();
      break;
    default:
      console.log("Opción no válida. Por favor, selecciona una opción válida.");
  }
}

/**
 * Función que muestra el menú de búsqueda de clientes y proveedores.
 */
async function menuBusquedaClientesyProveedores() {
  const answer = await inquirer.prompt({
    type: "list",
    name: "option",
    message: "¿Cómo desea buscar?",
    choices: ["Por nombre y apellido", "Por número de contacto", "Por dirección", "Volver"],
  });
  switch (answer.option) {
    case "Por nombre y apellido":
      console.log("Buscando...");
      break;
    case "Por número de contacto":
      console.log("Buscando...");
      break;
    case "Por dirección":
      console.log("Buscando...");
      break;
    case "Volver":
      console.log("Volviendo al menú principal...");
      main();
      break;
    default:
      console.log("Opción no válida. Por favor, selecciona una opción válida.");
  }
}

/**
 * Función que muestra el menú de gestión de muebles.
 */
async function menuMuebles() {
  const answer = await inquirer.prompt({
    type: "list",
    name: "option",
    message: "Seleccione la operación desdeada:",
    choices: ["Listar Muebles", "Añadir Mueble", "Eliminar Mueble", "Editar Mueble", "Buscar Mueble", "Volver"],
  });

  switch (answer.option) {
    case "Listar Muebles":
      console.log("Listando muebles...");
      break;
    case "Añadir Mueble":
      console.log("Añadiendo mueble...");
      break;
    case "Eliminar Mueble":
      console.log("Eliminando mueble...");
      break;
    case "Editar Mueble":
      console.log("Editando mueble...");
      break;
    case "Buscar Mueble":
      menuBusquedaMuebles();
      break;
    case "Volver":
      console.log("Volviendo al menú principal...");
      main();
      break;
    default:
      console.log("Opción no válida. Por favor, selecciona una opción válida.");
  
  }
}

/**
 * Función que muestra el menú de gestión de clientes.
 */
async function menuClientes() {
  const answer = await inquirer.prompt({
    type: "list",
    name: "option",
    message: "Seleccione la operación desdeada:",
    choices: ["Listar Clientes", "Añadir Cliente", "Eliminar Cliente", "Editar Cliente", "Buscar Cliente", "Volver"],
  });

  switch (answer.option) {
    case "Listar Clientes":
      console.log("Listando clientes...");
      break;
    case "Añadir Cliente":
      console.log("Añadiendo cliente...");
      break;
    case "Eliminar Cliente":
      console.log("Eliminando cliente...");
      break;
    case "Editar Cliente":
      console.log("Editando cliente...");
      break;
    case "Buscar Cliente":
      menuBusquedaClientesyProveedores();
      break;
    case "Volver":
      console.log("Volviendo al menú principal...");
      main();
      break;
    default:
      console.log("Opción no válida. Por favor, selecciona una opción válida.");
  
  }
}

/**
 * Función que muestra el menú de gestión de proveedores.
 */
async function menuProveedores() {
  const answer = await inquirer.prompt({
    type: "list",
    name: "option",
    message: "Seleccione la operación desdeada:",
    choices: ["Listar Proveedores", "Añadir Proveedor", "Eliminar Proveedor", "Editar Proveedor", "Buscar Proveedor", "Volver"],
  });

  switch (answer.option) {
    case "Listar Proveedores":
      console.log("Listando proveedores...");
      break;
    case "Añadir Proveedor":
      console.log("Añadiendo proveedor...");
      break;
    case "Eliminar Proveedor":
      console.log("Eliminando proveedor...");
      break;
    case "Editar Proveedor":
      console.log("Editando proveedor...");
      break;
    case "Buscar Proveedor":
      menuBusquedaClientesyProveedores();
      break;
    case "Volver":
      console.log("Volviendo al menú principal...");
      main();
      break;
    default:
      console.log("Opción no válida. Por favor, selecciona una opción válida.");
  
  }
}

/**
 * Función que muestra el menú de gestión de stock.
 */
async function menuStock() {
  const answer = await inquirer.prompt({
    type: "list",
    name: "option",
    message: "Seleccione la operación desdeada:",
    choices: ["Listar unidades disponibles", "Transacciones", "Generar informes", "Volver"],
  });

  switch (answer.option) {
    case "Listar unidades disponibles":
      console.log(" stock...");
      break;
    case "Transacciones":
      menuTransacciones();
      console.log(" stock...");
      break;
    case "Generar informes":
      generarInformes();
      console.log("Infomes stock...");
      break;
    case "Volver":
      console.log("Volviendo al menú principal...");
      main();
      break;
    default:
      console.log("Opción no válida. Por favor, selecciona una opción válida.");
  
  }
}


/**
 * Función que muestra el menú de gestión de transacciones.
 */
async function main() {
  const answer = await inquirer.prompt({
    type: "list",
    name: "option",
    message: "¿Sobre qué quiere realizar una operación?",
    choices: ["Muebles", "Clientes", "Proveedores", "Stock", "Volver"],
  });
  console.log("acabo de pasar por aquí");
  switch (answer.option) {
    case "Muebles":
      menuMuebles();
      break;
    case "Clientes":
      menuClientes();
      break;
    case "Proveedores":
      menuProveedores();
      break;
    case "Stock":
      menuStock();
      break;
    case "Volver":
     console.log("Saliendo del menú...");
      return;
    default:
      console.log("Opción no válida. Por favor, selecciona una opción válida.");
  }
}

function returnStrat(p : estrategiaOrdenacion) : sortStrategy<Mueble> {
  let strat : sortStrategy<Mueble>;
  switch (p) {
    case estrategiaOrdenacion.ALFABETICAMENTE:
      strat = new OrdenarAlfabeticamente();
      break;
    case estrategiaOrdenacion.PRECIO:
      strat = new OrdenarPorPrecio();
      break;
    case estrategiaOrdenacion.ID:
      strat = new OrdenarPorId();
      break;
    default:
      strat = new OrdenarAlfabeticamente();
      break;
  }  
  return strat;
}

enum estrategiaOrdenacion {
  ALFABETICAMENTE,
  PRECIO,
  ID
}
/**
 * Llamada a la función principal que muestra el menú principal.
 */
main();