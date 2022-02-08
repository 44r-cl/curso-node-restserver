const { response } = require("express");
const { Categoria } = require("../models");

// obtenerCategorias - paginado - total - populate
// obtenerCategoria - populate
// actualizaCategoria
// borrarCategoria - estado:false


const crearCategoria = async (req, res = response) => {
    const nombre = req.body.nombre.toUpperCase();
    const categoriaDB = await Categoria.findOne({nombre});

    if (categoriaDB) {
        return res.status(400).json({
            msg: `La categoria ${categoriaDB.nombre}, ya existe`
        })
    }
    // Generar la data a guardar
    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const categoria = new Categoria(data);
    await categoria.save();
    res.status(201).json(categoria);
}

const obtenerCategorias = async(req = request, res = response) => {
    const {limit = 5, desde = 0} = req.query
    const [total, categoria] = await Promise.all([
        Categoria.countDocuments({estado:true}),
        Categoria.find({estado:true}).populate('usuario')
        .skip(desde)
        .limit(limit)
    ]);
    res.json({
        msg: 'get API - controlador',
        total,
        categoria
    });
}

const obtenerCategoria = async(req = request, res = response) => {
    const {id} = req.params;
    const categoria = await Categoria.findById(id).populate('usuario');
    res.json({
        msg: 'get API - controlador',
        categoria
    });
}

const actualizaCategoria = async (req, res = response) => {
    const id = req.params.id;
    const nombre = req.body.nombre.toUpperCase();
  
    const data = {
        nombre,
        usuario: req.usuario._id
    }
    const categoria = await Categoria.findByIdAndUpdate(id, data); 
    res.json({
        msg: 'put API - controlador', 
        categoria
    });
}

const borrarCategoria = async (req, res = response) => {
    const {id} = req.params;

    // Borrado lógico
    const categoria = await Categoria.findByIdAndUpdate(id, {estado:false});
    const usuarioAutenticado = req.usuario;
    res.json({
        msg: 'delete API - controlador',
        categoria,
        usuarioAutenticado
    });
}

module.exports = {
    crearCategoria,
    actualizaCategoria,
    obtenerCategoria,
    obtenerCategorias,
    borrarCategoria
}