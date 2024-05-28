const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const usuarioSchema = new mongoose.Schema({
    // nombre: { type: String, require: true}
        nombreusuario: {
        type: String, 
        required : true,
        unique : true
    },
    correo : {
        type: String, 
        required : true,
        unique : true
    },
    contrasenia : {
        type: String, 
        required : true
    }
    
});

// hashear contrasenia
usuarioSchema.pre('save', async function (next){
    if (this.isModified('contrasenia')){
        this.contrasenia =  await bcrypt.hash(this.contrasenia, 10);
        console.log(this.contrasenia);
    }
    next();
});
//comparar contrasenias
usuarioSchema.methods.compararContrasenia = async function  ( contraseniaComparar ){
    return await bcrypt.compare(contraseniaComparar, this.contrasenia);
};

/* Cerrar sesión
authRutas.post('/cerrarsesion', async (req, res) => {
    try {
        const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null; // Obtener el token del header Authorization
        if (token) {
            tokensInvalidados.push(token); // Agregar el token a la lista de inválidos
        }
        res.json({ mensaje: 'Sesión cerrada exitosamente' });
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
});

// Middleware para verificar el token en las rutas protegidas
function verificarToken(req, res, next) {
    try {
        const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null; // Obtener el token del header Authorization

        if (!token || tokensInvalidados.includes(token)) {
            return res.status(401).json({ mensaje: 'Token inválido. Por favor inicie sesión nuevamente.' });
        }

        jwt.verify(token, 'clave_secreta', (err, decoded) => {
            if (err) {
                return res.status(401).json({ mensaje: 'Token inválido. Por favor inicie sesión nuevamente.' });
            }
            req.usuarioId = decoded.usuarioId;
            next();
        });
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
}*/

const UsuarioModel = mongoose.model('Usuario', usuarioSchema,'usuario');

module.exports = UsuarioModel;