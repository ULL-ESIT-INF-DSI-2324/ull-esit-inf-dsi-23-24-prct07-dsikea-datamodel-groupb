/**
 * Universidad de La Laguna
 * Asignatura: Desarrollo de Sistemas Informáticos
 * Séptima práctica de la asignatura DSI
 * Realizada por: 
 *  > Antonio Ramos Castilla (alu0101480367@ull.edu.es)
 *  > Ithaisa Morales Arbelo (alu0101482194@ull.edu.es)
 *  > Omar Suárez Doro (alu0101483474@ull.edu.es)
 */

class Venta {
  private id_: number;
  private fecha_: Date;
  private mueble_: string;
  constructor(id: number, fecha: Date, mueble: string) {
    this.id_ = id;
    this.fecha_ = fecha;
    this.mueble_ = mueble;
  }

  // Getters & Setters
}