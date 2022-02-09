const { Router } = require("express");
const { check } = require("express-validator");
const { cargarArchivo, actualizarImagen } = require("../controllers/uploads");
const { coleccionesPermitidas } = require("../helpers");
const { validarCampos, validarJWT, validarArchivoSubir } = require("../middlewares");

const router = Router();

router.post("/", [validarArchivoSubir], cargarArchivo);

router.put("/:coleccion/:id", [
    validarArchivoSubir,
    check('id', 'El id debe ser de MongoDB').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    validarCampos
], actualizarImagen);

module.exports = router;
