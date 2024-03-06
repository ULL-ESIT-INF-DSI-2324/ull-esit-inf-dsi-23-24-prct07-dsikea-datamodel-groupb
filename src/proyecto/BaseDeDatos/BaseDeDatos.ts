/**
 * Universidad de La Laguna
 * Asignatura: Desarrollo de Sistemas Informáticos
 * Séptima práctica de la asignatura DSI
 * Realizada por: 
 *  > Antonio Ramos Castilla (alu0101480367@ull.edu.es)
 *  > Ithaisa Morales Arbelo (alu0101482194@ull.edu.es)
 *  > Omar Suárez Doro (alu0101483474@ull.edu.es)
 */

import { JSONFilePreset } from 'lowdb/node'
import { Silla } from '../Muebles/Silla.js'
import { Mueble } from '../Muebles/Mueble.js'
// import { Cliente } from '../Personas/Cliente.js'
// import { Proveedor } from '../Personas/Proveedor.js'

class BaseDeDatos {
  private muebles_: Mueble[] = [];

  constructor() {
    this.inicializarBaseDeDatos();
  }
  
  get muebles() : Mueble[] {
    return this.muebles_;
  }

  private inicializarBaseDeDatos() : void {
    JSONFilePreset<Silla[]>('./Database/Muebles/sillas.json', []).then((adapter) => {
      this.muebles_ = [...adapter.data];
    });
  }
}

let bb = new BaseDeDatos();
setTimeout(() => {
  console.log(bb.muebles);
},10);
