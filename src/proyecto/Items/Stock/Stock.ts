/**
 * Universidad de La Laguna
 * Asignatura: Desarrollo de Sistemas Informáticos
 * Séptima práctica de la asignatura DSI
 * Realizada por: 
 *  > Antonio Ramos Castilla (alu0101480367@ull.edu.es)
 *  > Ithaisa Morales Arbelo (alu0101482194@ull.edu.es)
 *  > Omar Suárez Doro (alu0101483474@ull.edu.es)
 */

import { Mueble } from "../Muebles/Mueble.js";

/**
 * Clase Stock
 */
export class Stock {
  private items: Map<Mueble, number>;
  private static stock: Stock;
  
  /**
   * Constructor de la clase Stock
   */
  private constructor() {
    this.items = new Map<Mueble, number>();
  }
  
  /**
   * MMétodo que comprueba si existe una instancia de Stock
   * @returns Stock
   */
  public static getStock(): Stock {
    if (!Stock.stock) {
      Stock.stock = new Stock();
    }
    return Stock.stock;
  }

  getCantidadTotal() {
    return Stock.stock.items.size;
  }

  getCantidadMuebleConcreto(mueble: Mueble) : number | undefined {
    return Stock.stock.items.get(mueble);
  }

  setCantidadMuebleConcreto(mueble: Mueble, cantidad: number) {
    Stock.stock.items.set(mueble, cantidad);
  }
    
  getItems() {
    return Stock.stock.items;
  }

  setItems(items: Map<Mueble, number>) {
    Stock.stock.items = items;
  }

  addItem(mueble: Mueble, cantidad: number) {
    Stock.stock.items.set(mueble, cantidad);
  }

  
  removeItem(mueble: Mueble) {
    Stock.stock.items.delete(mueble);
  }
}