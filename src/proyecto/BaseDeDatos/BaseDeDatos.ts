/**
 * Universidad de La Laguna
 * Asignatura: Desarrollo de Sistemas Informáticos
 * Séptima práctica de la asignatura DSI
 * Realizada por: 
 *  > Antonio Ramos Castilla (alu0101480367@ull.edu.es)
 *  > Ithaisa Morales Arbelo (alu0101482194@ull.edu.es)
 *  > Omar Suárez Doro (alu0101483474@ull.edu.es)
 */

import { LowSync } from 'lowdb';
import { JSONFileSyncPreset } from 'lowdb/node';
import { Mueble } from '../Items/Muebles/Mueble.js';
import { sortStrategy, Observable, Observer } from '../Interfaces/Interfaces.js';
import { OrdenarPorId } from '../BaseDeDatos/OrdenarPorId.js';
import { Cliente } from '../Items/Personas/Cliente.js';
import { Proveedor } from '../Items/Personas/Proveedor.js';
import { Venta } from '../Items/Transacciones/Venta.js';
import { Devolucion } from '../Items/Transacciones/Devolucion.js';
import { FormatoMueble, FormatoCliente, FormatoProveedor, FormatoTransaccion } from '../Interfaces/Types.js';


/**
 * Categoría de los muebles
 */
export enum Categoria {
  SILLA = 'sillas',
  MESA = 'mesas',
  ARMARIO = 'armarios'
}

/**
 * Clase que implementa la base de datos
 */
export class BaseDeDatos implements Observable {
  private muebles_: Map<string, Map<string, Mueble[]>> = new Map<string, Map<string, Mueble[]>>();
  private clientes_: Cliente[] = [];
  private proveedores_: Proveedor[] = [];
  private ventas_: Venta[] = [];
  private devoluciones_: Devolucion[] = [];
  private db_muebles_: LowSync<FormatoMueble> = JSONFileSyncPreset<FormatoMueble>('./Database/muebles.json', { sillas: [], mesas: [], armarios: []});
  private db_clientes_: LowSync<FormatoCliente> = JSONFileSyncPreset<FormatoCliente>('./Database/Personas/clientes.json', { clientes: [] });
  private db_proveedores_: LowSync<FormatoProveedor> = JSONFileSyncPreset<FormatoProveedor>('./Database/Personas/proveedores.json', { proveedores: [] });
  private db_transacciones_: LowSync<FormatoTransaccion> = JSONFileSyncPreset<FormatoTransaccion>('./Database/Transacciones/transacciones.json', { ventas: [], devoluciones: [] });
  private observer : Observer | null = null;
  
  /**
   * Se obtiene de la base de datos los muebles que contiene, para posteriormente almacenarlo de la siguiente manera:
   * Tipo de mueble:
   *    > Nombre del mueble: [Mueble1, Mueble2, ...]
   */  
  constructor(gestor: Observer) {
    for (const key in this.db_muebles_.data) {
      let tempMap: Map<string, Mueble[]> | undefined = this.muebles_.get(key);
      if (!this.muebles_.has(key)) {
        this.muebles_.set(key, new Map<string, Mueble[]>());
        tempMap = this.muebles_.get(key);
      }
      this.db_muebles_.data[key].forEach((mueble: Mueble) => {
        if (!tempMap?.has(mueble.nombre)) {
          tempMap?.set(mueble.nombre, []);
        }
        tempMap?.get(mueble.nombre)?.push(mueble);
      });
    }

    // Se obtiene de la base de datos los clientes que se van a inicializar, para posteriormente inicializarlos y empujarlos
    this.db_clientes_.data.clientes.forEach((cliente: Cliente) => {
      let clienteTemporal: Cliente = new Cliente(cliente.id, cliente.nombre, cliente.contacto.toString(), cliente.direccion);
      this.clientes_.push(clienteTemporal);
    });
    // Se obtiene de la base de datos los proveedores que se van a inicializar, para posteriormente inicializarlos y empujarlos    
    this.db_proveedores_.data.proveedores.forEach((proovedor: Proveedor) => {
      let clienteTemporal: Proveedor = new Proveedor(proovedor.id, proovedor.nombre, proovedor.contacto.toString(), proovedor.direccion);
      this.proveedores_.push(clienteTemporal);
    });
    // Se obtiene de la base de datos las ventas que se van a inicializar, para posteriormente inicializarlas y empujarlas
    this.db_transacciones_.data.ventas.forEach((venta: Venta) => {
      let ventaTemporal: Venta = new Venta(venta.id, venta.fecha, venta.importe, venta.mueble, venta.persona);
      this.ventas_.push(ventaTemporal);
    });
    // Se obtiene de la base de datos las devoluciones que se van a inicializar, para posteriormente inicializarlas y empujarlas
    this.db_transacciones_.data.devoluciones.forEach((devolucion: Devolucion) => {
      let devolucionTemporal: Devolucion = new Devolucion(devolucion.id, devolucion.fecha, devolucion.importe, devolucion.mueble, devolucion.persona);
      this.devoluciones_.push(devolucionTemporal);
    });
    // Suscribimos el gestor a la base de datos
    this.subscribe(gestor);
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
      id?: number
    }, s_strat: sortStrategy<Mueble>): Mueble[] {
    let auxVec: Mueble[] = [];
    for (const m of this.muebles_.values()) {
      for (const mueble of m.values()) {
        auxVec.push(...mueble.filter((mueble) => {
          if (!searchObj.nombre && !searchObj.descripcion && !searchObj.tipo && !searchObj.id) return true;
          return searchObj.nombre && mueble.nombre.includes(searchObj.nombre) ||
            searchObj.descripcion && mueble.descripcion.includes(searchObj.descripcion) ||
            searchObj.tipo && mueble.tipo === searchObj.tipo ||
            searchObj.id && mueble.id === searchObj.id;
        }));
      }
    }
    auxVec.sort(s_strat.sort());
    return searchObj.ordenDesc ? auxVec : auxVec.reverse();
  }

  buscarTransaccion(): void {

  }

  adicionarMueble(mueble: Mueble, categoria: Categoria): void {
    if (this.buscarMueble({ id: mueble.id }, new OrdenarPorId()).length !== 0) {
      throw new Error('ID repetido');
    }
    const db = this.db_muebles_;
    // Creamos el objeto que vamos a insertar en la base de datos
    let objectToPush: any = {};
    if (db) {
      for (const prop in mueble) {
        objectToPush[prop.slice(0, prop.length - 1)] = mueble[prop];
      }
    }
    this.insertarMuebleCategoria(categoria, mueble);
    db.data[categoria].push(objectToPush as Mueble);
    db.write();
    this.notify();
  }

  /**
   * Esta función consiste en editar un mueble de la base de datos
   * @param id El id del mueble que se va a editar
   * @param modifyObject El objeto que indica los parámetros que se van a modificar	
   * @returns 
   */
  editarMueble(id: number, modifyObject: {
    nombre?: string,
    descripcion?: string,
    precio?: number,
    material?: string,
    dimensiones?: {
      alto: number,
      ancho: number,
      largo: number
    },
  }): void {
    if (this.buscarMueble({ id: id }, new OrdenarPorId()).length === 0) {
      throw new Error('ID no encontrado');
    }
    // Change in the memory
    for (let mueble in this.muebles_) {
      for (let nombre in this.muebles_.get(mueble)) {
        for (let element of this.muebles_.get(mueble)!.get(nombre)!) {
          if (element.id !== id) { continue; }
          if (modifyObject.nombre) { element.nombre = modifyObject.nombre; }
          if (modifyObject.descripcion) { element.descripcion = modifyObject.descripcion; }
          if (modifyObject.precio) { element.precio = modifyObject.precio; }
          if (modifyObject.material) { element.material = modifyObject.material; }
          if (modifyObject.dimensiones) { element.dimensiones = modifyObject.dimensiones; }
        } 
      }
    }
    // Change in the database
    for (let mueble in this.db_muebles_.data) {
      for (let i = 0; i < this.db_muebles_.data[mueble].length; i++) {
        if (this.db_muebles_.data[mueble][i].id === id) {
          if (modifyObject.nombre) { this.db_muebles_.data[mueble][i].nombre = modifyObject.nombre! }
          if (modifyObject.descripcion) { this.db_muebles_.data[mueble][i].descripcion = modifyObject.descripcion!; }
          if (modifyObject.precio) { this.db_muebles_.data[mueble][i].precio = modifyObject.precio!; }
          if (modifyObject.material) { this.db_muebles_.data[mueble][i].material = modifyObject.material!;}
          if (modifyObject.dimensiones) { this.db_muebles_.data[mueble][i].dimensiones = modifyObject.dimensiones!; }
          this.db_muebles_.write();
          return;
        }
      }
    }    
    this.notify();
  }
  
  /**
   * Esta función elimina un mueble de la base de datos
   * @param id_p El id del mueble que se va a eliminar de la base de datos
   * @returns void
   */
  deleteMueble(id_p: number): void {
    if (this.buscarMueble({ id: id_p }, new OrdenarPorId()).length === 0) {
      throw new Error('ID no encontrado');
    }
    for (let mueble in this.muebles_) {
      for (let m in this.muebles_.get(mueble)) {
        this.muebles_.get(mueble)!.get(m)!.filter((mueble: Mueble) => mueble.id !== id_p);
      }
    }
    const db = this.db_muebles_;
    for (let mueble in db.data) {
      for (let i = 0; i < db.data[mueble].length; i++) {
        if (db.data[mueble][i].id === id_p) {
          db.data[mueble].splice(i, 1);
          db.write();
          return;
        }
      }
    }
    this.notify();
  }

  /**
   * Añade un cliente a la base de datos
   * @param cliente Cliente a añadir
   */
  adicionarCliente(cliente: Cliente): void {
    if (this.db_clientes_.data.clientes.find((c) => c.id === cliente.id)) {
      throw new Error('ID repetido');
    }
    let objectToPush: any = {};
    for (const prop in cliente) {
      objectToPush[prop.slice(0, prop.length - 1)] = cliente[prop];
    }
    this.clientes_.push(cliente);
    this.db_clientes_.data.clientes.push(objectToPush as Cliente);
    this.db_clientes_.write();
  }

  /**
   * Edita un cliente de la base de datos
   * @param id ID del cliente a editar
   */
  editarCliente(id: number, modifyObject: {
    nombre?: string,
    contacto?: string,
    direccion?: string
  }): void {
    if (this.db_clientes_.data.clientes.find((c) => c.id === id)) {
      throw new Error('ID no encontrado');
    }
    for (let i = 0; i < this.clientes_.length; i++) {
      if (this.clientes_[i].id === id) {
        if (modifyObject.nombre) { this.clientes_[i].nombre = modifyObject.nombre; }
        if (modifyObject.contacto) { this.clientes_[i].contacto = +modifyObject.contacto; }
        if (modifyObject.direccion) { this.clientes_[i].direccion = modifyObject.direccion; }
      }
    }
    for (let i = 0; i < this.db_clientes_.data.clientes.length; i++) {
      if (this.db_clientes_.data.clientes[i].id === id) {
        if (modifyObject.nombre) { this.db_clientes_.data.clientes[i].nombre = modifyObject.nombre; }
        if (modifyObject.contacto) { this.db_clientes_.data.clientes[i].contacto = +modifyObject.contacto; }
        if (modifyObject.direccion) { this.db_clientes_.data.clientes[i].direccion = modifyObject.direccion; }
      }
    }
    this.db_clientes_.write();
  }

  /**
   * Elimina un cliente de la base de datos
   * @param id ID del cliente a eliminar
   */
  deleteCliente(id: number): void {
    if (!this.db_clientes_.data.clientes.find((c) => c.id === id)) {
      throw new Error('ID no encontrado');
    }
    this.clientes_ = this.clientes_.filter((c) => c.id !== id);
    this.db_clientes_.data.clientes = this.db_clientes_.data.clientes.filter((c) => c.id !== id);
    this.db_clientes_.write();
  }

  /**
   * Añade un proveedor a la base de datos
   * @param proveedor Proveedor a añadir
   */
  adicionarProveedor(proveedor: Proveedor): void {
    if (this.db_proveedores_.data.proveedores.find((c) => c.id === proveedor.id)) {
      throw new Error('ID repetido');
    }
    let objectToPush: any = {};
    for (const prop in proveedor) {
      objectToPush[prop.slice(0, prop.length - 1)] = proveedor[prop];
    }
    this.proveedores_.push(proveedor);
    this.db_proveedores_.data.proveedores.push(objectToPush as Proveedor);
    this.db_proveedores_.write();
  }

  /**
   * Edita un proveedor de la base de datos
   * @param id ID del proveedor a editar
   */
  editarProveedor(id: number, modifyObject: {
    nombre?: string,
    contacto?: string,
    direccion?: string
  }): void {
    if (this.db_proveedores_.data.proveedores.find((c) => c.id === id)) {
      throw new Error('ID no encontrado');
    }
    for (let i = 0; i < this.proveedores_.length; i++) {
      if (this.proveedores_[i].id === id) {
        if (modifyObject.nombre) { this.proveedores_[i].nombre = modifyObject.nombre; }
        if (modifyObject.contacto) { this.proveedores_[i].contacto = +modifyObject.contacto; }
        if (modifyObject.direccion) { this.proveedores_[i].direccion = modifyObject.direccion; }
      }
    }
    for (let i = 0; i < this.db_proveedores_.data.proveedores.length; i++) {
      if (this.db_proveedores_.data.proveedores[i].id === id) {
        if (modifyObject.nombre) { this.db_proveedores_.data.proveedores[i].nombre = modifyObject.nombre; }
        if (modifyObject.contacto) { this.db_proveedores_.data.proveedores[i].contacto = +modifyObject.contacto; }
        if (modifyObject.direccion) { this.db_proveedores_.data.proveedores[i].direccion = modifyObject.direccion; }
      }
    }
    this.db_proveedores_.write();
  }

  /**
   * Elimina un proveedor de la base de datos
   * @param id ID del proveedor a eliminar
   */
  deleteProveedor(id: number): void {
    if (!this.db_proveedores_.data.proveedores.find((c) => c.id === id)) {
      throw new Error('ID no encontrado');
    }
    this.proveedores_ = this.proveedores_.filter((c) => c.id !== id);
    this.db_proveedores_.data.proveedores = this.db_proveedores_.data.proveedores.filter((c) => c.id !== id);
    this.db_proveedores_.write();
  }

  /**
   * Añade una venta a la base de datos
   * @param venta Venta a añadir
   */
  adicionarVenta(venta: Venta): void {
    let objectToPush: any = {};
    for (const prop in venta) {
      objectToPush[prop.slice(0, prop.length - 1)] = venta[prop];
      if (prop === 'fecha_') {
        objectToPush[prop.slice(0, prop.length - 1)] = venta[prop].toLocaleDateString();
      }
    }
    this.ventas_.push(venta);
    this.db_transacciones_.data.ventas.push(objectToPush as Venta);
    this.db_transacciones_.write();
  }

  /**
   * Elimina una venta de la base de datos
   * @param id ID de la venta a eliminar
   */
  deleteVenta(id: number): void {
    if (!this.db_transacciones_.data.ventas.find((c) => c.id === id)) {
      throw new Error('ID no encontrado');
    }
    this.ventas_ = this.ventas_.filter((c) => c.id !== id);
    this.db_transacciones_.data.ventas = this.db_transacciones_.data.ventas.filter((c) => c.id !== id);
    this.db_transacciones_.write();
  }

  /**
   * Añade una devolución a la base de datos
   * @param devolucion Devolución a añadir
   */
  adicionarDevolucion(devolucion: Devolucion): void {
    let objectToPush: any = {};
    for (const prop in devolucion) {
      objectToPush[prop.slice(0, prop.length - 1)] = devolucion[prop];
      if (prop === 'fecha_') {
        objectToPush[prop.slice(0, prop.length - 1)] = devolucion[prop].toLocaleDateString();
      }
    }
    this.devoluciones_.push(devolucion);
    this.db_transacciones_.data.devoluciones.push(objectToPush as Devolucion);
  }

  /**
   * Elimina una devolución de la base de datos
   * @param id ID de la devolución a eliminar
   */
  deleteDevolucion(id: number): void {
    if (!this.db_transacciones_.data.devoluciones.find((c) => c.id === id)) {
      throw new Error('ID no encontrado');
    }
    this.devoluciones_ = this.devoluciones_.filter((c) => c.id !== id);
    this.db_transacciones_.data.devoluciones = this.db_transacciones_.data.devoluciones.filter((c) => c.id !== id);
    this.db_transacciones_.write();
  }



  /**
   * Método que notifica a los observadores
   */
  notify(): void {
    this.observer?.updateStock();
  }
  
  /**
   * Este método implementa la suscripción de un observador
   * @param observer Este es el observador que se va a setear
   */
  subscribe(observer: Observer): void {
    this.observer = observer;
  }

  /**
   * Este método implementa la desuscripción de un observador
   */
  unsubscribe(): void {
    this.observer = null;
  }

  /**
   * Esta función inserta un mueble en la categoría que le corresponde
   * @param categoria Esta función inserta un mueble en la categoría que le corresponde
   * @param mueble Este es el mueble que se va a insertar
   */
  private insertarMuebleCategoria(categoria: string, mueble: Mueble): void {
    if (!this.muebles_.get(categoria)!.has(mueble.nombre)) {
      this.muebles_.get(categoria)!.set(mueble.nombre, []);
    }
    this.muebles_.get(categoria)!.get(mueble.nombre)!.push(mueble);
  }
  
  /**
   * Esta función devuelve el stock de la base de datos
   * @returns Map<string, Map<string, number>> 
   */
  get stock() {
    let result: Map<string, Map<string, number>> = new Map<string, Map<string, number>>();
    for (const categoria of this.muebles_.keys()) {
      result.set(categoria, new Map<string, number>());
      for (const mueble of this.muebles_.get(categoria)!.keys()) {
        result.get(categoria)!.set(mueble, this.muebles_.get(categoria)!.get(mueble)!.length);
      }
    }
    return result;
  }

  /**
   * Esta función devuelve los clientes de la base de datos
   * @returns Cliente[] 
   */
  getClientes(searchObj : {
    id?: number,
    nombre?: string,
    contacto?: string,
    direccion?: string,
  }): Cliente[] {
    return this.clientes_.filter((c) => {
      if (!searchObj.id && !searchObj.nombre && !searchObj.contacto && !searchObj.direccion) return true;
      return searchObj.id && c.id === searchObj.id ||
        searchObj.nombre && c.nombre.includes(searchObj.nombre) ||
        searchObj.contacto && c.contacto.toString().includes(searchObj.contacto) ||
        searchObj.direccion && c.direccion.includes(searchObj.direccion);
    });
  }

  /**
   * Esta función devuelve los clientes de la base de datos
   * @returns Proveedor[]
   */
  getProveedores(searchObj : {
    id?: number,
    nombre?: string,
    contacto?: string,
    direccion?: string
  }): Proveedor[] {
    return this.proveedores_.filter((c) => {
      if (!searchObj.id && !searchObj.nombre && !searchObj.contacto && !searchObj.direccion) return true;
      return searchObj.id && c.id === searchObj.id ||
        searchObj.nombre && c.nombre.includes(searchObj.nombre) ||
        searchObj.contacto && c.contacto.toString().includes(searchObj.contacto) ||
        searchObj.direccion && c.direccion.includes(searchObj.direccion);
    });
  }
  /**
   * Esta función devuelve los proveedores de la base de datos
   * @returns Proveedor[] 
   */
  get proveedores(): Proveedor[] {
    return this.proveedores_;
  }

  /**
   * Esta función devuelve las ventas de la base de datos
   * @returns Venta[] 
   */
  get ventas(): Venta[] {
    return this.ventas_;
  }

  /**
   * Esta función devuelve las devoluciones de la base de datos
   * @returns Devolucion[] 
   */
  get devoluciones(): Devolucion[] {
    return this.devoluciones_;
  }
}


