const {response,request} = require('express');

const usuariosGet = (req = request, res = response) => {
    const query = req.query;
    res.json({
        msg: 'get API - controlador',
        query
    });
}

const usuariosPost = (req, res = response) => {
    const {nombre, edad} = req.body;
    res.json({
        msg: 'post API - controlador',
        // Otra forma: body
        nombre,
        edad
    });
}

const usuariosPut = (req, res = response) => {
    const id = req.params.id;
    res.json({
        msg: 'put API - controlador', 
        id
    });
}

const usuariosDelete = (req, res = response) => {
    res.json({
        msg: 'delete API - controlador'
    });
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}