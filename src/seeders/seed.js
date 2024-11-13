const { Producto, Fabricante, Componente } = require("../models");

const seed = async () => {
  try {
    const fabricante = await Fabricante.create({
      nombre: "Fabricante 1",
      direccion: "Calle 123",
      numeroContacto: "123456789",
      pathImgPerfil: "https://www.google.com",
    });

    const producto = await Producto.create({
      nombre: "Producto 1",
      descripcion: "Descripcion del producto",
      precio: 100,
    });

    const componente = await Componente.create({
      nombre: "Componente 1",
      descripcion: "Descripcion del componente",
      pathImg: "https://www.google.com",
    });

    const fabricante2 = await Fabricante.create({
      nombre: "Fabricante 2",
      direccion: "Calle 123",
      numeroContacto: "123456789",
      pathImgPerfil: "https://www.google.com",
    });

    const producto2 = await Producto.create({
      nombre: "Producto 2",
      descripcion: "Descripcion del producto",
      precio: 100,
    });

    const componente2 = await Componente.create({
      nombre: "Componente 2",
      descripcion: "Descripcion del componente",
      pathImg: "https://www.google.com",
    });

    await producto.addComponentes([componente, componente2]);
    await producto2.addComponentes([componente]);

    await producto.addFabricantes([fabricante, fabricante2]);
    await producto2.addFabricantes([fabricante]);

    console.log("Seed ejecutado con éxito");
  } catch (error) {
    console.error("Error al ejecutar el seed", error);
  }
};

module.exports = seed;