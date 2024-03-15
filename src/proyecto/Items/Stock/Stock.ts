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
import { Venta } from '../Transacciones/Venta.js';
import { Devolucion } from '../Transacciones/Devolucion.js';
import { Mueble } from '../Muebles/Mueble.js';
import { estrategiaOrdenacion, returnStrat } from '../../Items/Menu/Menu.js';
import { Cliente } from '../../Items/Personas/Cliente.js';
//import { get } from 'http';


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
  
  /**
   * Método que añade una venta a la base de datos
   * @param venta
   */
  agregarVenta(venta : Venta) {
    this.db.adicionarVenta(venta);
  }

  /**
   * Método que elimina una venta de la base de datos
   * @param id
   */
  eliminarVenta(id : number) {
    this.db.deleteVenta(id);
  }

  /**
   * Método que elimina una devolución de la base de datos
   * @param id
   */
  eliminarDevolucion(id : number) {
    this.db.deleteDevolucion(id);
  }
  
  
  /**
   * Método que añade una devolución a la base de datos
   * @param devolucion
   */
  agregarDevolucion(devolucion : Devolucion) {
    this.db.adicionarDevolucion(devolucion);
  }

  /**
   * Método que actualiza el stock
   */
  updateStock() {
    this.actualStock = this.db.stock;
  }

  /**
   * Método que muestra el stock
   */
  displayStock() {
    console.log(this.actualStock);
  } 
 
  /**
   * Método para generar informes dado un tipo y un id
   * @param searchObj
   * @returns Map<string, number> | undefined
   */
  getStockParaInforme(
    searchObj: {
      tipo?: string,
      id?: number
    }): Map<string, number> | undefined {
    if (searchObj.tipo) {
      console.log(this.actualStock.get(searchObj.tipo));
      return this.actualStock.get(searchObj.tipo);
    } else if (searchObj.id) {
      const id : number = searchObj.id;
      const opcion: estrategiaOrdenacion = 0;
      const buscado : Mueble[] = this.db.buscarMueble({id: id}, returnStrat(opcion));
      for (const mueble of buscado) {
        for (const [categoria, subMap] of this.actualStock) {
          for (const [nombre, cantidad] of subMap) {
            if (mueble.nombre === nombre) {
              console.log(`${categoria}:`);
              console.log(`  ${nombre}: ${cantidad}`);
              return new Map<string, number>([[nombre, cantidad]]);
            }
          }
        }
      }
    }
    return undefined;
  }

  /**
   * Método para obtener los muebles más vendidos
   * @returns Map<string, number>
   */
  getMueblesMasVendidos(): Map<number, number>{
    const muebleNumeroVentas: Map<number, number> = new Map<number, number>();
    const ventas: Venta[] = this.db.ventas;
    for (const venta of ventas) {
      let iterador : number = 1;
      const id_mueble : number = venta.mueble;
      if (muebleNumeroVentas.has(id_mueble)) {
        muebleNumeroVentas.set(id_mueble, iterador + 1);
        iterador++;
      } else {
        muebleNumeroVentas.set(id_mueble, 1);
      }
    }

    const array = Array.from(muebleNumeroVentas.entries());
    array.sort((a, b) => b[1] - a[1]).splice(5, array.length);
    const mapaOrdenado = new Map(array);
    return mapaOrdenado;
  }

  getInfoCliente(id: number) : string {
   const cliente : Cliente [] = this.db.getClientes({id: id});
   let resultado : string = 'INFORMACIÓN ACERCA DEL CLIENTE, id: ' + id + '\n';
   let gasto : number = 0;
   let ingreso : number = 0;
 
    for (const c of cliente) {
      resultado += 'Nombre: ' + c.nombre + '\n';
      resultado += 'Dirección: ' + c.direccion + '\n';
      resultado += 'Teléfono: ' + c.contacto + '\n';
    }
    resultado += '\n';
    resultado += 'VENTAS REALIZADAS POR EL CLIENTE: \n';
    const ventas : Venta [] = this.db.ventas;
    for (const v of ventas) {
      if (parseInt(v.persona) === id) {
        resultado += 'ID de la venta: ' + v.id + '\n';
        resultado += 'Fecha: ' + v.fecha + '\n';
        resultado += 'Mueble: ' + v.mueble + '\n';
        resultado += 'Importe: ' + v.importe + '\n';
        gasto += v.importe;
        resultado += '------------------------------------\n';
      }
    }
    resultado += '\n';
    resultado += 'DEVOLUCIONES REALIZADAS POR EL CLIENTE: \n';
    const devoluciones : Devolucion [] = this.db.devoluciones;
    for (const d of devoluciones) {
      if (parseInt(d.persona) === id) {
        resultado += 'ID de la devolución: ' + d.id + '\n';
        resultado += 'Fecha: ' + d.fecha + '\n';
        resultado += 'Mueble: ' + d.mueble + '\n';
        resultado += 'Importe: ' + d.importe + '\n';
        ingreso += d.importe;
        resultado += '------------------------------------\n';
      }
    }
    resultado += `Gastado en ventas -> ${gasto}$\n Ingresado por devoluciones -> ${ingreso}$\n`;
    return resultado;
  }


  getInfoProveedor(id: number) : string {
    const cliente : Cliente [] = this.db.getProveedores({id: id});
    let resultado : string = 'INFORMACIÓN ACERCA DEL PROVEEDOR, id: ' + id + '\n';
    let gasto : number = 0;
    let ingreso : number = 0;
  
     for (const c of cliente) {
       resultado += 'Nombre: ' + c.nombre + '\n';
       resultado += 'Dirección: ' + c.direccion + '\n';
       resultado += 'Teléfono: ' + c.contacto + '\n';
     }
     resultado += '\n';
     resultado += 'VENTAS REALIZADAS POR EL PROVEEDOR: \n';
     const ventas : Venta [] = this.db.ventas;
     for (const v of ventas) {
       if (parseInt(v.persona) === id) {
         resultado += 'ID de la venta: ' + v.id + '\n';
         resultado += 'Fecha: ' + v.fecha + '\n';
         resultado += 'Mueble: ' + v.mueble + '\n';
         resultado += 'Importe: ' + v.importe + '\n';
         gasto += v.importe;
         resultado += '------------------------------------\n';
       }
     }
     resultado += '\n';
     resultado += 'DEVOLUCIONES REALIZADAS POR EL PROVEEDOR: \n';
     const devoluciones : Devolucion [] = this.db.devoluciones;
     for (const d of devoluciones) {
       if (parseInt(d.persona) === id) {
         resultado += 'ID de la devolución: ' + d.id + '\n';
         resultado += 'Fecha: ' + d.fecha + '\n';
         resultado += 'Mueble: ' + d.mueble + '\n';
         resultado += 'Importe: ' + d.importe + '\n';
         ingreso += d.importe;
         resultado += '------------------------------------\n';
       }
     }
     resultado += '------------------------------------\n';
     resultado += `Gastado en ventas -> ${gasto}$\n Ingresado por devoluciones -> ${ingreso}$\n`;
     return resultado;
   }

   getCalendarioVentas(searchObj: { dia?: number, mes?: number, anio?: number }): string {
    let facturacion: number = 0;
    let resultado: string = '';
    if (searchObj.dia && searchObj.mes && searchObj.anio) {
      resultado += 'REGISTRO DE LAS VENTAS REALIZADAS EL DÍA ' + searchObj.dia + '/' + searchObj.mes + '/' + searchObj.anio + ':\n';
        const ventas: Venta[] = this.db.ventas;
        for (const v of ventas) {
            const fechaVenta: Date = new Date(v.fecha);
            if (fechaVenta.getDate() === searchObj.dia &&
                fechaVenta.getMonth() + 1 === searchObj.mes && 
                fechaVenta.getFullYear() === searchObj.anio) {
                resultado += 'ID de la venta: ' + v.id + '\n';
                resultado += 'Fecha: ' + v.fecha + '\n';
                resultado += 'Mueble: ' + v.mueble + '\n';
                resultado += 'Importe: ' + v.importe + '\n';
                facturacion += v.importe;
                resultado += '------------------------------------\n';
            }
        }
        resultado += 'Facturación total: ' + facturacion + '\n';
    } else if (searchObj.mes && searchObj.anio) {
        resultado += 'REGISTRO DE LAS VENTAS REALIZADAS EN EL MES ' + searchObj.mes + '/' + searchObj.anio + ':\n';
        const ventas: Venta[] = this.db.ventas;
        for (const v of ventas) {
            const fechaVenta: Date = new Date(v.fecha);
            if (fechaVenta.getMonth() + 1 === searchObj.mes && 
                fechaVenta.getFullYear() === searchObj.anio) {
                resultado += 'ID de la venta: ' + v.id + '\n';
                resultado += 'Fecha: ' + v.fecha + '\n';
                resultado += 'Mueble: ' + v.mueble + '\n';
                resultado += 'Importe: ' + v.importe + '\n';
                facturacion += v.importe;
                resultado += '------------------------------------\n';
            }
        }
        resultado += 'Facturación total: ' + facturacion + '\n';
    } else if (searchObj.anio) {
        resultado += 'REGISTRO DE LAS VENTAS REALIZADAS EN EL AÑO ' + searchObj.anio + ':\n';
        const ventas: Venta[] = this.db.ventas;
        for (const v of ventas) {
            const fechaVenta: Date = new Date(v.fecha);
            if (fechaVenta.getFullYear() === searchObj.anio) {
                resultado += 'ID de la venta: ' + v.id + '\n';
                resultado += 'Fecha: ' + v.fecha + '\n';
                resultado += 'Mueble: ' + v.mueble + '\n';
                resultado += 'Importe: ' + v.importe + '\n';
                facturacion += v.importe;
                resultado += '------------------------------------\n';
            }
        }
        resultado += 'Facturación total: ' + facturacion + '\n';
    }
    return resultado;
}

}