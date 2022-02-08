const { Router } = require('express');
const { check } = require('express-validator');
const { crearProducto, obtenerProductos, actualizaProducto, obtenerProducto, borrarProducto } = require('../controllers/productos');
const { existeProductoPorNombre, existeProductoPorId, existeCategoriaPorId } = require('../helpers/db-validators');
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

const router = Router();

router.get('/', obtenerProductos);

router.get('/:id',[
    check('id', 'No es un ID válido').isMongoId().custom(existeProductoPorId),
    validarCampos
], obtenerProducto);

router.post('/', [
    validarJWT, 
    check('nombre', 'El nombre es obligatorio').not().isEmpty().custom(existeProductoPorNombre),
    check('precio', 'El precio debe ser un numero entero').isInt({min: 0}),
    check('descripcion', 'La descripción es obligatoria').not().isEmpty(),
    check('disponible', 'Debe ser un valor booleano').isBoolean(),
    validarCampos
], crearProducto
);

router.put('/:id', [
    validarJWT, 
    check('nombre', 'El nombre es obligatorio').not().isEmpty().custom(existeProductoPorNombre),
    check('precio', 'El precio debe ser un numero entero').isInt({min: 0}),
    check('descripcion', 'La descripción es obligatoria').not().isEmpty(),
    check('disponible', 'Debe ser un valor booleano').isBoolean(),
    check('categoria', 'Debe ser un ID válido para la categoría').isMongoId().custom(existeCategoriaPorId),
    validarCampos
], actualizaProducto
);

router.delete('/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId().custom(existeProductoPorId),
    esAdminRole,
    validarCampos 
],
borrarProducto);

module.exports = router;