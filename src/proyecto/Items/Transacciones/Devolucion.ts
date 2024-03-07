/**
 * Universidad de La Laguna
 * Asignatura: Desarrollo de Sistemas Informáticos
 * Séptima práctica de la asignatura DSI
 * Realizada por: 
 *  > Antonio Ramos Castilla (alu0101480367@ull.edu.es)
 *  > Ithaisa Morales Arbelo (alu0101482194@ull.edu.es)
 *  > Omar Suárez Doro (alu0101483474@ull.edu.es)
 */

import { Mueble } from '../Muebles/Mueble.js';
import { Transaccion } from './Transaccion.js';
import { Persona } from '../Personas/Persona.js';

/**
 * Clase que representa una Devolucion
 */
export class Devolucion extends Transaccion {
  constructor(fecha: Date, importe: number, mueble: Mueble, persona: Persona) {
    super(fecha, importe, mueble, persona);
  }
}