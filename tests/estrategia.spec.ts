import 'mocha';
import { expect } from 'chai';
import { sortStrategy } from '../src/proyecto/Interfaces/Interfaces.js';
import { OrdenarAlfabeticamente } from '../src/proyecto/BaseDeDatos/OrdenarAlfabeticamente.js';
import { OrdenarPorId } from '../src/proyecto/BaseDeDatos/OrdenarPorId.js';
import { OrdenarPorPrecio } from '../src/proyecto/BaseDeDatos/OrdenarPorPrecio.js';
import { Mueble, Dimension } from '../src/proyecto/Items/Muebles/Mueble.js';
import { Silla } from '../src/proyecto/Items/Muebles/Silla.js';

describe('Estrategia', () => {
    it('Ordenar alfabeticamente', () => {
        const ordenarAlfabeticamente = new OrdenarAlfabeticamente();
        const dimensiones: Dimension = {alto: 100, largo: 50, ancho: 30};
        let arrayMuebles = [new Silla(1, 'silla 1', 'Silla de madera', 'Madera', dimensiones, 50, true, false), new Silla(1, 'ailla 1', 'Silla de madera', 'Madera', dimensiones, 50, true, false)];
        const estrategia: sortStrategy<Mueble> = ordenarAlfabeticamente;
        const arrayOrdenado = arrayMuebles.sort(estrategia.sort());
        const arrayEsperado = [new Silla(1, 'ailla 1', 'Silla de madera', 'Madera', dimensiones, 50, true, false), new Silla(1, 'silla 1', 'Silla de madera', 'Madera', dimensiones, 50, true, false)];
        expect(arrayOrdenado).to.deep.equal(arrayEsperado);
    });
    it('Ordenar por id', () => {
        const ordenarPorID = new OrdenarPorId();
        const dimensiones: Dimension = {alto: 100, largo: 50, ancho: 30};
        let arrayMuebles = [new Silla(1, 'silla 1', 'Silla de madera', 'Madera', dimensiones, 50, true, false), new Silla(2, 'ailla 1', 'Silla de madera', 'Madera', dimensiones, 50, true, false)];
        const estrategia: sortStrategy<Mueble> = ordenarPorID;
        const arrayOrdenado = arrayMuebles.sort(estrategia.sort());
        const arrayEsperado = [new Silla(2, 'ailla 1', 'Silla de madera', 'Madera', dimensiones, 50, true, false), new Silla(1, 'silla 1', 'Silla de madera', 'Madera', dimensiones, 50, true, false)];
        expect(arrayOrdenado).to.deep.equal(arrayEsperado);
    });
    it('Ordenar por precio', () => {
        const ordenarPorPrecio = new OrdenarPorPrecio();
        const dimensiones: Dimension = {alto: 100, largo: 50, ancho: 30};
        let arrayMuebles = [new Silla(1, 'silla 1', 'Silla de madera', 'Madera', dimensiones, 100, true, false), new Silla(1, 'ailla 1', 'Silla de madera', 'Madera', dimensiones, 50, true, false)];
        const estrategia: sortStrategy<Mueble> = ordenarPorPrecio;
        const arrayOrdenado = arrayMuebles.sort(estrategia.sort());
        const arrayEsperado = [new Silla(1, 'ailla 1', 'Silla de madera', 'Madera', dimensiones, 50, true, false), new Silla(1, 'silla 1', 'Silla de madera', 'Madera', dimensiones, 100, true, false)];
        expect(arrayOrdenado).to.deep.equal(arrayEsperado);
    });
});