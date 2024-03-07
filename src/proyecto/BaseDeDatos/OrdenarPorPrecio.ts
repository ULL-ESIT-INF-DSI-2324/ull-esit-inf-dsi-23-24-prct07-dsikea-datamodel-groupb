/**
 * Universidad de La Laguna
 * Asignatura: Desarrollo de Sistemas Informáticos
 * Séptima práctica de la asignatura DSI
 * Realizada por: 
 *  > Antonio Ramos Castilla (alu0101480367@ull.edu.es)
 *  > Ithaisa Morales Arbelo (alu0101482194@ull.edu.es)
 *  > Omar Suárez Doro (alu0101483474@ull.edu.es)
 */

import { sortStrategy } from '../Interfaces/Interfaces.js';
import { Mueble } from '../Items/Muebles/Mueble.js';

/**
 * Clase que implementa la estrategia de ordenar por precio
 */
export class OrdenarPorPrecio implements sortStrategy<Mueble> {
  sort() : (a: Mueble, b: Mueble) => number {
    return (a: Mueble, b: Mueble) => {
      if (a.precio < b.precio) {
        return -1;
      }
      if (a.precio > b.precio) {
        return 1;
      }
      return 0;
    
    }
  }
}