const { Router } = require('express');
const { check } = require('express-validator');
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete } = require('../controllers/usuarios');
const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');
// Se comenta esto para usar una forma más ordenada de hacer estas inclusiones. Se crea archivo ../middlewares/index.js 
// const { validarCampos } = require('../middlewares/validar-campos');
// const { validarJWT } = require('../middlewares/validar-jwt');
// const { esAdminRole, tieneRol } = require('../middlewares/validar-roles');
// ...y se reemplaza con esto:
const {validarCampos, validarJWT, esAdminRole, tieneRol} = require('../middlewares');
const router = Router();

router.get('/', usuariosGet);

router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId().custom(existeUsuarioPorId),
    check('rol', 'No debe estar vacío').not().isEmpty().custom(esRoleValido),
    validarCampos
],usuariosPut);

router.post('/', [
    check('nombre', 'El nombre es obligatotio').isLength({ min: 5, max: 50 }),
    check('password', 'El password debe ser de más de 6 letras').isLength({ min: 6 }),
    check('correo', 'El correo no es válido').isEmail().custom(emailExiste), 
    //check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROL']),
    check('rol').custom(esRoleValido), // Podría ser así también (rol) => esRoleValido(rol)
    validarCampos
], usuariosPost);

router.delete('/:id', [
    validarJWT,
    // esAdminRole,
    tieneRol('ADMIN_ROLE', 'VENTAS_ROLE'),
    check('id', 'No es un ID válido').isMongoId().custom(existeUsuarioPorId),
    validarCampos
], usuariosDelete);

module.exports = router;