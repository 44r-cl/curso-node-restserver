const { Categoria } = require('../models');
const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRoleValido = async(rol = '') => {
    const existeRol = await Role.findOne({rol});
    if (!existeRol) {
        throw Error(`El rol "${rol}" no está registrado`);
    }
}

const emailExiste = async(correo = '') => {
    const existeEmail = await Usuario.findOne({correo});
    if (existeEmail) {
        throw Error(`El correo "${correo}" ya está registrado`);
    }
}

const existeUsuarioPorId = async (id = '') => {
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario) {
        throw Error(`El usuario "${id}" no está registrado`);
    }
}

const existeCategoriaPorId = async (id = '') => {
    const existeCategoria = await Categoria.findById(id);
    if (!existeCategoria) {
        throw Error(`La categoria "${id}" no existe`);
    }
}

const existeCategoriaPorNombre = async (nombre = '') => {
    const existeCategoria = await Categoria.findOne({nombre});
    if (existeCategoria) {
        throw Error(`La categoria "${nombre}" ya existe con ese nombre`);
    }
}

module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoriaPorId,
    existeCategoriaPorNombre
}