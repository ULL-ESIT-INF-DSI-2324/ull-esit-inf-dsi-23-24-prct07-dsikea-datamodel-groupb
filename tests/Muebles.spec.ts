import { describe, it } from 'mocha';
import { expect } from "chai";
import { Mueble } from '../src/proyecto/Muebles/Mueble.js';
import { Silla } from '../src/proyecto/Muebles/Silla.js';



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
  })

  it('Se comprueba que los setters establecen los valores correctos', () => {
    miSilla1.respaldo = true;
    miSilla1.reposabrazos = true;
    miSilla2.respaldo = false;
    miSilla2.reposabrazos = false;
    expect(miSilla1.respaldo).to.be.equal(true);
    expect(miSilla1.reposabrazos).to.be.equal(true);
    expect(miSilla2.respaldo).to.be.equal(false);
    expect(miSilla2.reposabrazos).to.be.equal(false);
  })

  it('Se comprueba que los getters de la clase abstracta mueble devuelven los valores correctos', () => {
    expect(miSilla1.id).to.be.equal(1);
    expect(miSilla1.nombre).to.be.equal("Silla");
    expect(miSilla1.descripcion).to.be.equal("Silla de madera");
    expect(miSilla1.material).to.be.equal("Madera");
    expect(miSilla1.dimensiones).to.be.eql({alto: 100, ancho: 50, largo: 50});
    expect(miSilla1.precio).to.be.equal(50);
  });

  it('Se comprueba que los setters de la clase abstracta mueble establecen los valores correctos', () => {
    miSilla1.id = 2;
    miSilla1.nombre = "Silla2";
    miSilla1.descripcion = "Silla de madera2";
    miSilla1.material = "Madera2";
    miSilla1.dimensiones = {alto: 200, ancho: 100, largo: 100};
    miSilla1.precio = 100;
    expect(miSilla1.id).to.be.equal(2);
    expect(miSilla1.nombre).to.be.equal("Silla2");
    expect(miSilla1.descripcion).to.be.equal("Silla de madera2");
    expect(miSilla1.material).to.be.equal("Madera2");
    expect(miSilla1.dimensiones).to.be.eql({alto: 200, ancho: 100, largo: 100});
    expect(miSilla1.precio).to.be.equal(100);
  });
});