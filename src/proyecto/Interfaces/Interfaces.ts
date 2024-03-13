/**
 * Universidad de La Laguna
 * Asignatura: Desarrollo de Sistemas Informáticos
 * Séptima práctica de la asignatura DSI
 * Realizada por: 
 *  > Antonio Ramos Castilla (alu0101480367@ull.edu.es)
 *  > Ithaisa Morales Arbelo (alu0101482194@ull.edu.es)
 *  > Omar Suárez Doro (alu0101483474@ull.edu.es)
 */

/**
 * Interfaz que representa una estrategia de ordenación
 */
export interface sortStrategy<T> {
  sort() : (a: T, b : T) => number;
}

/**
 * Interfaz que representa un elemento Observador
 */
export interface Observer {
  updateStock(): void;
}

/**
 * Interfaz que represetna un elemento observable
 */
export interface Observable {
  subscribe(observer: Observer): void;
  unsubscribe(observer: Observer): void;
  notify(): void;
}