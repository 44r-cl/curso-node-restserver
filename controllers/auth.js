const bcryptjs = require('bcryptjs');
const {response} = require('express');
const { validationResult } = require('express-validator');
const generarJWT = require('../helpers/generar-jwt');
const Usuario = require('../models/usuario');

const login = async (req, res = response) => {
    const {correo, password} = req.body;
    try {
        const usuario = await Usuario.findOne({correo});
        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - correo'
            })
        }
        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - estado: false'
            })
        }
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
            })
        }
        // Generar JWT
        const token = await generarJWT (usuario.id);
        
        return res.json({
            usuario,
            token
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Cominiquese con el administrador'
        })
    }
    res.json({
        msg: 'Login OK!'
    })
}

module.exports = {
    login
}