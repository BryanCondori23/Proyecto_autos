const mongoose = require('mongoose');
//definir el esquema
const autoSchema = new mongoose.Schema({
    // nombre: { type: String, require: true}
    categoria: String,
    marca: String,
    potencia: Number,
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' }

    
});

const DescripcionModel = mongoose.model('Descripcion',autoSchema, 'descripcion');
module.exports = DescripcionModel;