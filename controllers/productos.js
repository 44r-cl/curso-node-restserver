const { response, request } = require("express");
const { Producto } = require("../models");

// obtenerProductos - paginado - total - populate
// obtenerProducto - populate
// actualizaProducto
// borrarProducto - estado:false

const crearProducto = async (req = request, res = response) => {
    const nombre = req.body.nombre.toUpperCase();
    const {precio, descripcion, disponible, categoria} = req.body;

    // Generar la data a guardar
    const data = {
        nombre,
        usuario: req.usuario._id,
        precio,
        descripcion,
        disponible,
        categoria
    }

    const producto = new Producto(data);
    await producto.save();
    res.status(201).json(producto);
}

const obtenerProductos = async(req = request, res = response) => {
    const {limit = 5, desde = 0} = req.query;
    const [total, producto] = await Promise.all([
        Producto.countDocuments({estado:true}),
        Producto.find({estado:true}).populate('usuario').populate('categoria')
        .skip(desde)
        .limit(limit)
    ]);
    res.json({
        msg: 'get API - controlador',
        total,
        producto
    });
}

const obtenerProducto = async(req = request, res = response) => {
    const {id} = req.params;
    const producto = await Producto.findById(id).populate('usuario');
    res.json({
        msg: 'get API - controlador',
        producto
    });
}

const actualizaProducto = async (req, res = response) => {
    const id = req.params.id;
    const nombre = req.body.nombre.toUpperCase();
    const {precio, descripcion, disponible, categoria} = req.body;

    const data = {
        nombre,
        usuario: req.usuario._id,
        precio, 
        descripcion, 
        disponible, 
        categoria
    }
    const producto = await Producto.findByIdAndUpdate(id, data, {new: true}); 
    res.json({
        msg: 'put API - controlador', 
        producto
    });
}

const borrarProducto = async (req, res = response) => {
    const {id} = req.params;

    // Borrado lógico
    const producto = await Producto.findByIdAndUpdate(id, {estado:false});
    const usuarioAutenticado = req.usuario;
    res.json({
        msg: 'delete API - controlador',
        producto,
        usuarioAutenticado
    });
}

module.exports = {
    crearProducto,
    actualizaProducto,
    obtenerProducto,
    obtenerProductos,
    borrarProducto
}