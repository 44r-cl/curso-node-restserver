const { response } = require('express');
const jwt = require('jsonwebtoken');
const usuario = require('../models/usuario');
const Usuario = require('../models/usuario');

const validarJWT = async (req, res = response, next) => {
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        })
    }

    try {
        // const payload = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        // Leer el usuario que corresponde al uid
        const usuario = await Usuario.findById(uid);
        req.usuario = usuario;
        // console.log(req.usuario);
        req.uid = uid;

        if (!req.usuario.estado) {
            return res.status(401).json({
                msg: `Token no válido - usuario ${req.usuario._id} con estado: false`
            })
        }
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no válido'
        });
    }
    console.log({token});
    //next();
}

module.exports = {
    validarJWT
}