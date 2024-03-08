/**
 * Universidad de La Laguna
 * Asignatura: Desarrollo de Sistemas Informáticos
 * Séptima práctica de la asignatura DSI
 * Realizada por: 
 *  > Antonio Ramos Castilla (alu0101480367@ull.edu.es)
 *  > Ithaisa Morales Arbelo (alu0101482194@ull.edu.es)
 *  > Omar Suárez Doro (alu0101483474@ull.edu.es)
 */

import { Mueble } from '../Items/Muebles/Mueble.js'
import { Silla } from '../Items/Muebles/Silla.js'

import { JSONFileSyncPreset } from 'lowdb/node';
import { sortStrategy } from '../Interfaces/Interfaces.js'; 
import { LowSync } from 'lowdb';
// import { OrdenarPorPrecio } from './OrdenarPorPrecio.js';  
// import { OrdenarAlfabeticamente } from './OrdenarAlfabeticamente.js';
// import { Silla } from '../Items/Muebles/Silla.js'
// import { Cliente } from '../Personas/Cliente.js'
// import { Proveedor } from '../Personas/Proveedor.js'

/**
 * Clase que implementa la base de datos
 */
export type DataFormat = {
  muebles: Mueble[];
}

/**
 * Clase que implementa la base de datos
 */
export class BaseDeDatos {
  private muebles_: Map<string, Mueble[]> = new Map<string, Mueble[]>();
  private databases_: Map<string, LowSync<DataFormat>> = new Map<string, LowSync<DataFormat>>();
  constructor() {
    let defaultData: DataFormat = { muebles: [] };
    const db : LowSync<DataFormat> = JSONFileSyncPreset<DataFormat>('./Database/Muebles/sillas.json', defaultData);
    this.databases_.set('muebles', db);
    let data : Mueble[] = db.data.muebles;
    data.forEach((mueble : Mueble) => {
      this.muebles_.get(mueble.nombre)?.push(mueble) || this.muebles_.set(mueble.nombre, [mueble]);
    });
  }
  
  buscarMueble(
    searchObj: {
      nombre?: string,
      tipo?: string,
      descripcion?: string,
      ordenDesc?: boolean,
    }, s_strat : sortStrategy<Mueble>): Mueble[] {
    let auxVec : Mueble[] = [];
    for (const m of this.muebles_.values()) {
      auxVec.push(...(m.filter((mueble) => {
        if (!searchObj.nombre && !searchObj.descripcion && !searchObj.tipo) return true;
        return searchObj.nombre && mueble.nombre.includes(searchObj.nombre) ||
        searchObj.descripcion && mueble.descripcion.includes(searchObj.descripcion) ||
        searchObj.tipo && mueble.tipo === searchObj.tipo;
      })));
    }
    auxVec.sort(s_strat.sort());
    return searchObj.ordenDesc ? auxVec : auxVec.reverse();
  }

  adicionarMueble(mueble: Mueble) : void {
    const mueblesArray = this.muebles_.get(mueble.nombre);
    if (mueblesArray) {
      mueblesArray.push(mueble);
    } else {
      this.muebles_.set(mueble.nombre, [mueble]);
    }
    const db = this.databases_.get('muebles');
    if (db) {
      let objectToPush : any = {};
      for (const prop in mueble) {
        objectToPush[prop.slice(0, prop.length - 1)] = mueble[prop];
      }
      db.data.muebles.push(objectToPush as Mueble);
      db.write();
    }
  }
  
  deleteMueble(id: Number) : void {
    for (let mueble of this.muebles_.values()) {
      mueble.filter((mueble : Mueble) => mueble.id !== id);
    }
    const db = this.databases_.get('muebles');
    if (db) {
      
      db.data.muebles = db.data.muebles.filter((mueble : Mueble) => mueble.id !== id);
      db.write();
    }
  }

  get muebles() : Map<string, Mueble[]> {
    return this.muebles_;
  }
}

let a : Silla = new Silla(89, 'Silla', 'Madera de caoba', 'Maderita',{ ancho: 20, largo: 10, alto: 32 }, 32, true , true);
let b : Silla = new Silla(10, 'Silla de jardín', 'Silla para decorar la terraza', 'Madera',{ ancho: 75, largo: 120, alto: 80 }, 150, false , false);

const db = new BaseDeDatos();
db.adicionarMueble(a);
// db.adicionarMueble(b);
setTimeout(() => {
  db.deleteMueble(a.id);
  db.deleteMueble(b.id);
}, 3000);
