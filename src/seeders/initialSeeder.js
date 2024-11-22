const Producto = require('../models/producto.model');
const Fabricante = require('../models/fabricante.model');
const Componente = require('../models/componente.model');

async function seedDatabase() {
  try {
    await Producto.deleteMany({});
    await Fabricante.deleteMany({});
    await Componente.deleteMany({});

    // Productos
    const productos = await Producto.insertMany([
      {
        nombre: 'Celular POCO C65',
        descripcion: 'Sus 2 cámaras traseras de 50 Mpx/2 Mpx te permitirán tomar imágenes con más detalles.',
        precio: 419999.99,
        pathImg: 'https://picsum.photos/200',
        componentes: [
          {
            nombre: 'Memoria RAM Fury Beast DDR4',
            descripcion: 'Con su tecnología DDR4, mejorará el desempeño de tu equipo, aumentará la fluidez y la velocidad en la transferencia de datos.',
          },
          {
            nombre: 'Microprocesador Ryzen 5',
            descripcion: 'En este producto encontrarás los núcleos, que son los encargados de ejecutar las instrucciones y actividades que le asignás a tu dispositivo.',
          }
        ]
      },
      {
        nombre: 'Tablet Tab A9',
        descripcion: 'Disfruta de una experiencia visual inmersiva con la pantalla de alta frecuencia de actualización de la Tab A9.',
        precio: 311999.99,
        pathImg: 'https://picsum.photos/200',
        componentes: [{
          nombre: 'Batería Hkx 401015',
          descripcion: 'Batería recargable modelo Hkx 401015, voltaje: 3,7V, mah: 60, voltaje de carga: 3,7',
        }]
      },
      {
        nombre: 'Notebook Pavilion 15',
        descripcion: 'Notebook Pavilion 15-eg2529la Procesador Intel Core™ i5 de 12.ª generación.',
        precio: 1349999.99,
        pathImg: 'https://picsum.photos/200',
        componentes: [
          {
            nombre: 'Memoria RAM Fury Beast DDR4',
            descripcion: 'Con su tecnología DDR4, mejorará el desempeño de tu equipo, aumentará la fluidez y la velocidad en la transferencia de datos.',
          },
          {
            nombre: 'Batería Hkx 401015',
            descripcion: 'Batería recargable modelo Hkx 401015, voltaje: 3,7V, mah: 60, voltaje de carga: 3,7',
          }
        ]
      }
    ]);

    // Fabricantes
    const fabricantes = await Fabricante.insertMany([
      {
        nombre: 'AMD',
        direccion: 'Estados Unidos',
        numeroContacto: '79031078',
        pathImgPerfil: 'https://picsum.photos/200',
      },
      {
        nombre: 'Asus',
        direccion: 'China',
        numeroContacto: '2357001',
        pathImgPerfil: 'https://picsum.photos/200',
      },
      {
        nombre: 'Intel',
        direccion: 'Estados Unidos',
        numeroContacto: '12157500',
        pathImgPerfil: 'https://picsum.photos/200',
      }
    ]);

    // Componentes
    const componentes = await Componente.insertMany([
      {
        nombre: 'Memoria RAM Fury Beast DDR4',
        descripcion: 'Con su tecnología DDR4, mejorará el desempeño de tu equipo, aumentará la fluidez y la velocidad en la transferencia de datos.',
      },
      {
        nombre: 'Microprocesador Ryzen 5',
        descripcion: 'En este producto encontrarás los núcleos, que son los encargados de ejecutar las instrucciones y actividades que le asignás a tu dispositivo.',
      },
      {
        nombre: 'Batería Hkx 401015',
        descripcion: 'Batería recargable modelo Hkx 401015, voltaje: 3,7V, mah: 60, voltaje de carga: 3,7',
      }
    ]);

    // Referencia Fabricante con Producto
    productos[0].fabricantesId = [ fabricantes[0]._id, fabricantes[1]._id ];
    productos[1].fabricantesId = [ fabricantes[2]._id ];
    productos[2].fabricantesId = [ fabricantes[1]._id, fabricantes[2]._id ];
    await productos[0].save();
    await productos[1].save();
    await productos[2].save();

    // Referencia Producto con Fabricante
    fabricantes[0].productosId = [ productos[0]._id ];
    fabricantes[1].productosId = [ productos[0]._id, productos[2]._id ];
    fabricantes[2].productosId = [ productos[1]._id, productos[2]._id ];
    await fabricantes[0].save();
    await fabricantes[1].save();
    await fabricantes[2].save();

    // Referencia Producto con Componente
    componentes[0].productosId = [ productos[0]._id, productos[2]._id ];
    componentes[1].productosId = [ productos[0]._id ];
    componentes[2].productosId = [ productos[1]._id, productos[2]._id ];
    await componentes[0].save();
    await componentes[1].save();
    await componentes[2].save();

  } catch (error) {
    console.error(error.message);
  }
}

module.exports = seedDatabase;