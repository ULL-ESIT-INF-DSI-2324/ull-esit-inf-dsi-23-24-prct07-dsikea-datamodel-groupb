import 'mocha'
import { expect } from 'chai'
import { Mueble, Dimension } from '../src/proyecto/Items/Muebles/Mueble.js'
import { returnStrat } from '../src/proyecto/Items/Menu/Menu.js'
import { Armario } from '../src/proyecto/Items/Muebles/Armario.js'
import { BaseDeDatos, Categoria } from '../src/proyecto/BaseDeDatos/BaseDeDatos.js'
import { Stock } from '../src/proyecto/Items/Stock/Stock.js'
import { Cliente } from '../src/proyecto/Items/Personas/Cliente.js'
import { Proveedor } from '../src/proyecto/Items/Personas/Proveedor.js'
import { Venta } from '../src/proyecto/Items/Transacciones/Venta.js'
import { Devolucion } from '../src/proyecto/Items/Transacciones/Devolucion.js'

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
  it ('Implementa las funciones de la interaz', () => {
    expect(bbdd.notify).to.be.a('function');
    expect(bbdd.subscribe).to.be.a('function');
    expect(bbdd.unsubscribe).to.be.a('function');
  });

  it(' Funcionan los getters', () => {
    const devoluciones = bbdd.devoluciones;
    const ventas = bbdd.ventas;
    const proveedores = bbdd.proveedores;
    expect(typeof devoluciones).to.be.eql('object');
    expect(typeof ventas).to.be.eql('object');
    expect(typeof proveedores).to.be.eql('object');
    expect(devoluciones).to.be.instanceOf(Array);
    expect(ventas).to.be.instanceOf(Array);
    expect(proveedores).to.be.instanceOf(Array);
  });

  it('Se intenta eliminar un cliente que no existe', () => {
    expect(() => {
      bbdd.deleteCliente(9996);
    }).to.throw(Error, "ID no encontrado");
  });

  it('Se elimina un cliente correctamente', () => {
    bbdd.deleteCliente(1);
    bbdd = new BaseDeDatos(Stock.getStock());
    const clienteEncontrado : Cliente = bbdd.getClientes({id : 1})[0];
    expect(clienteEncontrado).to.be.undefined;
  } );

  it('Se edita un cliente correctamente', () => {
  let objeto : any = {};
  objeto.nombre = "Juanito";
  bbdd.editarCliente(2, objeto);
  const clienteEncontrado : Cliente = bbdd.getClientes({id : 2})[0];
  const cliente = new Cliente(2, "Juanito", "987654321", "Avenida Central 456");
  expect(clienteEncontrado).to.be.eql(cliente);
});

it('Se intenta editar un cliente que no existe', () => {
  expect(() => {
    bbdd.editarCliente(9997, { nombre: "cliente nuevo"});
  }).to.throw(Error, "ID no encontrado");
}
);


it ('Se intenta adicionar un proveedor que ya existe', () => {
  const proveedor = new Proveedor(1, "proveedor 1", "258369147", "Boulevard Norte 753");
  expect(() => {
    bbdd.adicionarProveedor(proveedor);
  }).to.throw(Error, "ID repetido");
});



it('Se borra un proveedor correctamente', () => {
  bbdd.deleteProveedor(1);
  bbdd = new BaseDeDatos(Stock.getStock());
  const proveedorEncontrado : Proveedor = bbdd.getProveedores({id : 1})[0];
  expect(proveedorEncontrado).to.be.undefined;
});

it ('Se intenta borrar un proveedor que no existe', () => {
  expect(() => {
    bbdd.deleteProveedor(9996);
  }).to.throw(Error, "ID no encontrado");
});

it ('Se edita un proveedor correctamente', () => {
  let objeto : any = {};
  objeto.nombre = "Juanito";
  bbdd.editarProveedor(2, objeto);
  const proveedorEncontrado : Proveedor = bbdd.getProveedores({id : 2})[0];
  const proveedor = new Proveedor(2, "Juanito", "666666666", "Carretera de la Madera 321");
  expect(proveedorEncontrado).to.be.eql(proveedor);
});

it ('Se intenta editar un proveedor que no existe', () => {
  expect(() => {
    bbdd.editarProveedor(9997, { nombre: "proveedor nuevo"});
  }).to.throw(Error, "ID no encontrado");
})

it('Se intenta borrar una venta que no existe', () => {
  expect(() => {
    bbdd.deleteVenta(9996);
  }).to.throw(Error, "ID no encontrado");
});
it('Se borra una venta correctamente', () => {
  const tam : number = bbdd.ventas.length;
  bbdd.deleteVenta(1);
  const tam2 : number = bbdd.ventas.length;
  expect(tam).to.be.greaterThan(tam2);
});
it('Se intenta borrar una devolución que no existe', () => {
  expect(() => {
    bbdd.deleteDevolucion(9996);
  }).to.throw(Error, "ID no encontrado");
});

it('Se borra una devolución correctamente', () => {
  const tam : number = bbdd.devoluciones.length;
  bbdd.deleteDevolucion(1);
  const tam2 : number = bbdd.devoluciones.length;
  expect(tam).to.be.greaterThan(tam2);
});

it('Función stock', () => {
  expect(bbdd.stock instanceof Map).to.be.true;
});
it ('Función getClientes', () => {
  const clientes = bbdd.getClientes({id : 6});
  const cliente = new Cliente(6, "Sofía Hernández", "789123456", "Boulevard Este 951");
  expect(clientes).to.be.eql([cliente]);
});

it ('Función getProveedores', () => {
  const proveedor = new Proveedor(6, "igor", "101010101", "Calle de Paco 123");
  const proveedores = bbdd.getProveedores({id : 6});
  expect(proveedores).to.be.eql([proveedor]);
});


  it('Se busca un mueble correctamente', () => {
    const mueblesEncontrados: Mueble[] = bbdd.buscarMueble({ nombre: "Armario de metal", ordenDesc: true }, returnStrat(0));
    const dimensiones: Dimension = { alto: 180, ancho: 65, largo: 135 };
    let obj = {
      id: 3006,
      tipo: "Armario",
      nombre: "Armario de metal",
      descripcion: "Armario de metal con 2 puertas",
      material: "Metal",
      dimensiones: dimensiones,
      precio: 250,
      cajones: false,
      puertas: 2
    }
    expect(mueblesEncontrados).to.be.eql([obj]);
  });
  it('Se busca un mueble que no existe', () => {
    const mueblesEncontrados: Mueble[] = bbdd.buscarMueble({ id: 9999, ordenDesc: true }, returnStrat(0));
    expect(mueblesEncontrados).to.be.eql([]);
  });

  it('Se intenta añadir un mueble que ya existe', () => {
    const dimensiones: Dimension = { alto: 180, ancho: 65, largo: 135 };
    const mueble = new Armario(3006, "Armario de metal", "Armario de metal con 2 puertas", "Metal", dimensiones, 250, false, 2);
    expect(() => {
      bbdd.adicionarMueble(mueble, Categoria.ARMARIO);
    }).to.throw(Error, "ID repetido");
  });


  it('Se intenta editar un mueble que no existe', () => {
    expect(() => {
      bbdd.editarMueble(9993, { nombre: "Armario nuevo"});
    }).to.throw(Error, "ID no encontrado");
  });

  it('Se edita un mueble correctamente', () => {
    bbdd.editarMueble(3006, { nombre: "Armario nuevo"});
    const mueblesEncontrados: Mueble[] = bbdd.buscarMueble({ id: 3006, ordenDesc: true }, returnStrat(0));
    const dimensiones: Dimension = { alto: 180, ancho: 65, largo: 135 };
    const obj = {
      id: 3006,
      tipo: "Armario",
      nombre: "Armario nuevo",
      descripcion: "Armario de metal con 2 puertas",
      material: "Metal",
      dimensiones: dimensiones,
      precio: 250,
      cajones: false,
      puertas: 2
    }
    expect(mueblesEncontrados).to.be.eql([obj]);
  });

  it('Se intenta eliminar un mueble que no existe', () => {
    expect(() => {
      bbdd.deleteMueble(9998);
    }).to.throw(Error, "ID no encontrado");
  });

  it('Se elimina un mueble correctamente', () => {
    bbdd.deleteMueble(1001);
    bbdd = new BaseDeDatos(Stock.getStock());
    const mueblesEncontrados: Mueble[] = bbdd.buscarMueble({ id: 1001, ordenDesc: true }, returnStrat(0));
    expect(mueblesEncontrados).to.be.eql([]);
  });


  it('Se intenta añadir un cliente que ya existe', ()=> {
    const cliente : Cliente = new Cliente(9, "pepo", "258369147", "Boulevard Norte 753");
    expect(() => {
      bbdd.adicionarCliente(cliente);
    }).to.throw(Error, "ID repetido");
    }
  );

  it ('Se añade un proveedor correctamente', () => {
  const proveedor: Proveedor = new Proveedor(11, "Lola", "258369147", "Boulevard Norte 753");
  bbdd.adicionarProveedor(proveedor);
  expect(bbdd.getProveedores({id : 11})).to.be.eql([proveedor]);
});

  it('Se añade un cliente correctamente', ()=> {
    const cliente: Cliente = new Cliente(11, "Lola Lolita", "258369147", "Boulevard Norte 753");
    bbdd.adicionarCliente(cliente);
    expect(bbdd.getClientes({id : 11})).to.be.eql([cliente]);
  });

  it ('Se añade una venta correctamente', () => {
    const venta = new Venta(1000, new Date(), 10, 1001, "100000000");
    const tam : number = bbdd.ventas.length;
    bbdd.adicionarVenta(venta);
    const tam2 : number = bbdd.ventas.length;
    expect(tam).to.be.lessThan(tam2);
  });

  it('Se añade una devolución correctamente', () => {
    const devolucion = new Devolucion(1000, new Date(), 10, 1001, "100000000");
    const tam : number = bbdd.devoluciones.length;
    bbdd.adicionarDevolucion(devolucion);
    const tam2 : number = bbdd.devoluciones.length;
    expect(tam).to.be.lessThan(tam2);
  });

  it('Se añade un mueble correctamente', () => {
    const dimensiones: Dimension = { alto: 180, ancho: 65, largo: 135 };
    const tam : number = bbdd.stock.get('armarios')!.size;
    const mueble = new Armario(9999, "Armario prueba", "Armario de metal con 2 puertas", "Metal", dimensiones, 250, false, 2);
    bbdd.adicionarMueble(mueble, Categoria.ARMARIO)
    const tam2 : number = bbdd.stock.get('armarios')!.size;
    expect(tam).to.not.be.eql(tam2);
  });

});

