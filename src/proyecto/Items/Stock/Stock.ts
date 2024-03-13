/**
 * Universidad de La Laguna
 * Asignatura: Desarrollo de Sistemas Informáticos
 * Séptima práctica de la asignatura DSI
 * Realizada por: 
 *  > Antonio Ramos Castilla (alu0101480367@ull.edu.es)
 *  > Ithaisa Morales Arbelo (alu0101482194@ull.edu.es)
 *  > Omar Suárez Doro (alu0101483474@ull.edu.es)
 */

//import { Mueble } from '../Muebles/Mueble.js';
import { BaseDeDatos } from '../../BaseDeDatos/BaseDeDatos.js'
import { Observer } from '../../Interfaces/Interfaces.js'

/**
 * Clase Stock
 */
export class Stock implements Observer {
  private static stock: Stock;
  private db: BaseDeDatos = new BaseDeDatos(Stock.stock);
  private actualStock = this.db.stock;
  /**
   * Constructor de la clase Stock
   */
  private constructor() {}
  
  /**
   * Método que comprueba si existe una instancia de Stock
   * @returns Stock
   */
  public static getStock(): Stock {
    if (!Stock.stock) {
      Stock.stock = new Stock();
    }
    return Stock.stock;
  }

  updateStock() {
    this.actualStock = this.db.stock;
  }

  displayStock() {
    console.log(this.actualStock);
  } 
}