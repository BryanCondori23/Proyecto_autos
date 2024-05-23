const express = require('express');
const rutas = express.Router();
const DescripcionModel = require('../models/descripcion');
const UsuarioModel = require('../models/Usuario');


//endpoint 1.  traer todos los autos
rutas.get('/getDescripcion', async (req, res) => {
    try  {
        const descripcion = await  DescripcionModel.find();
        res.json(descripcion);
    } catch (error){
        res.status(500).json({mensaje: error.message});
    }
});

//endpoint 2. Agregar autos 
rutas.post('/agregardescripcion', async (req, res) => {
    const descripcion = new DescripcionModel({
        categoria: req.body.categoria,
        marca: req.body.marca,
        potencia: req.body.potencia,
        usuario: req.body.usuario ///asignar el id del usuario
       
    })
    try {
        const nuevoDescripcion = await descripcion.save();
        res.status(201).json(nuevoDescripcion);
    } catch (error) {
        res.status(400).json({ mensaje :  error.message})
    }  
});

//endpoint 3. Editar/ modificar autos
rutas.put('/editardescripcion/:id', async (req, res) => {
    try {
        const descripcionEditado = await DescripcionModel.findByIdAndUpdate(req.params.id, req.body, { new : true });
        if (!descripcionEditado)
            return res.status(404).json({ mensaje : 'descripcion no encontrada!!!'});
        else
            return res.status(201).json(descripcionEditado);

    } catch (error) {
        res.status(400).json({ mensaje :  error.message})
    }
})
//ENDPOINT 4. eliminar
rutas.delete('/eliminar/:id',async (req, res) => {
    try {
       const descripcionEliminado = await DescripcionModel.findByIdAndDelete(req.params.id);
       if (!descripcionEliminado)
            return res.status(404).json({ mensaje : 'descripcion no encontrada!!!'});
       else 
            return res.json({mensaje :  'Descripcion eliminada'});    
       } 
    catch (error) {
        res.status(500).json({ mensaje :  error.message})
    }
});

module.exports = rutas;