const express = require('express');
const request = require('supertest');
const autoRutas = require('../../rutas/autoRutas');
const RecetaModel = require('../../models/Auto');
const mongoose = require('mongoose');
const AutoModel = require('../../models/Auto');
const app = express();
app.use(express.json());
app.use('/autos', autoRutas);


describe('Pruebas Unitarias para Recetas', () => {
    //se ejecuta antes de iniciar las pruebas
    beforeEach(async () => {
        await mongoose.connect('mongodb://127.0.0.1:27017/appautos',{
            useNewUrlParser : true,            
        });
        await AutoModel.deleteMany({});
    });
    // al finalziar las pruebas
    afterAll(() => {
        return mongoose.connection.close();
      });


    //1er test : GET
    test('Deberia Traer todos los autos metodo: GET: getAutos', async() =>{
        await AutoModel.create({ marca: 'toyota', modelo: 'asx', precio: 15000 });
        await AutoModel.create({ marca: 'hyundai', modelo: 'creta', precio: 25000 });
        
        // solicitud - request
        const res =  await request(app).get('/autos/getAutos');
        //verificar la respuesta
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveLength(2);
    }, 10000);
    //2 test
    test('Deberia agregar un nuevo  POST: /agregarautos', async() => {
        const nuevaAuto = {
            marca: 'susuki', 
            modelo: 'vitara', 
            precio: 10000 
        };
        const res =  await request(app)
                            .post('/autos/agregarautos')
                            .send(nuevaAuto);
        expect(res.statusCode).toEqual(201);
        expect(res.body.nombre).toEqual(nuevaAuto.nombre);
    });
        //3 test 
    test('Deberia actualizar un auto que ya existe: PUT /editar/:id', async()=>{
        const autoCreado = await AutoModel.create(
                                  { marca: 'susuki', 
                                    modelo: 'vitara', 
                                    precio: 10000 });
        const autoActualizar = {
            marca: 'susuki (editado)',
            modelo: 'vitara (editado)',
            precio: 30000
        };
        const res =  await request(app)
                            .put('/autos/editarautos/'+autoCreado._id)
                            .send(autoActualizar);
        expect(res.statusCode).toEqual(201);
        expect(res.body.nombre).toEqual(autoActualizar.nombre);                   

    });
   // 4 test
    test('Deberia eliminar una auto existente : DELETE /eliminar/:id', async() =>{
        const autoCreado = await AutoModel.create(
            { marca: 'susuki', 
              modelo: 'vitara', 
              precio: 30000 });

        const res =  await request(app)
                                .delete('/autos/eliminar/'+autoCreado._id);
        
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual({mensaje :  'Auto eliminado'});
    });
});