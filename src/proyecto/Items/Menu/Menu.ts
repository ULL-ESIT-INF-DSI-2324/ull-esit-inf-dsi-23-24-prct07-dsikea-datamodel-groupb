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
import { BaseDeDatos, Categoria } from '../../BaseDeDatos/BaseDeDatos.js';
import { Mueble, Dimension } from '../Muebles/Mueble.js';
import { Silla } from '../Muebles/Silla.js';
import { Mesa } from '../Muebles/Mesa.js';
import { Armario } from '../Muebles/Armario.js';
import { OrdenarAlfabeticamente } from '../../BaseDeDatos/OrdenarAlfabeticamente.js';
import { OrdenarPorPrecio } from '../../BaseDeDatos/OrdenarPorPrecio.js';
import { OrdenarPorId } from '../../BaseDeDatos/OrdenarPorId.js';
import { Stock } from '../Stock/Stock.js';
import { Cliente } from '../Personas/Cliente.js';
import { Proveedor } from '../Personas/Proveedor.js';
import { Devolucion } from '../Transacciones/Devolucion.js';
import { Venta } from '../Transacciones/Venta.js';
import {writeFile} from 'fs'
const gestor: Stock = Stock.getStock();
const bbdd: BaseDeDatos = new BaseDeDatos(gestor);

function ConvertirMapaAString<T,U>(mapa: Map<T, U>): string {
  let resultadoString = "";
  mapa.forEach((cantidad, nombre) => {
    resultadoString += `${nombre}: ${cantidad}\n`;
  });
  return resultadoString;
}
/**
 * Función que muestra el menú de generación de informes.
 */
async function generarInformes() {
  const answer = await inquirer.prompt({
    type: "list",
    name: "option",
    message: "Seleccione el tipo de informe:",
    choices: ["Stock de una categoría de muebles","Stock de un mueble en concreto", "Stock de los 5 muebles más vendidos", "Información sobre clientes",  "Información sobre proveedores","Histórico de Ventas", "Volver"],
  });

  switch (answer.option) {
    case "Stock de una categoría de muebles":
      console.log("A continuación, se le pedirá que introduzca el tipo de mueble del que quiere obtener el stock.")
      const tipo: string = ReadlineSync.question("'sillas', 'mesas', 'armarios': ");
      const resultado : Map<string, number> | undefined = gestor.getStockParaInforme({tipo: tipo});
      let resultadoStringAux = "Stock disponibles del tipo " + tipo + ":\n ";
      resultadoStringAux += "____________________________________________________\n\n"
      let resultadoString = ConvertirMapaAString<string,number>(resultado as Map<string, number>);
      resultadoString += "____________________________________________________\n\n";
      const nombreFichero = `Stock_${tipo}.txt`;
      writeFile(`./logs/${nombreFichero}`, resultadoStringAux + resultadoString, () => {
        console.log(`El fichero ${nombreFichero} se encuentra en la carpeta logs.`);
      });
      break;
    case "Stock de un mueble en concreto":
      const id: number = ReadlineSync.questionInt("Introduzca el id del mueble del que quiere obtener el stock: ");
      const resultado1 : Map<string, number> | undefined = gestor.getStockParaInforme({id: id});
      let resultadoString1 = "Stock disponibles del mueble con id " + id + ":\n * ";
      resultadoString1 += ConvertirMapaAString<string,number>(resultado1 as Map<string, number>);

      const nombreFichero1 = `Stock_mueble_${id}.txt`;
      writeFile(`./logs/${nombreFichero1}`, resultadoString1, () => {
        console.log(`El fichero ${nombreFichero1} se encuentra en la carpeta logs.`);
      });
      break;
    case  "Stock de los 5 muebles más vendidos":
      const resultadoAux = "Top 5 muebles más vendidos:\n ____________________________\n\n"; 
      const resultadoString2 = ConvertirMapaAString<number,number>(gestor.getMueblesMasVendidos());
      const nombreFichero2 = `Top_5_más_vendidos.txt`;
      writeFile(`./logs/${nombreFichero2}`,resultadoAux+ resultadoString2, () => {
        console.log(`El fichero ${nombreFichero2} se encuentra en la carpeta logs.`);
      });
      break;
    case "Información sobre clientes":
      const identificador: number = ReadlineSync.questionInt("Introduzca el id del cliente a generar el informe: ");
      const informe : string = gestor.getInfoCliente(identificador);
      const nombreFichero3 = `Cliente_${identificador}.txt`;
      writeFile(`./logs/${nombreFichero3}`, informe, () => {
        console.log(`El fichero ${nombreFichero3} se encuentra en la carpeta logs.`);
      });
      break;
      case "Información sobre proveedores":
        const identificadorp: number = ReadlineSync.questionInt("Introduzca el id del proveedor a generar el informe: ");
        const informep : string = gestor.getInfoProveedor(identificadorp);
        const nombreFichero3p = `Proveedor_${identificadorp}.txt`;
        writeFile(`./logs/${nombreFichero3p}`, informep, () => {
          console.log(`El fichero ${nombreFichero3p} se encuentra en la carpeta logs.`);
        });
        break;
      case "Histórico de Ventas":
        const answer2 = await inquirer.prompt({
          type: "list",
          name: "option",
          message: "A continuación, se le pedirá que introduzca el tipo de informe que quiere obtener.",
          choices: ["Histórico anual", "Histórico Mensual + Anual", "Histórico Anual + Mensual + Diario", "Volver"],
        });
        switch(answer2.option) {
          case "Histórico anual":
            console.log("Introduzca el año del que quiere obtener el informe: ");
            const anio: number = ReadlineSync.questionInt();
            const informeAnual = gestor.getCalendarioVentas({anio: anio});
            const nombreFichero4 = `Histórico_ventas_${anio}.txt`;
            writeFile(`./logs/${nombreFichero4}`, informeAnual, () => {
              console.log(`El fichero ${nombreFichero4} se encuentra en la carpeta logs.`);
            });
            break;

          case "Histórico Mensual + Anual":
            console.log("Introduzca el año del que quiere obtener el informe: ");
            const anio1: number = ReadlineSync.questionInt();
            console.log("Introduzca el mes del que quiere obtener el informe: ");
            const mes: number = ReadlineSync.questionInt();
            const informeMensual = gestor.getCalendarioVentas({anio: anio1, mes: mes});
            const nombreFichero5 = `Histórico_ventas_${anio1}_${mes}.txt`;
            writeFile(`./logs/${nombreFichero5}`, informeMensual, () => {
              console.log(`El fichero ${nombreFichero5} se encuentra en la carpeta logs.`);
            });
            break;
          case "Histórico Anual + Mensual + Diario":
            console.log("Introduzca el año del que quiere obtener el informe: ");
            const anio2: number = ReadlineSync.questionInt();
            console.log("Introduzca el mes del que quiere obtener el informe: ");
            const mes1: number = ReadlineSync.questionInt();
            console.log("Introduzca el día del que quiere obtener el informe: ");
            const dia: number = ReadlineSync.questionInt();
            const informeDiario = gestor.getCalendarioVentas({anio: anio2, mes: mes1, dia: dia});
            const nombreFichero6 = `Histórico_ventas_${anio2}_${mes1}_${dia}.txt`;
            writeFile(`./logs/${nombreFichero6}`, informeDiario, () => {
              console.log(`El fichero ${nombreFichero6} se encuentra en la carpeta logs.`);
            });
            break;

            case "Volver":
              console.log("Volviendo al menú principal...");
              main();
              break;
        }
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
async function menuDevolucionesTransacciones() {
  const answer = await inquirer.prompt({
    type: "list",
    name: "option",
    message: "Seleccione el tipo de transacción:",
    choices: ["Añadir", "Borrar", "Volver"],
  });

  switch (answer.option) {
    case "Añadir":
      const id1: number = ReadlineSync.questionInt("Introduzca el id de la devolución que quiere añadir: ");
      const fecha: string = ReadlineSync.question("Introduzca la fecha en la que se ha producido la devolución: ");
      const importe : number = ReadlineSync.questionInt("Introduzca el importe a devolver: ");
      const id_mueble: number = ReadlineSync.questionInt("Introduzca el id del mueble a devolver: ");
      const persona: string = ReadlineSync.question("Introduzca el número de contacto de la persona que ha hecho la devolución ");
      const devolucion = new Devolucion(id1, new Date(fecha),importe, id_mueble, persona);
      gestor.agregarDevolucion(devolucion);
      break;
    case "Borrar":
      const id: number = ReadlineSync.questionInt("Introduzca el id de la devolucion que quiere eliminar ");
      gestor.eliminarDevolucion(id);
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
      const id1: number = ReadlineSync.questionInt("Introduzca un id para la nueva venta: ");
      const fecha: string = ReadlineSync.question("Introduzca la fecha en la que se ha producido la venta: ");
      const importe : number = ReadlineSync.questionInt("Introduzca el importe de la compra: ");
      const id_mueble: number = ReadlineSync.questionInt("Introduzca el id del mueble que se ha vendido: ");
      const persona: string = ReadlineSync.question("Introduzca el número id de la persona que ha hecho la compra: ");
      const venta = new Venta(id1, new Date(fecha),importe, id_mueble, persona);
      gestor.agregarVenta(venta);
      break;
    case "Borrar":
      const id: number = ReadlineSync.questionInt("Introduzca el id de la venta que quiere eliminar ");
      gestor.eliminarVenta(id);
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
    choices: ["Ventas", "Devoluciones", "Volver"],
  });

  switch (answer.option) {
    case "Ventas":
      menuVentasTransacciones();
      break;
    case "Devoluciones":
      menuDevolucionesTransacciones();
      break;
    case "Volver":
      console.log("Volviendo al menú principal...");
      main();
      break;
    default:
      console.log("Opción no válida. Por favor, selecciona una opción válida.");

  }

}


async function menuTipoMuebleAñadir() {
  const answer = await inquirer.prompt({
    type: "list",
    name: "option",
    message: "Seleccione el tipo de mueble que quiere añadir:",
    choices: ["Sillas", "Mesas", "Armarios", "Volver"],
  });
  const id: number = ReadlineSync.questionInt("Introduzca el id del mueble: ");
  const nombre: string = ReadlineSync.question("Introduzca el nombre de mueble: ");
  const descripcion: string = ReadlineSync.question("Introduzca la descripción del mueble: ");
  const material: string = ReadlineSync.question("Introduzca el material del mueble: ");
  const largo: number = ReadlineSync.questionInt("Introduzca el largo del mueble: ");
  const ancho: number = ReadlineSync.questionInt("Introduzca el ancho del mueble: ");
  const alto: number = ReadlineSync.questionInt("Introduzca el alto del mueble: ");
  const dimensiones: Dimension = { alto: alto, ancho: ancho, largo: largo };
  const precio: number = ReadlineSync.questionInt("Introduzca el precio del mueble: ");

  switch (answer.option) {
    case "Sillas":
      const respaldo: boolean = ReadlineSync.keyInYN("Introduzca si la silla tiene respaldo o no: ") ? true : false;
      const reposabrazos: boolean = ReadlineSync.keyInYN("Introduzca si la silla tiene reposabrazos o no: ") ? true : false;
      const silla = new Silla(id, nombre, descripcion, material, dimensiones, precio, respaldo, reposabrazos);
      bbdd.adicionarMueble(silla, Categoria.SILLA);
      break;
    case "Mesas":
      const extensible: boolean = ReadlineSync.keyInYN("Introduzca si la mesa es extensible o no: ") ? true : false;
      const cantidadSillas: number = ReadlineSync.questionInt("Introduzca la cantidad de sillas que tiene la mesa: ");
      const mesa = new Mesa(id, nombre, descripcion, material, dimensiones, precio, extensible, cantidadSillas);
      bbdd.adicionarMueble(mesa, Categoria.MESA);
      break;
    case "Armarios":
      const cajones: boolean = ReadlineSync.keyInYN("Introduzca si el armario tiene cajones o no: ") ? true : false;
      const cantidadPuertas: number = ReadlineSync.questionInt("Introduzca la cantidad de puertas que tiene el armario: ");
      const armario = new Armario(id, nombre, descripcion, material, dimensiones, precio, cajones, cantidadPuertas);
      bbdd.adicionarMueble(armario, Categoria.ARMARIO);
      break;
    case "Volver":
      console.log("Volviendo al menú principal...");
      main();
      break;
    default:
      console.log("Opción no válida. Por favor, selecciona una opción válida.");
  }
}

async function menuTipoMuebleBuscar() {
  const answer = await inquirer.prompt({
    type: "list",
    name: "option",
    message: "Seleccione el tipo de mueble por el que quiere buscar:",
    choices: ["Sillas", "Mesas", "Armarios", "Volver"],
  });
  const opcion: estrategiaOrdenacion = parseInt(ReadlineSync.question("Introduzca la estrategia de ordenación: \n 1: Alfabéticamente \n 2: Por precio \n 3: Por id \n 👉 ")) - 1;
  const descendente: boolean = ReadlineSync.keyInYNStrict("¿Desea ordenar de forma descendente?:");
  switch (answer.option) {
    case "Sillas":
      const tipo = "Silla";
      console.table(bbdd.buscarMueble({ tipo: tipo, ordenDesc: descendente }, returnStrat(opcion)));
      break;
    case "Mesas":
      const tipoMesa = "Mesa";
      console.log(returnStrat(opcion) instanceof OrdenarPorId);
      console.table(bbdd.buscarMueble({ tipo: tipoMesa, ordenDesc: descendente }, returnStrat(opcion)));
      break;
    case "Armarios":
      const tipoArmario = "Armario";
      console.table(bbdd.buscarMueble({ tipo: tipoArmario, ordenDesc: descendente }, returnStrat(opcion)));
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
      const nombre: string = ReadlineSync.question("Introduzca el nombre del mueble: ");
      const opcion: estrategiaOrdenacion = parseInt(ReadlineSync.question("Introduzca la estrategia de ordenación: \n 1: Alfabéticamente \n 2: Por precio \n 3: Por id \n 👉 "));
      const descendente: boolean = ReadlineSync.keyInYNStrict("¿Desea ordenar de forma descendente?:");
      console.log(bbdd.buscarMueble({ nombre: nombre, ordenDesc: descendente }, returnStrat(opcion)));
      break;
    case "Por tipo":
      menuTipoMuebleBuscar();
      break;
    case "Por descripción":
      const descripcion: string = ReadlineSync.question("Introduzca el fragmento de descripción del mueble: ");
      const opcionDesc: estrategiaOrdenacion = parseInt(ReadlineSync.question("Introduzca la estrategia de ordenación: \n 1: Alfabéticamente \n 2: Por precio \n 3: Por id \n 👉 "));
      const descendenteDesc: boolean = ReadlineSync.keyInYNStrict("¿Desea ordenar de forma descendente?:");
      console.log(bbdd.buscarMueble({ descripcion: descripcion, ordenDesc: descendenteDesc }, returnStrat(opcionDesc)));
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
async function menuBusquedaClientesyProveedores(tipoPersona : number) {
  const answer = await inquirer.prompt({
    type: "list",
    name: "option",
    message: "¿Cómo desea buscar?",
    choices: ["Por nombre y apellido", "Por número de contacto", "Por dirección", "Volver"],
  });
  switch (answer.option) {
    case "Por nombre y apellido":
      if (!tipoPersona) {
        const nombre : string = ReadlineSync.question("Introduzca el nombre del cliente: ");
        console.table(bbdd.getClientes({nombre: nombre}));
      } else {
        const nombre : string = ReadlineSync.question("Introduzca el nombre del proveedor: ");
        console.table(bbdd.getProveedores({nombre: nombre}));
      }
     
      break;
    case "Por número de contacto":
      if (!tipoPersona) {
        const numero : string = ReadlineSync.question("Introduzca el número de contacto del cliente: ");
        console.table(bbdd.getClientes({contacto: numero}));
      } else {
        const numero : string = ReadlineSync.question("Introduzca el número de contacto del proveedor: ");
        console.table(bbdd.getProveedores({contacto: numero}));
      }
      break;
    case "Por dirección":
      if (!tipoPersona) {
        const direccion : string = ReadlineSync.question("Introduzca la dirección del cliente: ");
        console.table(bbdd.getClientes({direccion: direccion}));
      } else {
        const direccion : string = ReadlineSync.question("Introduzca la direccion del proveedor: ");
        console.table(bbdd.getProveedores({direccion: direccion}));
      }
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
  let opcion: estrategiaOrdenacion;
  let descendente: boolean;
  switch (answer.option) {
    case "Listar Muebles":
      opcion = parseInt(ReadlineSync.question("Introduzca la estrategia de ordenación: \n 1: Alfabéticamente \n 2: Por precio \n 3: Por id \n 👉 ")) - 1;
      descendente = ReadlineSync.keyInYNStrict("¿Desea ordenar de forma descendente?:");
      console.table(bbdd.buscarMueble({ ordenDesc: descendente }, returnStrat(opcion)));
      break;
    case "Añadir Mueble":
      menuTipoMuebleAñadir();
      break;
    case "Eliminar Mueble":
      const id: number = ReadlineSync.questionInt("Introduzca el id del mueble a eliminar: ");
      bbdd.deleteMueble(id);
      break;
    case "Editar Mueble":
      const id1 : number = ReadlineSync.questionInt("Introduzca el id del mueble a editar: ");
      console.log("Introduzca aquellos atributos del mueble que quiere editar:");
      const nombre : string = ReadlineSync.question("Introduzca el nombre del mueble a editar: ");
      const descripcion : string = ReadlineSync.question("Introduzca la descripción del mueble a editar: ");
      const material : string = ReadlineSync.question("Introduzca el material del mueble a editar: ");
      const alto : number = ReadlineSync.questionInt("Introduzca el alto del mueble a editar: ");  
      const ancho : number = ReadlineSync.questionInt("Introduzca el ancho del mueble a editar: "); 
      const largo : number = ReadlineSync.questionInt("Introduzca el largo del mueble a editar: "); 
      const precio : number = ReadlineSync.questionInt("Introduzca el precio del mueble a editar: ");
      const tipo : string = ReadlineSync.question("Introduzca el tipo del mueble a editar 'Silla', 'Mesa' o 'Armario'")
      let object : any = {};
      if (nombre) {
        object.nombre = nombre;
      }
      if (descripcion) {
        object.descripcion = descripcion;
      }
      if (material) {
        object.material = material;
      }
      if (alto) {
        object.alto = alto;
      }
      if (ancho) {
        object.ancho = ancho;
      }
      if (largo) {
        object.largo = largo;
      }
      if (precio) {
        object.precio = precio;
      }
      if (tipo) {
        object.tipo = tipo;
      }
      bbdd.editarMueble(id1, object)
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

  };
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
      console.table(bbdd.getClientes({}));
      break;
    case "Añadir Cliente":
      const id: number = ReadlineSync.questionInt("Introduzca el id del cliente: ");
      const nombre: string = ReadlineSync.question("Introduzca el nombre del cliente: ");
      const contacto: string = ReadlineSync.question("Introduzca el número de contacto del cliente: ");
      const direccion: string = ReadlineSync.question("Introduzca la dirección del cliente: ");
      const cliente = new Cliente(id, nombre, contacto, direccion);
      bbdd.adicionarCliente(cliente);
      break;
    case "Eliminar Cliente":
      const id2: number = ReadlineSync.questionInt("Introduzca el id del cliente a eliminar: ");
      bbdd.deleteCliente(id2);
      break;
    case "Editar Cliente":
      console.log("Editando cliente...");
      break;
    case "Buscar Cliente":
      menuBusquedaClientesyProveedores(0);
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
      console.table(bbdd.getProveedores({}));
      break;
    case "Añadir Proveedor":
      const id: number = ReadlineSync.questionInt("Introduzca el id del proveedor: ");
      const nombre: string = ReadlineSync.question("Introduzca el nombre del proveedor: ");
      const contacto: string = ReadlineSync.question("Introduzca el número de contacto del proveedor: ");
      const direccion: string = ReadlineSync.question("Introduzca la dirección del proveedor: ");
      const proveedor = new Proveedor(id, nombre, contacto, direccion);
      bbdd.adicionarProveedor(proveedor);
      break;
    case "Eliminar Proveedor":
      const id2: number = ReadlineSync.questionInt("Introduzca el id del proveedor a eliminar: ");
      bbdd.deleteProveedor(id2);
      break;
    case "Editar Proveedor":
      console.log("Editando proveedor...");
      break;
    case "Buscar Proveedor":
      menuBusquedaClientesyProveedores(1);
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
      gestor.displayStock();
      main();
      break;
    case "Transacciones":
      menuTransacciones();
      break;
    case "Generar informes":
      generarInformes();
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
    choices: ["Muebles", "Clientes", "Proveedores", "Stock", "Salir"],
  });

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
    case "Salir":
      console.log("Saliendo del menú...");
      process.exit(0);
    default:
      console.log("Opción no válida. Por favor, selecciona una opción válida.");
  }
}

export function returnStrat(p: estrategiaOrdenacion): sortStrategy<Mueble> {
  let strat: sortStrategy<Mueble>;
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

export enum estrategiaOrdenacion {
  ALFABETICAMENTE,
  PRECIO,
  ID
}
/**
 * Llamada a la función principal que muestra el menú principal.
 */
main();