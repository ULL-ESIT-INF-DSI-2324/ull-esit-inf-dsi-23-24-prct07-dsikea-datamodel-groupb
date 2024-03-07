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
// import { Silla } from '../Items/Muebles/Silla.js'
// import { Cliente } from '../Personas/Cliente.js'
// import { Proveedor } from '../Personas/Proveedor.js'

class BaseDeDatos {
  constructor() {
    
  }

  buscarMueble(
    searchObj: {
      nombre?: string,
      tipo?: string,
      descripcion?: string,
      ordenAsc?: boolean,
    }): Mueble[] {
    let result: Mueble[] = [];
    type DataFormat = {
      muebles: Mueble[];
    }
    let defaultData: DataFormat = { muebles: [] };
    
    const db = JSONFileSyncPreset<DataFormat>('./Database/Muebles/sillas.json', defaultData);
    let data : Mueble[] = db.data.muebles;

    result = data.filter((mueble) => {
      if (searchObj.nombre && mueble.nombre.includes(searchObj.nombre)) {
        return true;
      }
      if (searchObj.tipo) {
        // if (mueble.tipo.includes(searchObj.tipo)) {
        //   return true;
        // }
      }
      if (searchObj.descripcion) {
        if (mueble.descripcion.includes(searchObj.descripcion)) {
          return true;
        }
      }
      return false;
    });
    if (searchObj.ordenAsc) {
      result.sort((a, b) => {
        return a.precio - b.precio;
      });
    }
    return result;
  }

  // private inicializarBaseDeDatos() : void {
  //   JSONFilePreset<Silla[]>('./Database/Muebles/sillas.json', []).then((adapter) => {
  //     this.muebles_ = [...adapter.data];
  //   });
  // }
}

let bb = new BaseDeDatos();
console.log(bb.buscarMueble({nombre: 'Silla de Metal'}));
