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
//Endpoint 5 encontrar un Auto por  Id
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
// - obtener auto por un modelo especifico
rutas.get('/AutoPorModelo/:modelo', async (req, res) => {
    try {
        const autoModelo = await AutoModel.find({ modelo: req.params.modelo});
        return res.json(autoModelo);
    } catch(error) {
        res.status(500).json({ mensaje :  error.message})
    }
});
// - eliminar todas las recetas
rutas.delete('/eliminarTodos', async (req, res) => {
    try {
        await AutoModel.deleteMany({ });
        return res.json({mensaje: "Todos los autos han sido eliminados"});
    } catch(error) {
        res.status(500).json({ mensaje :  error.message})
    }
});
// - contar el numero total de sutos
rutas.get('/totalAutos', async (req, res) => {
    try {
        const total = await AutoModel.countDocuments();
        return res.json({totalautos: total });
    } catch(error) {
        res.status(500).json({ mensaje :  error.message})
    }
});
// - obtener la lista de autos  ordenadas por nombre ascendente o descendente
// query.sort({ field: 'asc', test: -1 });
rutas.get('/ordenarAutos', async (req, res) => {
    try {
       const autosOrdenados = await AutoModel.find().sort({ nombre: 1});
       res.status(200).json(autosOrdenados);
    } catch(error) {
        res.status(500).json({ mensaje :  error.message})
    }
});
// - obtener Auto por cantidad
rutas.get('/autoPorCantidad/:cantidad', async (req, res) => {
    try {
       const autos = await AutoModel.find({ precio : req.params.cantidad});
       res.status(200).json(autos);
    } catch(error) {
        res.status(500).json({ mensaje :  error.message})
    }
});

module.exports = rutas;