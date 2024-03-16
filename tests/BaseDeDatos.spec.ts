import 'mocha'
import { expect } from 'chai'
import { Mueble, Dimension } from '../src/proyecto/Items/Muebles/Mueble.js'
import { returnStrat } from '../src/proyecto/Items/Menu/Menu.js'
import { Armario } from '../src/proyecto/Items/Muebles/Armario.js'
import { BaseDeDatos } from '../src/proyecto/BaseDeDatos/BaseDeDatos.js'
import { Stock } from '../src/proyecto/Items/Stock/Stock.js'

describe('BaseDeDatos', () => {
  let gestor: Stock;
  let bbdd: BaseDeDatos;
  beforeEach(() => {
    gestor = Stock.getStock();
    bbdd = new BaseDeDatos(Stock.getStock());
  });
  it('Los objetos som instancias de sus correspondientes clases', () => {
    expect(bbdd).to.be.instanceOf(BaseDeDatos)
    expect(gestor).to.be.instanceOf(Stock)
  });

  it('Se busca un mueble correctamente', () => {
    const mueblesEncontrados: Mueble[] = bbdd.buscarMueble({ nombre: "Armario de metal", ordenDesc: true }, returnStrat(0));
    const dimensiones: Dimension = { alto: 180, ancho: 65, largo: 135 };
    let obj = {
      id: 3006,
      nombre: "Armario de metal",
      descripcion: "Armario de metal con 2 puertas",
      material: "Metal",
      dimensiones: dimensiones,
      precio: 250,
      tipo: "Armario",
      puertas: 2,
      cajones: false
    };
    expect(mueblesEncontrados).to.be.eql([obj as Armario]);
  });

});

