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
import { Persona } from '../Personas/Persona.js';

/**
 * Clase abstracta que representa una Transaccion
 */
export abstract class Transaccion {
  protected fecha_: Date;
  protected importe_: number;
  protected mueble_ : Mueble;
  protected persona_ : Persona;
 
  constructor(fecha: Date, importe: number, mueble: Mueble, persona: Persona) {
    this.fecha_ = fecha;
    this.importe_ = importe;
    this.mueble_ = mueble;
    this.persona_ = persona;
  }

  /**
   * Devuelve la fecha de la transacción
   * @returns Fecha de la transacción
   */
  public get fecha(): Date {
    return this.fecha_;
  }

  /**
   * Devuelve el importe de la transacción
   * @returns Importe de la transacción
   */
  public get importe(): number {
    return this.importe_;
  }
  
  /**
   * Devuelve el mueble de la transacción
   * @returns Mueble de la transacción
   */
  public get mueble(): Mueble {
    return this.mueble_;
  }
  
  /**
   * Devuelve la persona de la transacción
   * @returns Persona de la transacción
   */
  public get persona(): Persona {
    return this.persona_;
  }

  /**
   * Establece la fecha de la transacción
   * @param fecha Fecha de la transacción
   */
  public set fecha(fecha: Date) {
    this.fecha_ = fecha;
  }
  
  /**
   * Establece el importe de la transacción
   * @param importe Importe de la transacción
   */
  public set importe(importe: number) {
    this.importe_ = importe;
  }

  /**
   * Establece el mueble de la transacción
   * @param mueble Mueble de la transacción
   */
  public set mueble(mueble: Mueble) {
    this.mueble_ = mueble;
  }

  /**
   * Establece la persona de la transacción
   * @param persona Persona de la transacción
   */
  public set persona(persona: Persona) {
    this.persona_ = persona;
  }
}