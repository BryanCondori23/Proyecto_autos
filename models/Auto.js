const mongoose = require('mongoose');
const DescripcionModel = require('./descripcion');
//definir el esquema
const autoSchema = new mongoose.Schema({
    // nombre: { type: String, require: true}
    marca: String,
    modelo: String,
    color: String,
    precio: Number,
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
    descripcion: {type: mongoose.Schema.Types.ObjectId, ref: 'descripcion'}

    
});

const AutoModel = mongoose.model('Auto',autoSchema, 'auto');
module.exports = AutoModel;