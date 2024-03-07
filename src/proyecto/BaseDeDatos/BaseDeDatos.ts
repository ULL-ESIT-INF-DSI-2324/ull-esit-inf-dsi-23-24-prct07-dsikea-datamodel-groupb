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
import { JSONFileSyncPreset } from 'lowdb/node';
import { sortStrategy } from '../Interfaces/Interfaces.js';  
// import { OrdenarPorPrecio } from './OrdenarPorPrecio.js';  
// import { OrdenarAlfabeticamente } from './OrdenarAlfabeticamente.js';

// import { Silla } from '../Items/Muebles/Silla.js'
// import { Cliente } from '../Personas/Cliente.js'
// import { Proveedor } from '../Personas/Proveedor.js'

export class BaseDeDatos {
  private muebles_: Map<string, Mueble[]> = new Map<string, Mueble[]>();
  constructor() {
    type DataFormat = {
      muebles: Mueble[];
    }
    let defaultData: DataFormat = { muebles: [] };
    const db = JSONFileSyncPreset<DataFormat>('./Database/Muebles/sillas.json', defaultData);
    let data : Mueble[] = db.data.muebles;
    data.forEach((mueble : Mueble) => {
      this.muebles_.get(mueble.nombre)?.push(mueble) || this.muebles_.set(mueble.nombre, [mueble]);
    });
    // console.log(this.muebles_);
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
}