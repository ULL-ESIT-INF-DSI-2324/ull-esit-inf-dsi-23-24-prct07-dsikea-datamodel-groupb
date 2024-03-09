import { describe, it } from 'mocha';
import { expect } from "chai";
import { Mueble } from '../src/proyecto/Items/Muebles/Mueble.js';
import { Silla } from '../src/proyecto/Items/Muebles/Silla.js';
import { Armario } from '../src/proyecto/Items/Muebles/Armario.js';
import { Mesa } from '../src/proyecto/Items/Muebles/Mesa.js';


describe('Tests de la clase Silla (extiende mueble)', () => {
  let miSilla1 : Silla
  let miSilla2 : Silla
  beforeEach(() => {
    miSilla1 = new Silla(1, "Silla", "Silla de madera", "Madera", {alto: 100, ancho: 50, largo: 50}, 50, false, false);
    miSilla2 = new Silla(2, "Silla2", "Silla de madera2", "Madera2", {alto: 200, ancho: 100, largo: 100}, 100, true, true);
  });

  it('Se crea correctamente un objeto Silla', () => {
    expect(miSilla1 instanceof Silla).to.be.equal(true);
    expect(miSilla1 instanceof Mueble).to.be.equal(true);
  })

  it('Se comprueba que los getters devuelven los valores correctos', () => {
    expect(miSilla1.respaldo).to.be.equal(false);
    expect(miSilla1.reposabrazos).to.be.equal(false);
    expect(miSilla2.respaldo).to.be.equal(true);
    expect(miSilla2.reposabrazos).to.be.equal(true);
    expect(miSilla1.tipo).to.be.equal("Silla");
  })

  it('Se comprueba que los setters establecen los valores correctos', () => {
    miSilla1.respaldo = true;
    miSilla1.reposabrazos = true;
    miSilla2.respaldo = false;
    miSilla2.reposabrazos = false;
    miSilla1.tipo = "No definido";
    expect(miSilla1.respaldo).to.be.equal(true);
    expect(miSilla1.reposabrazos).to.be.equal(true);
    expect(miSilla2.respaldo).to.be.equal(false);
    expect(miSilla2.reposabrazos).to.be.equal(false);
    expect(miSilla1.tipo).to.be.equal("No definido");
  })

  it('Se comprueba que los getters de la clase abstracta mueble devuelven los valores correctos', () => {
    expect(miSilla1.id).to.be.equal(1);
    expect(miSilla1.nombre).to.be.equal("Silla");
    expect(miSilla1.descripcion).to.be.equal("Silla de madera");
    expect(miSilla1.material).to.be.equal("Madera");
    expect(miSilla1.dimensiones).to.be.eql({alto: 100, ancho: 50, largo: 50});
    expect(miSilla1.precio).to.be.equal(50);
    expect(miSilla1.tipo).to.be.equal("Silla");
  });

  it('Se comprueba que los setters de la clase abstracta mueble establecen los valores correctos', () => {
    miSilla1.id = 2;
    miSilla1.nombre = "Silla2";
    miSilla1.descripcion = "Silla de madera2";
    miSilla1.material = "Madera2";
    miSilla1.dimensiones = {alto: 200, ancho: 100, largo: 100};
    miSilla1.precio = 100;
    miSilla1.tipo = "Silla"
    expect(miSilla1.id).to.be.equal(2);
    expect(miSilla1.nombre).to.be.equal("Silla2");
    expect(miSilla1.descripcion).to.be.equal("Silla de madera2");
    expect(miSilla1.material).to.be.equal("Madera2");
    expect(miSilla1.dimensiones).to.be.eql({alto: 200, ancho: 100, largo: 100});
    expect(miSilla1.precio).to.be.equal(100);
    expect(miSilla1.tipo).to.be.equal("Silla")
  });
});

describe('Tests de la clase Armario (extiende mueble)', () => {
  let miArmario1 : Armario
  let miArmario2 : Armario
  beforeEach(() => {
    miArmario1 = new Armario(1, "Armario", "Armario de madera", "Madera", {alto: 100, ancho: 50, largo: 50}, 50, true, 2);
    miArmario2 = new Armario(2, "Armario2", "Armario de madera2", "Madera2", {alto: 200, ancho: 100, largo: 100}, 100, false, 0);
  });

  it('Se crea correctamente un objeto Armario', () => {
    expect(miArmario1 instanceof Armario).to.be.equal(true);
    expect(miArmario1 instanceof Mueble).to.be.equal(true);
    expect(miArmario2 instanceof Armario).to.be.equal(true);
    expect(miArmario2 instanceof Mueble).to.be.equal(true);
  });

  it('Se comprueba que los getters devuelven los valores correctos', () => {
    expect(miArmario1.cajones).to.be.equal(true);
    expect(miArmario2.cajones).to.be.equal(false);
    expect(miArmario1.puertas).to.be.equal(2);
    expect(miArmario2.puertas).to.be.equal(0);
    expect(miArmario1.tipo).to.be.equal("Armario");
    expect(miArmario2.tipo).to.be.equal("Armario");
  });

  it('Se comprueba que los setters establecen los valores correctos', () => {
    miArmario1.cajones = false;
    miArmario1.puertas = 0;
    miArmario2.cajones = true;
    miArmario2.puertas = 2;
    miArmario1.tipo = "No definido";
    miArmario2.tipo = "No definido";
    expect(miArmario1.cajones).to.be.equal(false);
    expect(miArmario1.puertas).to.be.equal(0);
    expect(miArmario2.cajones).to.be.equal(true);
    expect(miArmario2.puertas).to.be.equal(2);
    expect(miArmario1.tipo).to.be.equal("No definido");
    expect(miArmario2.tipo).to.be.equal("No definido");
  });

  it('Se comprueba que los getters de la clase abstracta mueble devuelven los valores correctos', () => {
    expect(miArmario1.id).to.be.equal(1);
    expect(miArmario1.nombre).to.be.equal("Armario");
    expect(miArmario1.descripcion).to.be.equal("Armario de madera");
    expect(miArmario1.material).to.be.equal("Madera");
    expect(miArmario1.dimensiones).to.be.eql({alto: 100, ancho: 50, largo: 50});
    expect(miArmario1.precio).to.be.equal(50);
    expect(miArmario1.tipo).to.be.equal("Armario");
  });

  it('Se comprueba que los setters de la clase abstracta mueble establecen los valores correctos', () => {
    miArmario1.id = 2;
    miArmario1.nombre = "Armario2";
    miArmario1.descripcion = "Armario de madera2";
    miArmario1.material = "Madera2";
    miArmario1.dimensiones = {alto: 200, ancho: 100, largo: 100};
    miArmario1.precio = 100;
    miArmario1.tipo = "Armario"
    expect(miArmario1.id).to.be.equal(2);
    expect(miArmario1.nombre).to.be.equal("Armario2");
    expect(miArmario1.descripcion).to.be.equal("Armario de madera2");
    expect(miArmario1.material).to.be.equal("Madera2");
    expect(miArmario1.dimensiones).to.be.eql({alto: 200, ancho: 100, largo: 100});
    expect(miArmario1.precio).to.be.equal(100);
    expect(miArmario1.tipo).to.be.equal("Armario");
  });

});

describe('Tests de la clase Mesa (extiende mueble)', () => {
  let miMesa1 : Mesa
  let miMesa2 : Mesa
  beforeEach(() => {
    miMesa1 = new Mesa(1, "Mesa", "Mesa de madera", "Madera", {alto: 100, ancho: 50, largo: 50}, 50, true, 4);
    miMesa2 = new Mesa(2, "Mesa2", "Mesa de madera2", "Madera2", {alto: 200, ancho: 100, largo: 100}, 100, false, 0);
  });

  it('Se crea correctamente un objeto Mesa', () => {
    expect(miMesa1 instanceof Mesa).to.be.equal(true);
    expect(miMesa1 instanceof Mueble).to.be.equal(true);
    expect(miMesa2 instanceof Mesa).to.be.equal(true);
    expect(miMesa2 instanceof Mueble).to.be.equal(true);
  });

  it('Se comprueba que los getters devuelven los valores correctos', () => {
    expect(miMesa1.extensible).to.be.equal(true);
    expect(miMesa2.extensible).to.be.equal(false);
    expect(miMesa1.sillas).to.be.equal(4);
    expect(miMesa2.sillas).to.be.equal(0);
    expect(miMesa1.tipo).to.be.equal("Mesa");
    expect(miMesa2.tipo).to.be.equal("Mesa");
  });

  it('Se comprueba que los setters establecen los valores correctos', () => {
    miMesa1.extensible = false;
    miMesa1.sillas = 0;
    miMesa2.extensible = true;
    miMesa2.sillas = 4;
    miMesa1.tipo = "No definido";
    miMesa2.tipo = "No definido";
    expect(miMesa1.extensible).to.be.equal(false);
    expect(miMesa1.sillas).to.be.equal(0);
    expect(miMesa2.extensible).to.be.equal(true);
    expect(miMesa2.sillas).to.be.equal(4);
    expect(miMesa1.tipo).to.be.equal("No definido");
    expect(miMesa2.tipo).to.be.equal("No definido");
  });

  it('Se comprueba que los getters de la clase abstracta mueble devuelven los valores correctos', () => {
    expect(miMesa1.id).to.be.equal(1);
    expect(miMesa1.nombre).to.be.equal("Mesa");
    expect(miMesa1.descripcion).to.be.equal("Mesa de madera");
    expect(miMesa1.material).to.be.equal("Madera");
    expect(miMesa1.dimensiones).to.be.eql({alto: 100, ancho: 50, largo: 50});
    expect(miMesa1.precio).to.be.equal(50);
    expect(miMesa1.tipo).to.be.equal("Mesa");
  });

  it('Se comprueba que los setters de la clase abstracta mueble establecen los valores correctos', () => {
    miMesa1.id = 2;
    miMesa1.nombre = "Mesa2";
    miMesa1.descripcion = "Mesa de madera2";
    miMesa1.material = "Madera2";
    miMesa1.dimensiones = {alto: 200, ancho: 100, largo: 100};
    miMesa1.precio = 100;
    miMesa1.tipo = "Mesa"
    expect(miMesa1.id).to.be.equal(2);
    expect(miMesa1.nombre).to.be.equal("Mesa2");
    expect(miMesa1.descripcion).to.be.equal("Mesa de madera2");
    expect(miMesa1.material).to.be.equal("Madera2");
    expect(miMesa1.dimensiones).to.be.eql({alto: 200, ancho: 100, largo: 100});
    expect(miMesa1.precio).to.be.equal(100);
    expect(miMesa1.tipo).to.be.equal("Mesa");
  });

});