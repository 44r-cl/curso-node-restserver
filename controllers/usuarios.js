const {response,request} = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');

const usuariosGet = async(req = request, res = response) => {
    const {limit = 5, desde = 0} = req.query
    // const usuarios = await Usuario.find({estado:true})
    //     .skip(desde)
    //     .limit(limit);
    // const total = await Usuario.countDocuments({estado:true});
    // const totalRealRecuperado = usuarios.length;

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments({estado:true}),
        Usuario.find({estado:true})
        .skip(desde)
        .limit(limit)
    ]);
    res.json({
        msg: 'get API - controlador',
        total,
        // totalRealRecuperado,
        usuarios
    });
}

const usuariosPost = async (req, res = response) => {
    const {nombre, correo, password, rol} = req.body;
    const usuario = new Usuario({nombre, correo, password, rol});

    // Verficar si el correo existe
    // const existeEmail = await Usuario.findOne({correo});
    // if (existeEmail) {
    //     return res.status(400).json({
    //         msg: "Ese correo ya está registrado"
    //     })
    // }
    // Encriptar contaseña
    salt = bcryptjs.genSaltSync(10);
    usuario.password = bcryptjs.hashSync(password, salt);

    await usuario.save();

    res.json({
        msg: 'post API - controlador',
        usuario
    });
}

const usuariosPut = async (req, res = response) => {
    const id = req.params.id;
    const {password, google, ...resto} = req.body;
    console.log("id: " + id);
    //TODO: validar contra BD
    if (password) {
        salt = bcryptjs.genSaltSync(10);
        resto.password = bcryptjs.hashSync(password, salt);        
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);
    res.json({
        msg: 'put API - controlador', 
        usuario
    });
}

const usuariosDelete = async (req, res = response) => {
    const {id} = req.params;
    const uid = req.uid;
    // Borrado físico
    // const usuario = await Usuario.findByIdAndDelete(id);
    // Borrado lógico
    const usuario = await Usuario.findByIdAndUpdate(id, {estado:false});
    const usuarioAutenticado = req.usuario;
    res.json({
        msg: 'delete API - controlador',
        uid,
        usuario,
        usuarioAutenticado
    });
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}