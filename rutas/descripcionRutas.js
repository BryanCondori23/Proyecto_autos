const express = require('express');
const rutas = express.Router();
const DescripcionModel = require('../models/descripcion');
const UsuarioModel = require('../models/Usuario');
const AutoModel = require('../models/Auto')


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

// consultas para el examen
//1 descripcion completa del auto con descripcion

rutas.get('/autosDescripcionCompleta', async (req, res) => {
    try {
        const autosDescripcionCompleta = await AutoModel.aggregate([
            {
                $lookup: {
                    from: "descripcion",
                    localField: "categoria",
                    foreignField: "_id,",
                    as: "descripcion"
                }
            },
            {
                $unwind: "$descripcion"
                    //path: "$descripcion",
                   // preserveNullAndEmptyArrays: true
                
            }
        ]);
        return res.json(autosDescripcionCompleta);
    } catch(error) {
        res.status(500).json({ mensaje :  error.message})
    }
});

//2 mostrar cantos autos se ncuentran dentor de una categori



rutas.get('/autosPorCategoria', async (req, res) => {
    try {
        const autosPorCategoria = await AutoModel.aggregate([
            {
                $lookup: {
                    from: "descripcion",
                    localField: "descripcion",
                    foreignField: "_id",
                    as: "descripcion_completa"
                }
            },
            {
                $unwind: "$descripcion_completa"
            },
            {
                $group: {
                    _id: "$descripcion_completa.categoria",
                    totalAutos: { $sum: 1 }
                }
            }
        ]);

        return res.json(autosPorCategoria);
    } catch(error) {
        res.status(500).json({ mensaje: error.message });
    }
});

//3 mostrar lo autos que se encuentran dentro de una poentencia requerida

rutas.get('/autosPorPotencia/:potencia', async (req, res) => {
    try {
        const autosPorPotencia = await AutoModel.aggregate([
            {
                $lookup: {
                    from: "descripcion",
                    localField: "descripcion",
                    foreignField: "_id",
                    as: "descripcion_completa"
                }
            },
            {
                $unwind: "$descripcion_completa"
            },
            {
                $match: {
                    "descripcion_completa.potencia": parseInt(req.params.potencia) // Filtra por la potencia especificada en la URL
                }
            },
            {
                $group: {
                    _id: "$descripcion_completa.potencia",
                    totalAutos: { $sum: 1 }
                }
            }
        ]);

        return res.json(autosPorPotencia);
    } catch(error) {
        res.status(500).json({ mensaje: error.message });
    }
});

// 4 motrar cuanto autos tiene una marca


rutas.get('/modelosPorMarca/:marca', async (req, res) => {
    try {
        const modelosPorMarca = await AutoModel.aggregate([
            {
                $lookup: {
                    from: "descripcion", // Nombre de la colección 'descripcion'
                    localField: "descripcion", // Campo en 'Auto' que referencia 'descripcion'
                    foreignField: "_id",
                    as: "descripcion_autos"
                }
            },
            {
                $match: {
                    "descripcion_autos.marca": req.params.marca // Filtra por la marca especificada en la colección 'descripcion'
                }
            },
            {
                $group: {
                    _id: "$descripcion_autos.marca",
                    modelos: { $addToSet: "$modelo" } // Agrega modelos únicos al conjunto
                }
            }
        ]);

        if (modelosPorMarca.length === 0) {
            return res.status(404).json({ mensaje: 'No se encontraron modelos para la marca especificada.' });
        }

        // La respuesta es un array con un solo elemento, por lo que devolvemos directamente ese elemento
        return res.json(modelosPorMarca[0].modelos);
    } catch(error) {
        res.status(500).json({ mensaje: error.message });
    }
});






module.exports = rutas;