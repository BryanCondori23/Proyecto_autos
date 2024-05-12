const mongoose = require('mongoose');
//definir el esquema
const autoSchema = new mongoose.Schema({
    // nombre: { type: String, require: true}
    marca: String,
    modelo: String,
    precio: Number
});

const AutoModel = mongoose.model('Auto',autoSchema, 'auto');
module.exports = AutoModel;