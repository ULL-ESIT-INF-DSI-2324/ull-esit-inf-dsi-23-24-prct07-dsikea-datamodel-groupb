import { describe, it } from 'mocha';
import { expect } from "chai";
import { Persona } from '../src/proyecto/Personas/Persona.js';
import { Cliente } from '../src/proyecto/Personas/Cliente.js';
import { Proveedor } from '../src/proyecto/Personas/Proveedor.js';



describe('Tests de la clase Cliente (extiende Persona)', () => {
  let cliente : Cliente;
  beforeEach(() => {
    cliente = new Cliente(1, "Antonio", "123456789", "Calle Falsa 123");
  });

  it('Se crea correctamente un objeto Cliente', () => {
    expect(cliente instanceof Cliente).to.be.equal(true);
    expect(cliente instanceof Persona).to.be.equal(true);
  })

  it('Se comprueba que los getters devuelven los valores correctos', () => {
    expect(cliente.id).to.be.equal(1);
    expect(cliente.nombre).to.be.equal("Antonio");
    expect(cliente.contacto).to.be.equal(123456789);
    expect(cliente.direccion).to.be.equal("Calle Falsa 123");
  })

  it('Se comprueba que los setters establecen los valores correctos', () => {
    cliente.id = 2;
    cliente.nombre = "Antonio2";
    cliente.contacto = 987654321;
    cliente.direccion = "Calle Falsa 321";
    expect(cliente.id).to.be.equal(2);
    expect(cliente.nombre).to.be.equal("Antonio2");
    expect(cliente.contacto).to.be.equal(987654321);
    expect(cliente.direccion).to.be.equal("Calle Falsa 321");
  })
});

describe('Tests de la clase Proveedor (extiende Persona)', () => {
  let proveedor : Proveedor;
  beforeEach(() => {
    proveedor = new Proveedor(1, "Antonio", "123456789", "Calle Falsa 123");
  });

  it('Se crea correctamente un objeto Proveedor', () => {
    expect(proveedor instanceof Proveedor).to.be.equal(true);
    expect(proveedor instanceof Persona).to.be.equal(true);
  })

  it('Se comprueba que los getters devuelven los valores correctos', () => {
    expect(proveedor.id).to.be.equal(1);
    expect(proveedor.nombre).to.be.equal("Antonio");
    expect(proveedor.contacto).to.be.equal(123456789);
    expect(proveedor.direccion).to.be.equal("Calle Falsa 123");
  })

  it('Se comprueba que los setters establecen los valores correctos', () => {
    proveedor.id = 2;
    proveedor.nombre = "Antonio2";
    proveedor.contacto = 987654321;
    proveedor.direccion = "Calle Falsa 321";
    expect(proveedor.id).to.be.equal(2);
    expect(proveedor.nombre).to.be.equal("Antonio2");
    expect(proveedor.contacto).to.be.equal(987654321);
    expect(proveedor.direccion).to.be.equal("Calle Falsa 321");
  })
});