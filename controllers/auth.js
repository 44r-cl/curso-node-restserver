const bcryptjs = require('bcryptjs');
const {response} = require('express');
const { validationResult } = require('express-validator');
const generarJWT = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');
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
            msg: 'Comuniquese con el administrador'
        })
    }
    res.json({
        msg: 'Login OK!'
    })
}

const googleSignIn = async (req, res = response) => {
    const {id_token} = req.body;

    try {
        const {nombre, img, correo} = await googleVerify(id_token);

        let usuario = await Usuario.findOne({correo});
        if (!usuario) {
            const data = {
                nombre,
                correo,
                password: '-',
                rol: 'USER_ROLE',
                img,
                google: true
            };
            usuario = new Usuario(data);
            console.log({usuario});
            await usuario.save();
            console.log('Listo!!')
        }

        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario bloqueado'
            });
        }

        // Generar JWT
        const token = await generarJWT (usuario.id);
        
        res.json({
            usuario,
            token
        });
        
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'El Token no se pudo verificar',
            error
        });
    }
}

module.exports = {
    login,
    googleSignIn
}