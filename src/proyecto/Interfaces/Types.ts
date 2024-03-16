import { Cliente } from "../Items/Personas/Cliente.js";
import { Proveedor } from "../Items/Personas/Proveedor.js";
import { Mueble } from "../Items/Muebles/Mueble.js";
import { Venta } from "../Items/Transacciones/Venta.js";
import { Devolucion } from "../Items/Transacciones/Devolucion.js";

/**
 * Formato de los muebles en el JSON
 */
export type FormatoMueble = {
  [key: string]: Mueble[];
  sillas: Mueble[];
  mesas: Mueble[];
  armarios: Mueble[];
}

/**
 * Formato de los clientes en el JSON
 */
export type FormatoCliente = {
  clientes: Cliente[];
}

/**
 * Formato de los proveedores en el JSON
 */
export type FormatoProveedor = {
  proveedores: Proveedor[];
}

/**
 * Formato de las transacciones en el JSON
 */
export type FormatoTransaccion = {
  ventas: Venta[];
  devoluciones: Devolucion[];
}