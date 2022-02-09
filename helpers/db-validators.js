const { Categoria, Role, Usuario, Producto } = require('../models');
// const Role = require('../models/role');
// const Usuario = require('../models/usuario');

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

const existeProductoPorNombre = async (nombre = '') => {
    nombre = nombre.toUpperCase();
    const existeProducto = await Producto.findOne({nombre});
    if (existeProducto) {
        throw Error(`El producto "${nombre}" ya existe con ese nombre`);
    }
}

const existeProductoPorId = async (id = '') => {
    const existeProducto = await Producto.findById(id);
    if (!existeProducto) {
        throw Error(`El producto con "${id}" no existe`);
    }
}

const coleccionesPermitidas = (coleccion = '', colecciones = []) => {
    const incluida = colecciones.includes(coleccion);

    if (!incluida) {
        throw new Error(`La colección ${coleccion} no es permitida (${colecciones})`);
    }

    return true;
}

module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoriaPorId,
    existeProductoPorId,
    existeCategoriaPorNombre,
    existeProductoPorNombre,
    coleccionesPermitidas
}