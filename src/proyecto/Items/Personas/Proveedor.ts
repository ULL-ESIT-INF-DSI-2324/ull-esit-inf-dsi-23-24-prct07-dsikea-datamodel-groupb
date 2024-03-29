/**
 * Universidad de La Laguna
 * Asignatura: Desarrollo de Sistemas Informáticos
 * Séptima práctica de la asignatura DSI
 * Realizada por: 
 *  > Antonio Ramos Castilla (alu0101480367@ull.edu.es)
 *  > Ithaisa Morales Arbelo (alu0101482194@ull.edu.es)
 *  > Omar Suárez Doro (alu0101483474@ull.edu.es)
 */

import { Persona } from './Persona.js';

/**
 * Clase que representa un Proveedor
 */
export class Proveedor extends Persona {
  constructor(id_ : number, nombre_ : string, contacto_ : string, direccion_ : string) {
    super(id_, nombre_, contacto_, direccion_);
  }
}