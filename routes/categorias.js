const { Router } = require('express');
const { check } = require('express-validator');
const { crearCategoria, obtenerCategoria, obtenerCategorias, actualizaCategoria, borrarCategoria } = require('../controllers/categorias');
const { existeCategoriaPorId, existeCategoriaPorNombre } = require('../helpers/db-validators');
const {validarCampos, validarJWT} = require('../middlewares');
const router = Router();

router.get('/', 
    obtenerCategorias);

// Obtener una categoria por id - público
router.get('/:id',[
    check('id', 'No es un ID válido').isMongoId().custom(existeCategoriaPorId),
    validarCampos
], obtenerCategoria);

// Crear categoria - privado - cualquier persona con un token válido
router.post('/', [
    validarJWT, 
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria);

// Actualizar categoria - privado - cualquier persona con un token válido
router.put('/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId().custom(existeCategoriaPorId),
    check('nombre', 'El nombre es obligatorio').not().isEmpty().custom(existeCategoriaPorNombre),
    validarCampos
], actualizaCategoria);

// Borrar categoria - privado - Admin
router.delete('/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId().custom(existeCategoriaPorId),
    validarCampos 
],
borrarCategoria);

module.exports = router;