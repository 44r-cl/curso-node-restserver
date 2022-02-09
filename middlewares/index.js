// Se replaza esto:
// const { validarCampos } = require('../middlewares/validar-campos');
// const { validarJWT } = require('../middlewares/validar-jwt');
// const { esAdminRole, tieneRol } = require('../middlewares/validar-roles');

// Con esto:
// Se usan constantes para apuntar a las librería completas
const validarCampos = require('../middlewares/validar-campos');
const validarJWT = require('../middlewares/validar-jwt');
const esAdminRole = require('../middlewares/validar-roles');
const tieneRol = require('../middlewares/validar-roles');
const validarArchivoSubir = require('../middlewares/validar-archivo')

module.exports = {
    ...validarCampos,
    ...validarJWT,
    ...esAdminRole,
    ...tieneRol,
    ...validarArchivoSubir
}