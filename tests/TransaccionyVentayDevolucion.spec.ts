import { describe, it } from 'mocha';
import { expect } from "chai";

import { Transaccion } from '../src/proyecto/Items/Transacciones/Transaccion.js';
import { Venta } from '../src/proyecto/Items/Transacciones/Venta.js';
import { Devolucion } from '../src/proyecto/Items/Transacciones/Devolucion.js';
import { Cliente } from '../src/proyecto/Personas/Cliente.js';
import { Silla } from '../src/proyecto/Muebles/Silla.js';
import { Proveedor } from '../src/proyecto/Personas/Proveedor.js';




console.log('🦉 ¡Tests Transaccion, Venta y Devolución lanzados! 🦉');

describe('Tests de la clase Venta (extiende Transaccion)', () => {
  let venta1 : Venta;
  let venta2 : Venta;
  let cliente : Cliente;
  let miSilla1 : Silla;
  let miSilla2 : Silla;
  let proveedor : Proveedor;
  beforeEach(() => {
    cliente = new Cliente(1, "Antonio", "123456789", "Calle Falsa 123");
    miSilla1 = new Silla(1, "Silla", "Silla de madera", "Madera", {alto: 100, ancho: 50, largo: 50}, 50, false, false);
    miSilla2 = new Silla(2, "Silla2", "Silla de madera2", "Madera2", {alto: 200, ancho: 100, largo: 100}, 100, true, true);
    proveedor = new Proveedor(1, "Antonio", "123456789", "Calle Falsa 123");
    venta1 = new Venta(new Date(2024,3,7), 90, miSilla1, cliente);
    venta2 = new Venta(new Date(2024,10,7), 190, miSilla2, cliente);
  });

  it('Se crea correctamente un objeto Venta', () => {
    expect(venta1 instanceof Venta).to.be.equal(true);
    expect(venta1 instanceof Transaccion).to.be.equal(true);
    expect(venta2 instanceof Venta).to.be.equal(true);
    expect(venta2 instanceof Transaccion).to.be.equal(true);
  })

  it('Se comprueba que los getters devuelven los valores correctos', () => {
    expect(venta1.fecha).to.be.eql(new Date(2024,3,7));
    expect(venta1.importe).to.be.equal(90);
    expect(venta1.mueble).to.be.equal(miSilla1);
    expect(venta1.persona).to.be.equal(cliente);
    expect(venta2.fecha).to.be.eql(new Date(2024,10,7));
    expect(venta2.importe).to.be.equal(190);
    expect(venta2.mueble).to.be.equal(miSilla2);
    expect(venta2.persona).to.be.equal(cliente);
  })

  it('Se comprueba que los setters establecen los valores correctos', () => {
    venta1.fecha = new Date(2024,4,7);
    venta1.importe = 100;
    venta1.mueble = miSilla2;
    venta1.persona = proveedor;
    venta2.fecha = new Date(2024,11,7);
    venta2.importe = 200;
    venta2.mueble = miSilla1;
    venta2.persona = proveedor;
    expect(venta1.fecha).to.be.eql(new Date(2024,4,7));
    expect(venta1.importe).to.be.equal(100);
    expect(venta1.mueble).to.be.equal(miSilla2);
    expect(venta1.persona).to.be.equal(proveedor);
    expect(venta2.fecha).to.be.eql(new Date(2024,11,7));
    expect(venta2.importe).to.be.equal(200);
    expect(venta2.mueble).to.be.equal(miSilla1);
    expect(venta2.persona).to.be.equal(proveedor);
  })
});

describe('Tests de la clase Devolucion (extiende Venta)', () => {
    let devolucion1 : Devolucion;
    let devolucion2 : Devolucion;
    let cliente : Cliente;
    let miSilla1 : Silla;
    let miSilla2 : Silla;
    let proveedor : Proveedor;
    beforeEach(() => {
      cliente = new Cliente(1, "Antonio", "123456789", "Calle Falsa 123");
      miSilla1 = new Silla(1, "Silla", "Silla de madera", "Madera", {alto: 100, ancho: 50, largo: 50}, 50, false, false);
      miSilla2 = new Silla(2, "Silla2", "Silla de madera2", "Madera2", {alto: 200, ancho: 100, largo: 100}, 100, true, true);
      proveedor = new Proveedor(1, "Antonio", "123456789", "Calle Falsa 123");
      devolucion1 = new Devolucion(new Date(2024,3,7), 90, miSilla1, cliente);
      devolucion2 = new Devolucion(new Date(2024,10,7), 190, miSilla2, cliente);
    });

  it('Se crea correctamente un objeto Devolucion', () => {
    expect(devolucion1 instanceof Devolucion).to.be.equal(true);
    expect(devolucion1 instanceof Devolucion).to.be.equal(true);
    expect(devolucion2 instanceof Devolucion).to.be.equal(true);
    expect(devolucion2 instanceof Devolucion).to.be.equal(true);
  })

  it('Se comprueba que los getters devuelven los valores correctos', () => {
    expect(devolucion1.fecha).to.be.eql(new Date(2024,3,7));
    expect(devolucion1.importe).to.be.equal(90);
    expect(devolucion1.mueble).to.be.equal(miSilla1);
    expect(devolucion1.persona).to.be.equal(cliente);
    expect(devolucion2.fecha).to.be.eql(new Date(2024,10,7));
    expect(devolucion2.importe).to.be.equal(190);
    expect(devolucion2.mueble).to.be.equal(miSilla2);
    expect(devolucion2.persona).to.be.equal(cliente);
  })

  it('Se comprueba que los setters establecen los valores correctos', () => {
    devolucion1.fecha = new Date(2024,4,7);
    devolucion1.importe = 100;
    devolucion1.mueble = miSilla2;
    devolucion1.persona = proveedor;
    devolucion2.fecha = new Date(2024,11,7);
    devolucion2.importe = 200;
    devolucion2.mueble = miSilla1;
    devolucion2.persona = proveedor;
    expect(devolucion1.fecha).to.be.eql(new Date(2024,4,7));
    expect(devolucion1.importe).to.be.equal(100);
    expect(devolucion1.mueble).to.be.equal(miSilla2);
    expect(devolucion1.persona).to.be.equal(proveedor);
    expect(devolucion2.fecha).to.be.eql(new Date(2024,11,7));
    expect(devolucion2.importe).to.be.equal(200);
    expect(devolucion2.mueble).to.be.equal(miSilla1);
    expect(devolucion2.persona).to.be.equal(proveedor);
  })
});