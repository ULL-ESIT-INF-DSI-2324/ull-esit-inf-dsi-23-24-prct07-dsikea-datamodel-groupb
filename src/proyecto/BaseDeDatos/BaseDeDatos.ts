/**
 * Universidad de La Laguna
 * Asignatura: Desarrollo de Sistemas Informáticos
 * Séptima práctica de la asignatura DSI
 * Realizada por: 
 *  > Antonio Ramos Castilla (alu0101480367@ull.edu.es)
 *  > Ithaisa Morales Arbelo (alu0101482194@ull.edu.es)
 *  > Omar Suárez Doro (alu0101483474@ull.edu.es)
 */

import { Mueble } from '../Items/Muebles/Mueble.js';
import { JSONFileSyncPreset } from 'lowdb/node';
import { sortStrategy } from '../Interfaces/Interfaces.js';
import { LowSync } from 'lowdb';
import { Silla } from '../Items/Muebles/Silla.js'


/**
 * Clase que implementa la base de datos
 */
export type DataFormat = {
  [key: string]: Mueble[];
  sillas: Mueble[];
  mesas: Mueble[];
}

/**
 * 
 */
export enum Categoria {
  SILLA = 'sillas',
  MESA = 'mesas',
}
/**
 * Clase que implementa la base de datos
 */
export class BaseDeDatos {
  private muebles_: Map<string, Map<string, Mueble[]>> = new Map<string, Map<string, Mueble[]>>();
  private databases_: Map<string, LowSync<DataFormat>> = new Map<string, LowSync<DataFormat>>();
  constructor() {
    let defaultData: DataFormat = { sillas: [], mesas: [] };
    const db: LowSync<DataFormat> = JSONFileSyncPreset<DataFormat>('./Database/muebles.json', defaultData);
    this.databases_.set('muebles', db);
    // TODO: Añadir más bases de datos
    for (const key in db.data) {
      let tempMap: Map<string, Mueble[]> | undefined = this.muebles_.get(key);
      if (!this.muebles_.has(key)) {
        this.muebles_.set(key, new Map<string, Mueble[]>());
        tempMap = this.muebles_.get(key);
      }
      db.data[key].forEach((mueble: Mueble) => {
        if (!tempMap?.has(mueble.nombre)) {
          tempMap?.set(mueble.nombre, []);
        }
        tempMap?.get(mueble.nombre)?.push(mueble);
      });
    }
    // console.log(this.muebles_.get('sillas'));
  }

  /**
   * Encuentra un mueble en la base de datos
   * @param searchObj Se utiliza para buscar un mueble en la base de datos
   * @param s_strat Estrategia de ordenación
   * @returns Muebles encontrados
   */
  buscarMueble(
    searchObj: {
      nombre?: string,
      tipo?: string,
      descripcion?: string,
      ordenDesc?: boolean,
    }, s_strat: sortStrategy<Mueble>): Mueble[] {
    let auxVec: Mueble[] = [];
    for (const m of this.muebles_.values()) {
      for (const mueble of m.values()) {
        auxVec.push(...mueble.filter((mueble) => {
          if (!searchObj.nombre && !searchObj.descripcion && !searchObj.tipo) return true;
          return searchObj.nombre && mueble.nombre.includes(searchObj.nombre) ||
            searchObj.descripcion && mueble.descripcion.includes(searchObj.descripcion) ||
            searchObj.tipo && mueble.tipo === searchObj.tipo;
        }));
      }
    }
    auxVec.sort(s_strat.sort());
    return searchObj.ordenDesc ? auxVec : auxVec.reverse();
  }


  adicionarMueble(mueble: Mueble, categoria: Categoria): void {
    const db = this.databases_.get('muebles')!;
    // TODO: Añadir comprobación de que el ID no está repetido en la base de datos

    // Creamos el objeto que vamos a insertar en la base de datos
    let objectToPush: any = {};
    if (db) {
      for (const prop in mueble) {
        objectToPush[prop.slice(0, prop.length - 1)] = mueble[prop];
      }
    }
    this.insertarCategoria(categoria, mueble);
    db.data[categoria].push(objectToPush as Mueble);
    console.log(this.muebles_);
    db.write();
  }

  deleteMueble(id: Number): void {
    for (let mueble in this.muebles_) {
      for (let m in this.muebles_.get(mueble)) {
        this.muebles_.get(mueble)!.get(m)!.filter((mueble: Mueble) => mueble.id !== id);
      }
    }
    const db = this.databases_.get('muebles')!;
    for (let mueble in db.data) {
      for (let i = 0; i < db.data[mueble].length; i++) {
        if (db.data[mueble][i].id === id) {
          db.data[mueble].splice(i, 1);
          db.write();
          return;
        }
      }
    }
  }

  /**
   * Esta función inserta un mueble en la categoría que le corresponde
   * @param categoria Esta función inserta un mueble en la categoría que le corresponde
   * @param mueble Este es el mueble que se va a insertar
   */
  private insertarCategoria(categoria: string, mueble: Mueble): void {
    if (!this.muebles_.get(categoria)!.has(mueble.nombre)) {
      this.muebles_.get(categoria)!.set(mueble.nombre, []);
    }
    this.muebles_.get(categoria)!.get(mueble.nombre)!.push(mueble);
  }
}

let a: Silla = new Silla(89, 'Silla plástica', 'Madera de caoba', 'Maderita', { ancho: 20, largo: 10, alto: 32 }, 32, true, true);
// let b : Silla = new Silla(10, 'Silla de jardín', 'Silla para decorar la terraza', 'Madera',{ ancho: 75, largo: 120, alto: 80 }, 150, false , false);

const db = new BaseDeDatos();
db.adicionarMueble(a, Categoria.SILLA);
db.deleteMueble(89);





// console.log(db.buscarMueble({ nombre: 'Silla de Metal' }, {sort: () => (a: Mueble, b: Mueble) => a.id - b.id}));
// console.log(db.buscarMueble({ nombre: 'Silla de Metal' }, {sort: () => (a: Mueble, b: Mueble) => a.id - b.id}));
// // db.adicionarMueble(b);
// setTimeout(() => {
//   db.deleteMueble(a.id);
//   db.deleteMueble(b.id);
// }, 3000);
