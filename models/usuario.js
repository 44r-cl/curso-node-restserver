const {Schema, model} = require('mongoose');
const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatorio']
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        required: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },
});

// En este caso no se usa función flecha sino una función normal
// Saca de la visualización algunos campos (versión y password) Interviene el método
UsuarioSchema.methods.toJSON = function () {
    const {__v, password, _id, ...usuario} = this.toObject();
    usuario.uid = _id;

    return usuario;
}

module.exports = model('Usuario', UsuarioSchema);