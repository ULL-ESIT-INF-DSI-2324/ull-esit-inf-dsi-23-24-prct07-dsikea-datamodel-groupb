import { describe, it } from 'mocha';
import { expect } from "chai";

import { Transaccion } from '../src/proyecto/Items/Transacciones/Transaccion.js';
import { Venta } from '../src/proyecto/Items/Transacciones/Venta.js';
import { Devolucion } from '../src/proyecto/Items/Transacciones/Devolucion.js';


console.log('🦉 ¡Tests Transaccion, Venta y Devolución lanzados! 🦉');

describe('Tests de la clase Venta (extiende Transaccion)', () => {
  let venta1 : Venta;
  let venta2 : Venta;
  beforeEach(() => {
    venta1 = new Venta(1, new Date(2024,3,7), 90, 1, "Paco Martín");
    venta2 = new Venta(2, new Date(2024,10,7), 190, 2, "Lola Lolita");
  });

  it('Se crea correctamente un objeto Venta', () => {
    expect(venta1 instanceof Venta).to.be.equal(true);
    expect(venta1 instanceof Transaccion).to.be.equal(true);
    expect(venta2 instanceof Venta).to.be.equal(true);
    expect(venta2 instanceof Transaccion).to.be.equal(true);
  })

  it('Se comprueba que los getters devuelven los valores correctos', () => {
    expect(venta1.id).to.be.equal(1);
    expect(venta1.fecha).to.be.eql(new Date(2024,3,7));
    expect(venta1.importe).to.be.equal(90);
    expect(venta1.mueble).to.be.equal(1);
    expect(venta1.persona).to.be.equal("Paco Martín");
    expect(venta2.id).to.be.equal(2);
    expect(venta2.fecha).to.be.eql(new Date(2024,10,7));
    expect(venta2.importe).to.be.equal(190);
    expect(venta2.mueble).to.be.equal(2);
    expect(venta2.persona).to.be.equal("Lola Lolita");
  })

  it('Se comprueba que los setters establecen los valores correctos', () => {
    venta1.fecha = new Date(2024,4,7);
    venta1.importe = 100;
    venta1.mueble = 2;
    venta1.persona = "Pepe Grande";
    venta2.fecha = new Date(2024,11,7);
    venta2.importe = 200;
    venta2.mueble = 1;
    venta2.persona = "Mario Casas";
    expect(venta1.fecha).to.be.eql(new Date(2024,4,7));
    expect(venta1.importe).to.be.equal(100);
    expect(venta1.mueble).to.be.equal(2);
    expect(venta1.persona).to.be.equal("Pepe Grande");
    expect(venta2.fecha).to.be.eql(new Date(2024,11,7));
    expect(venta2.importe).to.be.equal(200);
    expect(venta2.mueble).to.be.equal(1);
    expect(venta2.persona).to.be.equal("Mario Casas");
  })
});

describe('Tests de la clase Devolucion (extiende Transacciones)', () => {
    let devolucion1 : Devolucion;
    let devolucion2 : Devolucion;
    beforeEach(() => {
      devolucion1 = new Devolucion(3, new Date(2024,3,7), 90, 1, "Pedro Picapiedra");
      devolucion2 = new Devolucion(4, new Date(2024,10,7), 190, 2, "David Broncano");
    });

  it('Se crea correctamente un objeto Devolucion', () => {
    expect(devolucion1 instanceof Devolucion).to.be.equal(true);
    expect(devolucion1 instanceof Devolucion).to.be.equal(true);
    expect(devolucion2 instanceof Devolucion).to.be.equal(true);
    expect(devolucion2 instanceof Devolucion).to.be.equal(true);
  })

  it('Se comprueba que los getters devuelven los valores correctos', () => {
    expect(devolucion1.id).to.be.equal(3);
    expect(devolucion1.fecha).to.be.eql(new Date(2024,3,7));
    expect(devolucion1.importe).to.be.equal(90);
    expect(devolucion1.mueble).to.be.equal(1);
    expect(devolucion1.persona).to.be.equal("Pedro Picapiedra");
    expect(devolucion2.id).to.be.equal(4);
    expect(devolucion2.fecha).to.be.eql(new Date(2024,10,7));
    expect(devolucion2.importe).to.be.equal(190);
    expect(devolucion2.mueble).to.be.equal(2);
    expect(devolucion2.persona).to.be.equal("David Broncano");
  })

  it('Se comprueba que los setters establecen los valores correctos', () => {
    devolucion1.fecha = new Date(2024,4,7);
    devolucion1.importe = 100;
    devolucion1.mueble = 2;
    devolucion1.persona = "Ester Expósito";
    devolucion2.fecha = new Date(2024,11,7);
    devolucion2.importe = 200;
    devolucion2.mueble = 1;
    devolucion2.persona = "Dani Martín";
    expect(devolucion1.fecha).to.be.eql(new Date(2024,4,7));
    expect(devolucion1.importe).to.be.equal(100);
    expect(devolucion1.mueble).to.be.equal(2);
    expect(devolucion1.persona).to.be.equal("Ester Expósito");
    expect(devolucion2.fecha).to.be.eql(new Date(2024,11,7));
    expect(devolucion2.importe).to.be.equal(200);
    expect(devolucion2.mueble).to.be.equal(1);
    expect(devolucion2.persona).to.be.equal("Dani Martín");
  })
});