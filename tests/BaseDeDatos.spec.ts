import 'mocha'
import { expect } from 'chai'
import { Mueble, Dimension } from '../src/proyecto/Items/Muebles/Mueble.js'
import { BaseDeDatos } from '../src/proyecto/BaseDeDatos/BaseDeDatos.js'
import { Stock } from '../src/proyecto/Items/Stock/Stock.js'
import { returnStrat } from '../src/proyecto/Items/Menu/Menu.js'
import { Armario } from '../src/proyecto/Items/Muebles/Armario.js'

describe('BaseDeDatos', () => {
    const gestor: Stock = Stock.getStock();
    const bbdd: BaseDeDatos = new BaseDeDatos(Stock.getStock());

    it('Los objetos som instancias de sus correspondientes clases', () => {
        expect(bbdd).to.be.instanceOf(BaseDeDatos)
        expect(gestor).to.be.instanceOf(Stock)
    });
    
    it('Se busca un mueble correctamente', () => {
        const mueblesEncontrados : Mueble[] = bbdd.buscarMueble({nombre: "Armario de metal", ordenDesc: true}, returnStrat(0));
        const dimensiones : Dimension = {alto: 180, ancho: 65, largo: 135};
        const encontrado : Mueble = new Armario(3006,"Armario de metal", "Armario de metal con 2 puertas", "Metal", dimensiones, 250, false, 2);
        expect(mueblesEncontrados).to.deep.equal([encontrado]);
    });
});

