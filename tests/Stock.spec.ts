import 'mocha'
import { expect } from 'chai'
import { Stock } from '../src/proyecto/Items/Stock/Stock.js'
import { Venta } from '../src/proyecto/Items/Transacciones/Venta.js'





describe('Stock', () => {
  let gestor: Stock;
  it('Se comprueba el getStock', () => {
    gestor = Stock.getStock();
    expect(gestor).to.be.instanceOf(Stock);
  });

  it('AgregarVenta funciona correctamente', () => {
    gestor = Stock.getStock();
    const aux = [...gestor.database.ventas];
    const venta : Venta = new Venta(101010, new Date(),20, 1001, "123456789");
    gestor.agregarVenta(venta);
    const aux2 = gestor.database.ventas;
    expect(aux.length).to.not.eql(aux2.length);
  });

  it ('eliminarVenta funciona correctamente', () => {
    gestor = Stock.getStock();
    const aux = [...gestor.database.ventas];
    gestor.eliminarVenta(101010);
    const aux2 = gestor.database.ventas;
    expect(aux.length).to.not.eql(aux2.length);
  });

  it('agregarDevolucion funciona correctamente', () => {
    gestor = Stock.getStock();
    const aux = [...gestor.database.devoluciones];
    const devolucion : Venta = new Venta(101010, new Date(),20, 1001, "123456789");
    gestor.agregarDevolucion(devolucion);
    const aux2 = gestor.database.devoluciones;
    expect(aux.length).to.not.eql(aux2.length);
  });

  it('eliminarDevolucion funciona correctamente', () => {
    gestor = Stock.getStock();
    const aux = [...gestor.database.devoluciones];
    gestor.eliminarDevolucion(101010);
    const aux2 = gestor.database.devoluciones;
    expect(aux.length).to.not.eql(aux2.length);
  });
  it ('getInfoCliente devuelve una string', () => {
    gestor = Stock.getStock();
    const aux = gestor.getInfoCliente(1);
    expect(aux).to.be.a('string');
  });

  it('getInfoProveedor devuelve una string', () => {
    gestor = Stock.getStock();
    const aux = gestor.getInfoProveedor(1);
    expect(aux).to.be.a('string');
  });

  it('getCalendadrioVentas devuelve una string', () => {
    gestor = Stock.getStock();
    const aux = gestor.getCalendarioVentas({dia : 1});
    expect(aux).to.be.a('string');
  });

  it('getMueblesMásVendidos debería devolver un Map con 5 pares', () => {
    const mapa = gestor.getMueblesMasVendidos();
    expect(mapa.size).to.equal(5);
  });

  
});