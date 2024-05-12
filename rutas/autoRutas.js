const express = require('express');
const rutas = express.Router();
const AutoModel = require('../models/Auto');

//endpoint 1.  traer todos los autos
rutas.get('/getAutos', async (req, res) => {
    try  {
        const auto = await  AutoModel.find();
        res.json(auto);
    } catch (error){
        res.status(500).json({mensaje: error.message});
    }
});
//endpoint 2. Agregar autos 
rutas.post('/agregarautos', async (req, res) => {
    const auto = new AutoModel({
        marca: req.body.marca,
        modelo: req.body.modelo,
        precio: req.body.precio
    })
    try {
        const nuevoAuto = await auto.save();
        res.status(201).json(nuevoAuto);
    } catch (error) {
        res.status(400).json({ mensaje :  error.message})
    }  
});
//endpoint 3. Editar/ modificar autos
rutas.put('/editarautos/:id', async (req, res) => {
    try {
        const autoEditado = await AutoModel.findByIdAndUpdate(req.params.id, req.body, { new : true });
        if (!autoEditado)
            return res.status(404).json({ mensaje : 'Auto no encontrado!!!'});
        else
            return res.status(201).json(autoEditado);

    } catch (error) {
        res.status(400).json({ mensaje :  error.message})
    }
})
//ENDPOINT 4. eliminar
rutas.delete('/eliminar/:id',async (req, res) => {
    try {
       const autoEliminado = await AutoModel.findByIdAndDelete(req.params.id);
       if (!autoEliminado)
            return res.status(404).json({ mensaje : 'Auto no encontrado!!!'});
       else 
            return res.json({mensaje :  'Auto eliminado'});    
       } 
    catch (error) {
        res.status(500).json({ mensaje :  error.message})
    }
});
//Endpoint 5 Autos Id
rutas.get('/auto/:id', async (req, res) => {
    try {
        const auto = await AutoModel.findById(req.params.id);
        if (!auto)
            return res.status(404).json({ mensaje : 'Auto no encontrado!!!'});
        else 
            return res.json(auto);
    } catch(error) {
        res.status(500).json({ mensaje :  error.message})
    }
});


module.exports = rutas;